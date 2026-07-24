import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LogOut, Copy, Check, Video, VideoOff } from "lucide-react";
import Whiteboard from "../components/Whiteboard";

export default function SessionRoom() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [copied, setCopied] = useState(false);
  const [inCall, setInCall] = useState(true); // Start in call immediately

  // resizable layout split states
  const [videoWidthPercent, setVideoWidthPercent] = useState(40); // default 40% Jitsi
  const [isResizing, setIsResizing] = useState(false);
  const isPreview = searchParams.get("preview") === "true";

  useEffect(() => {
    const room = searchParams.get("room");
    if (!room) {
      navigate("/meet");
    } else {
      setRoomName(room);
    }
  }, [searchParams, navigate]);

  const copyInviteLink = () => {
    const serverHost = searchParams.get("server") || "fairmeeting.net";
    const inviteUrl = `${window.location.origin}/session?room=${roomName}&server=${serverHost}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to end this tutoring session and exit?")) {
      navigate("/meet");
    }
  };

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX;
      if (!clientX) return;

      const percentage = (clientX / window.innerWidth) * 100;
      // Constraint Jitsi pane width to between 15% and 75%
      if (percentage >= 15 && percentage <= 75) {
        setVideoWidthPercent(percentage);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!roomName) return;
    if (isPreview) return;
    if (!inCall) {
      if (window.jitsiApi) {
        window.jitsiApi.dispose();
        window.jitsiApi = null;
      }
      return;
    }

    const serverHost = searchParams.get("server") || "fairmeeting.net";
    const scriptId = "jitsi-external-api-script";
    let script = document.getElementById(scriptId);

    const initJitsi = () => {
      const container = document.getElementById("jitsi-iframe-container");
      if (!container) return;

      container.innerHTML = "";

      const options = {
        roomName: `MathWithLove_${roomName}`,
        width: "100%",
        height: "100%",
        parentNode: container,
        configOverwrite: {
          prejoinPageEnabled: false,
          disableInviteFunctions: true,
          disabledSounds: ['INCOMING_MSG_SOUND'],
          disabledNotifications: ['notify.chatMessages']
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          MOBILE_APP_PROMO: false
        }
      };

      try {
        const api = new window.JitsiMeetExternalAPI(serverHost, options);
        window.jitsiApi = api;
        window.dispatchEvent(new Event("jitsi-ready"));

        api.on("participantJoined", () => {
          window.dispatchEvent(new Event("jitsi-participant-joined"));
        });

        api.on("videoConferenceJoined", () => {
          window.dispatchEvent(new Event("jitsi-video-conference-joined"));
        });
      } catch (err) {
        console.error("Failed to initialize Jitsi Meet External API:", err);
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://${serverHost}/external_api.js`;
      script.async = true;
      script.onload = () => {
        initJitsi();
      };
      document.body.appendChild(script);
    } else {
      if (window.JitsiMeetExternalAPI) {
        initJitsi();
      } else {
        const originalOnload = script.onload;
        script.onload = () => {
          if (originalOnload) originalOnload();
          initJitsi();
        };
      }
    }

    return () => {
      if (window.jitsiApi) {
        window.jitsiApi.dispose();
        window.jitsiApi = null;
      }
    };
  }, [inCall, roomName, searchParams]);

  return (
    <div className="session-room-fullscreen">
      {/* Dynamic Session Top Header Bar */}
      <header className="session-top-bar">
        <div className="session-brand">
          <span className="live-dot animate-pulse" />
          <h2 className="session-room-title">Math with Love Online Classroom</h2>
          <span className="session-room-badge">Room: {roomName}</span>
        </div>

        <div className="session-actions-group">
          {/* Copy invite link */}
          <button onClick={copyInviteLink} className="btn-session btn-secondary-dark flex-center gap-1">
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span>{copied ? "Link Copied!" : "Invite Link"}</span>
          </button>

          {/* Exit Call */}
          <button onClick={handleExit} className="btn-session btn-danger flex-center gap-1">
            <LogOut size={14} />
            <span>Exit Classroom</span>
          </button>
        </div>
      </header>

      {/* Main workspace filling the window height below the bar with drag divider */}
      <div 
        className="session-workspace-split"
        style={{ gridTemplateColumns: `${videoWidthPercent}% 8px 1fr` }}
      >
        {/* Left pane: Jitsi Meet Call */}
        <section className="session-video-pane">
          {isPreview ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "2rem", textAlign: "center", backgroundColor: "#0f172a", color: "#cbd5e1" }}>
              <Video size={48} style={{ color: "#3b82f6", marginBottom: "1.2rem" }} />
              <h3 style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: "bold", marginBottom: "0.8rem", fontFamily: "Outfit, sans-serif" }}>Classroom Preview Mode</h3>
              <p style={{ fontSize: "0.95rem", color: "#94a3b8", maxWidth: "340px", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                You are previewing the student workspace. In a live session, a fully encrypted, peer-to-peer audio and video conference (powered by Jitsi Meet) will appear in this pane.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#60a5fa", backgroundColor: "rgba(59, 130, 246, 0.1)", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
                <span>Whiteboard on the right is fully active!</span>
              </div>
            </div>
          ) : inCall ? (
            <div 
              id="jitsi-iframe-container"
              className="session-iframe-container"
              style={{
                width: "100%",
                height: "100%",
                pointerEvents: isResizing ? "none" : "auto"
              }}
            />
          ) : (
            <div className="session-video-disconnected text-center">
              <VideoOff size={48} className="text-danger mb-4" />
              <h3>Video call disconnected</h3>
              <button onClick={() => setInCall(true)} className="btn-primary mt-4">
                Reconnect Video Call
              </button>
            </div>
          )}
        </section>

        {/* Resizable Divider */}
        <div 
          className={`session-divider ${isResizing ? "resizing" : ""}`}
          onMouseDown={startResizing}
          onTouchStart={startResizing}
        />

        {/* Right pane: Custom Interactive whiteboard */}
        <section className="session-whiteboard-pane">
          <div className="session-whiteboard-wrapper">
            <Whiteboard />
          </div>
        </section>
      </div>
    </div>
  );
}
