import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Video, HelpCircle, Share2, Copy, Check, VideoOff } from "lucide-react";
import Whiteboard from "../components/Whiteboard";

export default function OnlineClassroom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomName, setRoomName] = useState("");
  const [inputRoom, setInputRoom] = useState("");
  const [copied, setCopied] = useState(false);
  const [inCall, setInCall] = useState(false);

  // Initialize room name from query parameter or generate a random one
  useEffect(() => {
    let room = searchParams.get("room");
    if (!room) {
      // Generate a simple readable code (e.g. Math-Love-XXXX)
      const rand = Math.floor(1000 + Math.random() * 9000);
      room = `Math-Love-${rand}`;
    }
    setRoomName(room);
    setInputRoom(room);
  }, [searchParams]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (inputRoom.trim()) {
      const sanitized = inputRoom.trim().replace(/[^a-zA-Z0-9-_]/g, "");
      setRoomName(sanitized);
      setSearchParams({ room: sanitized });
      setInCall(true);
    }
  };

  const copyInviteLink = () => {
    const inviteUrl = `${window.location.origin}/classroom?room=${roomName}`;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Safe room URL for Jitsi
  // Customizes features: disables prejoin pages, disables some promo buttons
  const jitsiUrl = `https://meet.jit.si/MathWithLove_${roomName}#config.prejoinPageEnabled=false&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.SHOW_BRAND_WATERMARK=false&interfaceConfig.MOBILE_APP_PROMO=false`;

  return (
    <div className="classroom-page animate-fade-in">
      {/* Top Banner Control */}
      <div className="classroom-controls-bar">
        <div className="classroom-info">
          <h2 className="classroom-title">Online Whiteboard Classroom</h2>
          <p className="classroom-desc">
            Room: <strong className="text-gradient">{roomName}</strong>
          </p>
        </div>

        <div className="controls-group">
          {/* Change Room Input */}
          <form onSubmit={handleJoinRoom} className="room-form">
            <input
              type="text"
              value={inputRoom}
              onChange={(e) => setInputRoom(e.target.value)}
              placeholder="Enter Room Name"
              className="room-input"
            />
            <button type="submit" className="btn-small btn-primary">
              Change Room
            </button>
          </form>

          {/* Copy invite link */}
          <button onClick={copyInviteLink} className="btn-small btn-secondary flex-center gap-1">
            {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            <span>{copied ? "Link Copied!" : "Copy Student Invite Link"}</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Workspace */}
      <div className="workspace-grid">
        {/* Left Side: Video Call */}
        <div className="video-column">
          {!inCall ? (
            <div className="video-placeholder-card">
              <div className="placeholder-icon-wrapper animate-bounce">
                <Video size={48} className="text-indigo" />
              </div>
              <h3>Ready to start your meeting?</h3>
              <p className="placeholder-text">
                Connect face-to-face with your student via secure, fully-encrypted video and audio.
              </p>
              
              <div className="classroom-guide-box">
                <h4>Classroom Guidelines:</h4>
                <ul>
                  <li>Share the **Student Invite Link** above with your student.</li>
                  <li>Click **Start Video Call** to launch the video frame.</li>
                  <li>Use the whiteboard on the right to sketch problems together.</li>
                  <li>To draw collaboratively, you can share your screen on Jitsi!</li>
                </ul>
              </div>

              <button onClick={() => setInCall(true)} className="btn-primary flex-center gap-2">
                <Video size={18} /> Start Video Call
              </button>
            </div>
          ) : (
            <div className="jitsi-iframe-wrapper">
              <div className="iframe-header">
                <span className="flex-center gap-1 text-success text-sm">
                  <span className="live-dot" /> Live Call Active
                </span>
                <button onClick={() => setInCall(false)} className="btn-link text-danger text-sm flex-center gap-1">
                  <VideoOff size={14} /> Disconnect
                </button>
              </div>
              <iframe
                src={jitsiUrl}
                allow="camera; microphone; display-capture; autoplay; clipboard-write"
                className="jitsi-iframe"
                title="Tutoring Video Session"
              />
            </div>
          )}
        </div>

        {/* Right Side: Interactive Whiteboard */}
        <div className="whiteboard-column">
          <div className="whiteboard-card">
            <div className="whiteboard-card-header">
              <h3 className="card-title">Shared Scratchpad Whiteboard</h3>
              <span className="card-tag">Use for solving & drawing</span>
            </div>
            <Whiteboard />
          </div>
        </div>
      </div>
    </div>
  );
}
