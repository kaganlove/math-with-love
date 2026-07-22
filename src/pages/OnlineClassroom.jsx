import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Video, Copy, Check, Info, HelpCircle } from "lucide-react";
import AdsSlot from "../components/AdsSlot";

export default function OnlineClassroom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomName, setRoomName] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const activeServer = "fairmeeting.net";

  // Initialize room name from query parameter or generate a random one
  useEffect(() => {
    let room = searchParams.get("room");
    if (!room) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      room = `Session-${rand}`;
    }
    setRoomName(room);
  }, [searchParams]);

  const handleRoomChange = (e) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9-_]/g, "");
    setRoomName(sanitized);
    setSearchParams({ room: sanitized });
  };

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/session?room=${roomName}&server=${activeServer}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const startSession = () => {
    if (roomName.trim()) {
      navigate(`/session?room=${roomName}&server=${activeServer}`);
    }
  };

  return (
    <div className="classroom-lobby-container animate-fade-in">
      <div className="content-width max-w-2xl">
        <section className="lobby-header text-center">
          <h1 className="page-title">Online Classroom Lobby</h1>
          <p className="page-desc">
            Prepare your online workspace. Invite your student and start your interactive video and whiteboard session.
          </p>
        </section>

        <div className="lobby-card">
          <div className="lobby-setup-section">
            <div className="form-group">
              <label className="form-label">1. Session Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={handleRoomChange}
                placeholder="Enter room name"
                className="form-input-field"
              />
              <span className="input-helper">Use letters, numbers, and hyphens only. Share this room name with your student.</span>
            </div>

            <div className="form-group mt-6">
              <label className="form-label">2. Invite Your Student</label>
              <div className="invite-link-box">
                <span className="invite-url-text">{window.location.origin}/session?room={roomName}&server={activeServer}</span>
                <button onClick={copyInviteLink} className="btn-copy-invite">
                  {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            <button onClick={startSession} className="btn-primary w-full mt-8 flex-center gap-2">
              <Video size={20} /> Launch Fullscreen Session
            </button>
          </div>
        </div>

        {/* Informational Guidelines */}
        <div className="lobby-info-grid mt-8">
          <div className="info-guide-card">
            <h4 className="flex-center gap-1"><Info size={16} className="text-primary" /> How It Works</h4>
            <p className="text-secondary text-sm mt-2">
              Launching the session redirects both you and the student to a dedicated, fullscreen page. The classroom has a side-by-side view containing a live video call and a shared whiteboard.
            </p>
          </div>

          <div className="info-guide-card">
            <h4 className="flex-center gap-1"><HelpCircle size={16} className="text-primary" /> Browser Requirements</h4>
            <p className="text-secondary text-sm mt-2">
              Make sure to allow camera and microphone permissions when prompted by your browser. No third-party apps, plugins, or registration are needed.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <AdsSlot format="horizontal" fallbackText="Need one-on-one exam review or homework prep? Check out our tutoring options starting at $100/hour." />
        </div>
      </div>
    </div>
  );
}
