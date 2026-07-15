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

  useEffect(() => {
    const room = searchParams.get("room");
    if (!room) {
      navigate("/classroom");
    } else {
      setRoomName(room);
    }
  }, [searchParams, navigate]);

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/session?room=${roomName}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to end this tutoring session and exit?")) {
      navigate("/classroom");
    }
  };

  const jitsiUrl = `https://meet.jit.si/MathWithLove_${roomName}#config.prejoinPageEnabled=false&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.SHOW_BRAND_WATERMARK=false&interfaceConfig.MOBILE_APP_PROMO=false`;

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

      {/* Main workspace filling the window height below the bar */}
      <div className="session-workspace-split">
        {/* Left pane: Jitsi Meet Call */}
        <section className="session-video-pane">
          {inCall ? (
            <div className="session-iframe-container">
              <iframe
                src={jitsiUrl}
                allow="camera; microphone; display-capture; autoplay; clipboard-write"
                className="session-jitsi-iframe"
                title="Tutoring Video Session"
              />
            </div>
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
