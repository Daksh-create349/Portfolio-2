import { NextResponse } from "next/server";

interface PeerCursor {
  id: string;
  name: string;
  color: string;
  x: number; // percentage (0 - 100) of viewport width
  y: number; // absolute page coordinate (scrollY + clientY)
  action: string;
  lastSeen: number;
}

// In-memory global store for active peers
const activePeers = new Map<string, PeerCursor>();

// Clean up stale cursors (inactive for > 6 seconds)
function pruneStalePeers() {
  const now = Date.now();
  for (const [id, peer] of activePeers.entries()) {
    if (now - peer.lastSeen > 6000) {
      activePeers.delete(id);
    }
  }
}

export async function GET() {
  pruneStalePeers();
  const peers = Array.from(activePeers.values());
  return NextResponse.json({ peers, count: peers.length });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, name, color, x, y, action } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    activePeers.set(id, {
      id,
      name: (name || "Guest").slice(0, 24),
      color: color || "#0D99FF",
      x: typeof x === "number" ? Math.max(0, Math.min(100, x)) : 50,
      y: typeof y === "number" ? Math.max(0, y) : 0,
      action: action || "Daksh",
      lastSeen: Date.now(),
    });

    pruneStalePeers();
    const peers = Array.from(activePeers.values()).filter((p) => p.id !== id);

    return NextResponse.json({ success: true, peers, count: peers.length + 1 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update cursor" }, { status: 500 });
  }
}
