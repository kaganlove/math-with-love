import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LogOut, Copy, Check, Video, VideoOff, MonitorUp, MonitorStop, Maximize2, Minimize2 } from "lucide-react";
import Whiteboard from "../components/Whiteboard";

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun.cloudflare.com:3478" }
];

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

  // Native paywall-free live screen sharing states
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [remoteSharingActive, setRemoteSharingActive] = useState(false);
  const [remoteScreenFrame, setRemoteScreenFrame] = useState(null);
  const [hasRemoteWebRTCStream, setHasRemoteWebRTCStream] = useState(false);
  const [maximizeScreenShare, setMaximizeScreenShare] = useState(false);

  const localScreenVideoRef = useRef(null);
  const remoteScreenVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const pcRef = useRef(null);
  const frameIntervalRef = useRef(null);
  const p2pConnectedRef = useRef(false);
  const ssChunksRef = useRef({});
  const sendingFrameRef = useRef(false);
  const seenSSPacketsRef = useRef(new Set());
  const ssChatQueueRef = useRef([]);
  const ssChatTimerRef = useRef(null);
  const ssBroadcastChannelRef = useRef(null);
  const pendingCandidatesRef = useRef([]);

  const myClientId =
    window.mathWithLoveClientId ||
    (window.mathWithLoveClientId =
      Date.now().toString() + Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    const room = searchParams.get("room");
    if (!room) {
      navigate("/meet");
    } else {
      setRoomName(room);
    }
  }, [searchParams, navigate]);

  // Attach local screen stream to preview video element when active
  useEffect(() => {
    if (isSharingScreen && localScreenVideoRef.current && localStreamRef.current) {
      localScreenVideoRef.current.srcObject = localStreamRef.current;
      localScreenVideoRef.current.play?.().catch(() => {});
    }
  }, [isSharingScreen]);

  // Attach remote WebRTC stream to remote video element when available
  useEffect(() => {
    if (remoteScreenVideoRef.current && remoteStreamRef.current) {
      if (remoteScreenVideoRef.current.srcObject !== remoteStreamRef.current) {
        remoteScreenVideoRef.current.srcObject = remoteStreamRef.current;
      }
      remoteScreenVideoRef.current.play?.().catch(() => {});
    }
  }, [hasRemoteWebRTCStream, remoteSharingActive]);

  const sendDataChannelSS = (str, targetId = null) => {
    if (!window.jitsiApi) return;
    try {
      if (targetId) {
        try {
          window.jitsiApi.executeCommand("sendEndpointTextMessage", targetId, str);
        } catch (e) {}
      } else {
        try {
          window.jitsiApi.executeCommand("sendEndpointTextMessage", "", str);
        } catch (e) {}

        const targetIds = new Set();
        if (window.jitsiParticipants instanceof Set) {
          window.jitsiParticipants.forEach((id) => {
            if (id) targetIds.add(id);
          });
        }
        const participants = window.jitsiApi.getParticipantsInfo?.();
        if (Array.isArray(participants)) {
          participants.forEach((p) => {
            const pid = p?.participantId || p?.id;
            if (pid) targetIds.add(pid);
          });
        }
        targetIds.forEach((pid) => {
          try {
            window.jitsiApi.executeCommand("sendEndpointTextMessage", pid, str);
          } catch (e) {}
        });
      }
    } catch (e) {}
  };

  const enqueueSSChatPacket = (str, onSent = null) => {
    if (!window.jitsiApi) {
      if (onSent) onSent();
      return;
    }

    const processQueue = () => {
      if (ssChatQueueRef.current.length === 0) {
        ssChatTimerRef.current = null;
        return;
      }
      const item = ssChatQueueRef.current.shift();
      try {
        if (window.jitsiApi) {
          window.jitsiApi.executeCommand("sendChatMessage", "[SS]:" + item.str);
        }
      } catch (e) {}
      if (item.onSent) item.onSent();
      ssChatTimerRef.current = setTimeout(processQueue, 480);
    };

    if (!ssChatTimerRef.current) {
      try {
        window.jitsiApi.executeCommand("sendChatMessage", "[SS]:" + str);
      } catch (e) {}
      if (onSent) onSent();
      ssChatTimerRef.current = setTimeout(processQueue, 480);
    } else {
      ssChatQueueRef.current.push({ str, onSent });
    }
  };

  const broadcastSS = (cmd, targetId = null, onComplete = null) => {
    try {
      const packetId = Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
      seenSSPacketsRef.current.add(packetId);

      const payload = { ...cmd, packetId, senderId: myClientId, mathWithLoveSS: true };
      const payloadStr = JSON.stringify(payload);

      // 1. Local BroadcastChannel for same-device tabs
      if (ssBroadcastChannelRef.current) {
        try {
          ssBroadcastChannelRef.current.postMessage(payloadStr);
        } catch (e) {}
      }

      if (!window.jitsiApi) {
        if (onComplete) onComplete();
        return;
      }

      // 2. Jitsi WebRTC DataChannel (600-byte chunks)
      const DC_CHUNK_SIZE = 600;
      if (payloadStr.length <= DC_CHUNK_SIZE) {
        sendDataChannelSS(payloadStr, targetId);
      } else {
        const dcMsgId = "dc_" + packetId;
        const dcTotal = Math.ceil(payloadStr.length / DC_CHUNK_SIZE);
        for (let i = 0; i < dcTotal; i++) {
          const chunkStr = JSON.stringify({
            mathWithLoveSS: true,
            mathWithLoveSSChunk: true,
            senderId: myClientId,
            msgId: dcMsgId,
            index: i,
            total: dcTotal,
            data: payloadStr.slice(i * DC_CHUNK_SIZE, (i + 1) * DC_CHUNK_SIZE)
          });
          setTimeout(() => {
            sendDataChannelSS(chunkStr, targetId);
          }, i * 18);
        }
      }

      // 3. Jitsi XMPP Group Chat fallback (1600-byte chunks so XML-escaped stanzas never exceed Prosody 4KB limit)
      const CHAT_CHUNK_SIZE = 1600;
      if (payloadStr.length <= CHAT_CHUNK_SIZE) {
        enqueueSSChatPacket(payloadStr, onComplete);
      } else {
        const chMsgId = "ch_" + packetId;
        const chTotal = Math.ceil(payloadStr.length / CHAT_CHUNK_SIZE);
        for (let i = 0; i < chTotal; i++) {
          const chunkStr = JSON.stringify({
            mathWithLoveSS: true,
            mathWithLoveSSChunk: true,
            senderId: myClientId,
            msgId: chMsgId,
            index: i,
            total: chTotal,
            data: payloadStr.slice(i * CHAT_CHUNK_SIZE, (i + 1) * CHAT_CHUNK_SIZE)
          });
          enqueueSSChatPacket(chunkStr, i === chTotal - 1 ? onComplete : null);
        }
      }
    } catch (err) {
      console.error("Broadcast screen share error:", err);
      if (onComplete) onComplete();
    }
  };

  const cleanupPeerConnection = () => {
    if (pcRef.current) {
      try {
        pcRef.current.close();
      } catch (e) {}
      pcRef.current = null;
    }
    p2pConnectedRef.current = false;
    pendingCandidatesRef.current = [];
  };

  // Wait up to timeoutMs for ICE candidates to be gathered directly into pc.localDescription (Vanilla ICE)
  const waitForIceGathering = (pc, timeoutMs = 700) =>
    new Promise((resolve) => {
      if (!pc || pc.iceGatheringState === "complete") {
        resolve();
        return;
      }
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        pc.removeEventListener("icegatheringstatechange", checkState);
        resolve();
      };
      const checkState = () => {
        if (pc.iceGatheringState === "complete") {
          finish();
        }
      };
      const timer = setTimeout(finish, timeoutMs);
      pc.addEventListener("icegatheringstatechange", checkState);
    });

  const stopScreenShare = (notifyRemote = true) => {
    if (frameIntervalRef.current) {
      clearInterval(frameIntervalRef.current);
      frameIntervalRef.current = null;
    }
    const existingCaptureVid = document.getElementById("mwl-ss-capture-video");
    if (existingCaptureVid) {
      try {
        existingCaptureVid.srcObject = null;
        existingCaptureVid.remove();
      } catch (e) {}
    }
    sendingFrameRef.current = false;
    ssChatQueueRef.current = [];

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    cleanupPeerConnection();
    setIsSharingScreen(false);

    if (notifyRemote) {
      broadcastSS({ type: "SS_STOP" });
    }
  };

  const startWebRTCOffer = async (stream, targetId = null) => {
    cleanupPeerConnection();
    try {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pcRef.current = pc;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      const checkConnected = () => {
        const state = pc.connectionState || pc.iceConnectionState;
        if (state === "connected" || state === "completed") {
          p2pConnectedRef.current = true;
        } else if (state === "disconnected" || state === "failed" || state === "closed") {
          p2pConnectedRef.current = false;
        }
      };

      pc.onconnectionstatechange = checkConnected;
      pc.oniceconnectionstatechange = checkConnected;

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      // Bundle ICE candidates directly into the offer SDP so we don't spam 15 separate SS_CANDIDATE messages
      await waitForIceGathering(pc, 700);

      if (pcRef.current === pc && pc.localDescription) {
        broadcastSS({ type: "SS_OFFER", sdp: pc.localDescription }, targetId);
      }
    } catch (err) {
      console.error("WebRTC screen share offer error:", err);
    }
  };

  const startScreenShare = async () => {
    if (isSharingScreen) {
      stopScreenShare(true);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      alert("Screen sharing is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always", frameRate: { ideal: 24, max: 30 } },
        audio: false
      });

      localStreamRef.current = stream;
      setIsSharingScreen(true);
      setRemoteSharingActive(false);

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          stopScreenShare(true);
        };
      }

      // Mount a 1x1 hidden video element in the DOM so Chromium never throttles offscreen frame decoding
      const prevVid = document.getElementById("mwl-ss-capture-video");
      if (prevVid) prevVid.remove();
      const captureVideo = document.createElement("video");
      captureVideo.id = "mwl-ss-capture-video";
      captureVideo.srcObject = stream;
      captureVideo.muted = true;
      captureVideo.playsInline = true;
      captureVideo.autoplay = true;
      captureVideo.style.cssText =
        "position:fixed;bottom:0;right:0;width:2px;height:2px;opacity:0.01;pointer-events:none;z-index:-1;";
      document.body.appendChild(captureVideo);
      captureVideo.play().catch(() => {});

      const captureCanvas = document.createElement("canvas");
      const captureCtx = captureCanvas.getContext("2d");

      const captureAndSendFrame = () => {
        if (!localStreamRef.current) return;
        if (p2pConnectedRef.current) return; // Direct WebRTC stream is active
        if (sendingFrameRef.current || ssChatQueueRef.current.length > 0) return;

        const sourceVid =
          localScreenVideoRef.current?.videoWidth > 0
            ? localScreenVideoRef.current
            : captureVideo;
        const vw = sourceVid.videoWidth;
        const vh = sourceVid.videoHeight;
        if (!vw || !vh) return;

        const maxDim = 640;
        let w = vw;
        let h = vh;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((maxDim / w) * h);
            w = maxDim;
          } else {
            w = Math.round((maxDim / h) * w);
            h = maxDim;
          }
        }

        captureCanvas.width = w;
        captureCanvas.height = h;
        captureCtx.drawImage(sourceVid, 0, 0, w, h);
        const frameDataUrl = captureCanvas.toDataURL("image/jpeg", 0.34);

        sendingFrameRef.current = true;
        const safetyReset = setTimeout(() => {
          sendingFrameRef.current = false;
        }, 3500);
        broadcastSS({ type: "SS_FRAME", frame: frameDataUrl }, null, () => {
          clearTimeout(safetyReset);
          sendingFrameRef.current = false;
        });
      };

      // Start WebRTC high-fps P2P stream negotiation immediately
      startWebRTCOffer(stream);

      // Send immediate preview frame once the video decodes its first frame
      captureVideo.onloadeddata = () => {
        setTimeout(captureAndSendFrame, 150);
      };
      setTimeout(captureAndSendFrame, 450);

      frameIntervalRef.current = setInterval(captureAndSendFrame, 1400);
    } catch (err) {
      console.log("Screen share cancelled or denied:", err);
    }
  };

  // Listen for incoming screen share signaling messages over Jitsi & BroadcastChannel
  useEffect(() => {
    const processIncomingSS = async (payloadStr, remoteSenderId) => {
      try {
        const msg = JSON.parse(payloadStr);
        if (!msg || !msg.mathWithLoveSS) return;
        if (msg.senderId === myClientId) return;

        if (remoteSenderId) {
          window.jitsiParticipants = window.jitsiParticipants || new Set();
          window.jitsiParticipants.add(remoteSenderId);
        }

        if (msg.mathWithLoveSSChunk) {
          const bucket = ssChunksRef.current[msg.msgId] || {
            chunks: new Array(msg.total),
            receivedCount: 0,
            total: msg.total
          };
          if (bucket.chunks[msg.index] === undefined) {
            bucket.chunks[msg.index] = msg.data;
            bucket.receivedCount += 1;
          }
          ssChunksRef.current[msg.msgId] = bucket;

          if (bucket.receivedCount === bucket.total) {
            const fullStr = bucket.chunks.join("");
            delete ssChunksRef.current[msg.msgId];
            processIncomingSS(fullStr, remoteSenderId);
          }
          return;
        }

        if (msg.packetId) {
          if (seenSSPacketsRef.current.has(msg.packetId)) return;
          seenSSPacketsRef.current.add(msg.packetId);
          if (seenSSPacketsRef.current.size > 1000) {
            const oldest = seenSSPacketsRef.current.values().next().value;
            seenSSPacketsRef.current.delete(oldest);
          }
        }

        if (msg.type === "SS_START") {
          setRemoteSharingActive(true);
        } else if (msg.type === "SS_STOP") {
          setRemoteSharingActive(false);
          setRemoteScreenFrame(null);
          setHasRemoteWebRTCStream(false);
          remoteStreamRef.current = null;
          cleanupPeerConnection();
        } else if (msg.type === "SS_FRAME") {
          setRemoteSharingActive(true);
          setRemoteScreenFrame(msg.frame);
        } else if (msg.type === "SS_OFFER") {
          setRemoteSharingActive(true);
          cleanupPeerConnection();
          const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
          pcRef.current = pc;

          const markStreamLive = () => {
            const state = pc.connectionState || pc.iceConnectionState;
            if (state === "connected" || state === "completed") {
              p2pConnectedRef.current = true;
              if (remoteStreamRef.current) {
                setHasRemoteWebRTCStream(true);
              }
            }
          };

          pc.onconnectionstatechange = markStreamLive;
          pc.oniceconnectionstatechange = markStreamLive;

          pc.ontrack = (event) => {
            const stream = event.streams?.[0] || new MediaStream([event.track]);
            remoteStreamRef.current = stream;
            setRemoteSharingActive(true);
            if (remoteScreenVideoRef.current) {
              remoteScreenVideoRef.current.srcObject = stream;
              remoteScreenVideoRef.current.play?.().catch(() => {});
            }
            if (event.track) {
              event.track.onunmute = () => {
                setHasRemoteWebRTCStream(true);
              };
            }
          };

          await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
          while (pendingCandidatesRef.current.length > 0) {
            const cand = pendingCandidatesRef.current.shift();
            try {
              await pc.addIceCandidate(new RTCIceCandidate(cand));
            } catch (e) {}
          }

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await waitForIceGathering(pc, 700);

          if (pcRef.current === pc && pc.localDescription) {
            broadcastSS({ type: "SS_ANSWER", sdp: pc.localDescription }, remoteSenderId);
          }
        } else if (msg.type === "SS_ANSWER") {
          if (pcRef.current && pcRef.current.signalingState !== "stable") {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            while (pendingCandidatesRef.current.length > 0) {
              const cand = pendingCandidatesRef.current.shift();
              try {
                await pcRef.current.addIceCandidate(new RTCIceCandidate(cand));
              } catch (e) {}
            }
          }
        } else if (msg.type === "SS_CANDIDATE") {
          if (msg.candidate) {
            if (pcRef.current && pcRef.current.remoteDescription) {
              try {
                await pcRef.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
              } catch (e) {}
            } else {
              pendingCandidatesRef.current.push(msg.candidate);
            }
          }
        } else if (msg.type === "SS_REQUEST") {
          if (localStreamRef.current) {
            startWebRTCOffer(localStreamRef.current, remoteSenderId);
          }
        }
      } catch (e) {
        // Ignore non-SS messages
      }
    };

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const bc = new BroadcastChannel("math_with_love_ss");
        bc.onmessage = (ev) => {
          if (ev && typeof ev.data === "string") {
            processIncomingSS(ev.data, null);
          }
        };
        ssBroadcastChannelRef.current = bc;
      } catch (e) {}
    }

    const handleEndpointMsg = (event) => {
      if (!event) return;
      const text =
        event.eventData?.text ||
        event.data?.eventData?.text ||
        (typeof event.text === "string" ? event.text : null);
      const senderId =
        event.senderInfo?.id ||
        event.data?.senderInfo?.id ||
        null;
      if (text) {
        processIncomingSS(text, senderId);
      }
    };

    const handleChatMsg = (event) => {
      if (!event || typeof event.message !== "string") return;
      if (event.from) {
        window.jitsiParticipants = window.jitsiParticipants || new Set();
        window.jitsiParticipants.add(event.from);
      }
      const trimmed = event.message.trim();
      const idx = trimmed.indexOf("[SS]:");
      if (idx !== -1) {
        processIncomingSS(trimmed.substring(idx + 5), event.from || null);
      }
    };

    const handleParticipantJoined = () => {
      if (localStreamRef.current) {
        setTimeout(() => {
          startWebRTCOffer(localStreamRef.current);
        }, 600);
      }
    };

    const handleJoined = () => {
      setTimeout(() => {
        broadcastSS({ type: "SS_REQUEST" });
      }, 900);
    };

    let boundApi = null;
    const bindListeners = () => {
      if (window.jitsiApi && window.jitsiApi !== boundApi) {
        if (boundApi) {
          try {
            boundApi.removeListener("endpointTextMessageReceived", handleEndpointMsg);
            boundApi.removeListener("incomingMessage", handleChatMsg);
          } catch (e) {}
        }
        boundApi = window.jitsiApi;
        boundApi.on("endpointTextMessageReceived", handleEndpointMsg);
        boundApi.on("incomingMessage", handleChatMsg);
      }
    };

    bindListeners();
    window.addEventListener("jitsi-ready", bindListeners);
    window.addEventListener("jitsi-participant-joined", handleParticipantJoined);
    window.addEventListener("jitsi-video-conference-joined", handleJoined);

    return () => {
      if (ssChatTimerRef.current) {
        clearTimeout(ssChatTimerRef.current);
        ssChatTimerRef.current = null;
      }
      if (ssBroadcastChannelRef.current) {
        try {
          ssBroadcastChannelRef.current.close();
        } catch (e) {}
        ssBroadcastChannelRef.current = null;
      }
      if (boundApi) {
        try {
          boundApi.removeListener("endpointTextMessageReceived", handleEndpointMsg);
          boundApi.removeListener("incomingMessage", handleChatMsg);
        } catch (e) {}
      }
      window.removeEventListener("jitsi-ready", bindListeners);
      window.removeEventListener("jitsi-participant-joined", handleParticipantJoined);
      window.removeEventListener("jitsi-video-conference-joined", handleJoined);
    };
  }, []);

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
      stopScreenShare(true);
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

      // Omit 'desktop' from fairmeeting's internal toolbar so its paid upgrade popup never triggers;
      // live screen sharing is handled natively by our own free WebRTC Share Screen button above!
      const toolbarButtons = [
        "microphone",
        "camera",
        "fullscreen",
        "fodeviceselection",
        "hangup",
        "chat",
        "raisehand",
        "tileview",
        "settings"
      ];

      const options = {
        roomName: `MathWithLove_${roomName}`,
        width: "100%",
        height: "100%",
        parentNode: container,
        configOverwrite: {
          prejoinPageEnabled: false,
          disableInviteFunctions: true,
          disabledSounds: ['INCOMING_MSG_SOUND'],
          disabledNotifications: ['notify.chatMessages'],
          toolbarButtons
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          MOBILE_APP_PROMO: false,
          TOOLBAR_BUTTONS: toolbarButtons
        }
      };

      try {
        const api = new window.JitsiMeetExternalAPI(serverHost, options);
        window.jitsiApi = api;
        window.dispatchEvent(new Event("jitsi-ready"));

        api.on("participantJoined", (ev) => {
          if (ev && ev.id) {
            window.jitsiParticipants = window.jitsiParticipants || new Set();
            window.jitsiParticipants.add(ev.id);
          }
          window.dispatchEvent(new Event("jitsi-participant-joined"));
        });

        api.on("participantLeft", (ev) => {
          if (ev && ev.id && window.jitsiParticipants instanceof Set) {
            window.jitsiParticipants.delete(ev.id);
          }
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

  const screenShareVisible = isSharingScreen || remoteSharingActive;

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
          {/* Native Paywall-Free Live Screen Share Button */}
          {!isPreview && inCall && (
            <button
              onClick={startScreenShare}
              className={`btn-session ${isSharingScreen ? "btn-danger" : "btn-secondary-dark"} flex-center gap-1`}
              title={isSharingScreen ? "Stop sharing your screen" : "Share your screen live with the classroom"}
            >
              {isSharingScreen ? <MonitorStop size={14} /> : <MonitorUp size={14} />}
              <span>{isSharingScreen ? "Stop Sharing" : "Share Screen"}</span>
            </button>
          )}

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
        {/* Left pane: Live Screen Share Stage + Jitsi Meet Call */}
        <section className="session-video-pane" style={{ display: "flex", flexDirection: "column" }}>
          {/* Native Live Screen Share Stage (appears above video call when either party shares their screen) */}
          {screenShareVisible && (
            <div
              style={{
                height: maximizeScreenShare ? "100%" : "62%",
                width: "100%",
                backgroundColor: "#090d16",
                borderBottom: "2px solid #334155",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.35rem 0.75rem",
                  backgroundColor: "#1e293b",
                  borderBottom: "1px solid #334155",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#e2e8f0"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      display: "inline-block"
                    }}
                  />
                  {isSharingScreen ? "Sharing Your Screen Live" : "Participant's Shared Screen"}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <button
                    onClick={() => {
                      const nextMax = !maximizeScreenShare;
                      setMaximizeScreenShare(nextMax);
                      if (nextMax && videoWidthPercent < 55) {
                        setVideoWidthPercent(58);
                      } else if (!nextMax && videoWidthPercent > 50) {
                        setVideoWidthPercent(40);
                      }
                    }}
                    style={{
                      background: "#334155",
                      border: "none",
                      color: "#f8fafc",
                      borderRadius: "4px",
                      padding: "0.2rem 0.45rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.72rem",
                      fontWeight: 700
                    }}
                    title={maximizeScreenShare ? "Show Video Call Below" : "Expand Screen Share"}
                  >
                    {maximizeScreenShare ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                    <span>{maximizeScreenShare ? "Split View" : "Expand"}</span>
                  </button>
                  {isSharingScreen && (
                    <button
                      onClick={() => stopScreenShare(true)}
                      style={{
                        background: "#ef4444",
                        border: "none",
                        color: "#ffffff",
                        borderRadius: "4px",
                        padding: "0.2rem 0.5rem",
                        cursor: "pointer",
                        fontSize: "0.72rem",
                        fontWeight: 700
                      }}
                    >
                      Stop
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  backgroundColor: "#000000"
                }}
              >
                {isSharingScreen ? (
                  <video
                    ref={localScreenVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <>
                    <video
                      ref={remoteScreenVideoRef}
                      autoPlay
                      playsInline
                      muted
                      onLoadedData={() => setHasRemoteWebRTCStream(true)}
                      onPlaying={() => setHasRemoteWebRTCStream(true)}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: hasRemoteWebRTCStream ? "block" : "none"
                      }}
                    />
                    {!hasRemoteWebRTCStream && remoteScreenFrame && (
                      <img
                        src={remoteScreenFrame}
                        alt="Shared Screen"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    )}
                    {!hasRemoteWebRTCStream && !remoteScreenFrame && (
                      <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                        Connecting to shared screen...
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

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
                height: screenShareVisible ? (maximizeScreenShare ? "0%" : "38%") : "100%",
                display: screenShareVisible && maximizeScreenShare ? "none" : "block",
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
