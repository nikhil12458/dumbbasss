import type { KineticWordOptions, KineticWordInstance } from "./types";

/**
 * kinetic-type — samples a word set in a large display font into a grid of
 * "lit" pixels, builds a particle for each lit cell, connects neighboring
 * particles with distance constraints (a cloth-like mesh), and pins the
 * topmost particle in each column. The result: the word hangs from its own
 * silhouette and can sway, drift, and be dragged, while a spring-back force
 * keeps it legible instead of collapsing under gravity.
 *
 * This file has zero framework dependencies — it's plain DOM + Canvas 2D.
 * See KineticWord.tsx for the React wrapper.
 */

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

type ResolvedOptions = Required<KineticWordOptions>;

const DEFAULTS: ResolvedOptions = {
  word: "hello",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  glyphFontFamily: "'JetBrains Mono', monospace",
  glyphFontWeight: 600,
  ink: "#1C1712",
  widthFraction: 0.88,
  spacing: 7,
  gravity: 0.05,
  windAmp: 0.02,
  windFreq: 0.0016,
  damping: 0.985,
  restoreStrength: 0.035,
  iterations: 5,
  compressV: 0.35,
  stretchV: 1.55,
  compressH: 0.55,
  stretchH: 1.9,
  interactive: true,
  mouseRadius: 2600,
  mouseStrength: 2.2,
  grabRadius: 16,
  loadWobble: true,
  loadWobbleDelay: 350,
  respectReducedMotion: true,
};

class Vec2 {
  constructor(public x = 0, public y = 0) {}
  reset(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  add(v: Vec2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(v: Vec2) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  subtractNew(v: Vec2) {
    return this.clone().subtract(v);
  }
  get lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  get length() {
    return Math.hypot(this.x, this.y);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
}

interface ParticleArgs {
  x: number;
  y: number;
  pinned: boolean;
  col: number;
  row: number;
  char: string;
}

class Particle {
  pos: Vec2;
  oldPos: Vec2;
  acceleration = new Vec2();
  pinned: boolean;
  homeX: number;
  homeY: number;
  col: number;
  row: number;
  char: string;
  downConstraint?: Constraint;
  _wasPinned?: boolean;

  constructor({ x, y, pinned, col, row, char }: ParticleArgs) {
    this.pos = new Vec2(x, y);
    this.oldPos = new Vec2(x, y);
    this.pinned = pinned;
    this.homeX = x;
    this.homeY = y;
    this.col = col;
    this.row = row;
    this.char = char;
  }

  update(
    delta: number,
    gravity: number,
    damping: number,
    windAmp: number,
    windFreq: number,
    t: number,
    restoreStrength: number,
  ) {
    if (this.pinned) {
      this.acceleration.reset();
      return;
    }

    const vx = (this.pos.x - this.oldPos.x) * damping;
    const vy = (this.pos.y - this.oldPos.y) * damping;
    this.oldPos.reset(this.pos.x, this.pos.y);

    const dd = delta * delta || 0.0001;

    // ambient sideways drift — the "gently alive" wobble
    const wind =
      Math.sin(t * windFreq + this.col * 0.14 + this.row * 0.05) * windAmp;

    // pulls every particle back toward the position it started at, so the
    // mesh recovers its shape instead of sagging/drifting away permanently
    const restoreX = (this.homeX - this.pos.x) * restoreStrength;
    const restoreY = (this.homeY - this.pos.y) * restoreStrength;

    this.acceleration.x += (wind + restoreX) / dd;
    this.acceleration.y += (gravity + restoreY) / dd;

    this.pos.x += vx + this.acceleration.x * dd;
    this.pos.y += vy + this.acceleration.y * dd;

    this.acceleration.reset();
  }

  applyForce(v: Vec2) {
    this.acceleration.add(v);
  }
}

interface ConstraintArgs {
  p1: Particle;
  p2: Particle;
  length: number;
  compress: number;
  stretch: number;
}

class Constraint {
  p1: Particle;
  p2: Particle;
  length: number;
  minLength: number;
  maxLength: number;

  constructor({ p1, p2, length, compress, stretch }: ConstraintArgs) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length;
    this.minLength = length * compress;
    this.maxLength = length * stretch;
  }

  solve() {
    const dx = this.p2.pos.x - this.p1.pos.x;
    const dy = this.p2.pos.y - this.p1.pos.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;

    let target = this.length;
    if (dist < this.minLength) target = this.minLength;
    else if (dist > this.maxLength) target = this.maxLength;
    else return;

    const diff = (target - dist) / dist / 2;
    const ox = dx * diff;
    const oy = dy * diff;
    if (!this.p1.pinned) {
      this.p1.pos.x -= ox;
      this.p1.pos.y -= oy;
    }
    if (!this.p2.pinned) {
      this.p2.pos.x += ox;
      this.p2.pos.y += oy;
    }
  }
}

interface GlyphSprite extends HTMLCanvasElement {
  logicalSize: number;
}

export function mountKineticWord(
  container: HTMLElement,
  opts: KineticWordOptions,
): KineticWordInstance {
  const cfg: ResolvedOptions = { ...DEFAULTS, ...opts };

  const charset = cfg.word.replace(/[^a-zA-Z0-9]/g, "") || "x";
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: Map<string, Particle>;
  let particleList: Particle[] = [];
  let constraints: Constraint[] = [];
  let input: Input | undefined;
  let rafId = 0;
  let widthPx = 0;
  let heightPx = 0;
  let running = true;
  let isPaused = false;
  let lastDelta = 0;
  let timeAccumulator = 0;
  let loadWobbleTimer: ReturnType<typeof setTimeout> | undefined;
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function measureAndBuildMask(stageW: number, stageH: number) {
    const probe = document.createElement("canvas").getContext("2d")!;
    probe.font = `${cfg.fontWeight} 100px ${cfg.fontFamily}`;
    const w100 = probe.measureText(cfg.word).width;
    const targetW = stageW * cfg.widthFraction;
    const fontSize = Math.max(24, 100 * (targetW / w100));

    const pad = fontSize * 0.28;
    const off = document.createElement("canvas");
    off.width = Math.ceil(targetW + pad * 2);
    off.height = Math.ceil(fontSize * 1.5);
    const octx = off.getContext("2d")!;
    octx.font = `${cfg.fontWeight} ${fontSize}px ${cfg.fontFamily}`;
    octx.textBaseline = "alphabetic";
    octx.fillStyle = "#000";
    const metrics = octx.measureText(cfg.word);
    const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.75;
    const descent = metrics.actualBoundingBoxDescent || fontSize * 0.22;
    // resizing the canvas clears its 2D state, so font/baseline/fill are re-applied
    off.height = Math.ceil(ascent + descent + pad * 2);
    octx.font = `${cfg.fontWeight} ${fontSize}px ${cfg.fontFamily}`;
    octx.textBaseline = "alphabetic";
    octx.fillStyle = "#000";
    octx.fillText(cfg.word, pad, pad + ascent);

    const img = octx.getImageData(0, 0, off.width, off.height).data;
    const spacing = cfg.spacing;
    const cols = Math.floor(off.width / spacing);
    const rows = Math.floor(off.height / spacing);

    const grid = new Map<string, { x: number; y: number }>();
    const topOfCol = new Map<number, number>();

    for (let cx = 0; cx < cols; cx++) {
      for (let cy = 0; cy < rows; cy++) {
        const px = Math.min(off.width - 1, cx * spacing + Math.floor(spacing / 2));
        const py = Math.min(off.height - 1, cy * spacing + Math.floor(spacing / 2));
        const alpha = img[(py * off.width + px) * 4 + 3];
        if (alpha > 110) {
          grid.set(cx + "," + cy, { x: cx * spacing, y: cy * spacing });
          if (!topOfCol.has(cx) || cy < topOfCol.get(cx)!) topOfCol.set(cx, cy);
        }
      }
    }

    const maskW = cols * spacing;
    const maskH = rows * spacing;
    const offsetX = (stageW - maskW) / 2;
    const offsetY = Math.max(0, (stageH - maskH) / 2);

    return { grid, topOfCol, spacing, offsetX, offsetY };
  }

  function buildGlyphAtlas(spacing: number): Record<string, GlyphSprite> {
    const box = Math.ceil(spacing * 2.2);
    const atlas: Record<string, GlyphSprite> = {};
    const glyphFontSize = Math.max(7, spacing * 1.15);
    const charArray = Array.from(new Set(charset.split("")));
    for (const ch of charArray) {
      const c = document.createElement("canvas") as GlyphSprite;
      c.width = c.height = Math.ceil(box * dpr);
      const gctx = c.getContext("2d")!;
      gctx.scale(dpr, dpr);
      gctx.font = `${cfg.glyphFontWeight} ${glyphFontSize}px ${cfg.glyphFontFamily}`;
      gctx.textAlign = "center";
      gctx.textBaseline = "middle";
      gctx.fillStyle = cfg.ink;
      gctx.fillText(ch, box / 2, box / 2);
      c.logicalSize = box;
      atlas[ch] = c;
    }
    return atlas;
  }

  function build() {
    if (rafId) cancelAnimationFrame(rafId);
    if (input) input.unbind();
    clearTimeout(loadWobbleTimer);

    const reduceMotion = cfg.respectReducedMotion && reduceMotionQuery.matches;
    const effectiveGravity = reduceMotion ? 0 : cfg.gravity;
    const effectiveWindAmp = reduceMotion ? 0 : cfg.windAmp;

    widthPx = container.clientWidth;
    heightPx = Math.max(220, container.clientHeight || widthPx * 0.55);

    canvas = document.createElement("canvas");
    container.innerHTML = "";
    container.appendChild(canvas);
    canvas.style.width = widthPx + "px";
    canvas.style.height = heightPx + "px";
    canvas.width = Math.round(widthPx * dpr);
    canvas.height = Math.round(heightPx * dpr);
    ctx = canvas.getContext("2d")!;

    const { grid, topOfCol, spacing, offsetX, offsetY } = measureAndBuildMask(widthPx, heightPx);
    const atlas = buildGlyphAtlas(spacing);

    particles = new Map();
    let i = 0;
    const charList = charset.split("");
    grid.forEach((pos, key) => {
      const [col, row] = key.split(",").map(Number);
      const pinned = topOfCol.get(col) === row;
      const ch = charList[i % charList.length];
      i++;
      particles.set(key, new Particle({ x: pos.x + offsetX, y: pos.y + offsetY, pinned, col, row, char: ch }));
    });

    constraints = [];
    particles.forEach((p, key) => {
      const [col, row] = key.split(",").map(Number);
      const rightKey = col + 1 + "," + row;
      const downKey = col + "," + (row + 1);
      if (particles.has(rightKey)) {
        constraints.push(
          new Constraint({ p1: p, p2: particles.get(rightKey)!, length: spacing, compress: cfg.compressH, stretch: cfg.stretchH }),
        );
      }
      if (particles.has(downKey)) {
        const down = particles.get(downKey)!;
        const con = new Constraint({ p1: p, p2: down, length: spacing, compress: cfg.compressV, stretch: cfg.stretchV });
        constraints.push(con);
        p.downConstraint = con;
      }
    });

    particleList = Array.from(particles.values());

    if (cfg.interactive) {
      input = new Input(canvas, particleList, cfg);
    }

    if (cfg.loadWobble && !reduceMotion) {
      // A single small random nudge shortly after the mesh first settles,
      // so it visibly "drops" into place instead of appearing static.
      loadWobbleTimer = setTimeout(() => {
        if (!running || isPaused) return;
        particleList.forEach((p) => {
          if (p.pinned) return;
          p.pos.x += Math.random() * 8 - 4;
          p.pos.y += Math.random() * 4 + 6;
        });
      }, cfg.loadWobbleDelay);
    }

    function draw() {
      particleList.forEach((p) => {
        const img = atlas[p.char];
        if (!img) return;
        let cos = 1;
        let sin = 0;
        const con = p.downConstraint;
        if (con) {
          const dx = con.p2.pos.x - con.p1.pos.x;
          const dy = con.p2.pos.y - con.p1.pos.y;
          const angle = Math.atan2(dy, dx) - Math.PI / 2;
          cos = Math.cos(angle);
          sin = Math.sin(angle);
        }
        const tx = p.pos.x;
        const ty = p.pos.y;
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * tx, dpr * ty);
        const half = img.logicalSize / 2;
        ctx.drawImage(img, -half, -half, img.logicalSize, img.logicalSize);
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function loop(t: number) {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      if (isPaused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let delta = t - lastDelta;
      if (lastDelta === 0) delta = 16.666;
      delta = Math.min(delta, 50); // clamp so a dropped/backgrounded frame can't cause a physics explosion
      lastDelta = t;

      // fixed-timestep accumulator: the simulation always advances in
      // constant 16.666ms steps, however often the browser actually calls
      // this loop — keeps behavior consistent across 60Hz/120Hz+ displays
      timeAccumulator += delta;
      while (timeAccumulator >= 16.666) {
        particleList.forEach((p) =>
          p.update(16.666, effectiveGravity, cfg.damping, effectiveWindAmp, cfg.windFreq, t, cfg.restoreStrength),
        );
        for (let k = 0; k < cfg.iterations; k++) {
          for (let j = 0; j < constraints.length; j++) constraints[j].solve();
        }
        timeAccumulator -= 16.666;
      }

      draw();
    }
    rafId = requestAnimationFrame(loop);
  }

  class Input {
    mouse = new Vec2();
    grabbed: Particle | null = null;
    private boundDown: (e: PointerEvent) => void;
    private boundUp: () => void;
    private boundMove: (e: PointerEvent) => void;

    constructor(
      private canvas: HTMLCanvasElement,
      private particles: Particle[],
      private cfg: ResolvedOptions,
    ) {
      this.boundDown = this.down.bind(this);
      this.boundUp = this.up.bind(this);
      this.boundMove = this.move.bind(this);
      document.addEventListener("pointerdown", this.boundDown, { passive: true });
      document.addEventListener("pointerup", this.boundUp, { passive: true });
      document.addEventListener("pointermove", this.boundMove, { passive: true });
    }

    private setMouse(e: PointerEvent) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }

    private down(e: PointerEvent) {
      if (e.target !== this.canvas) return;
      this.setMouse(e);
      const isTouch = e.pointerType === "touch" || (typeof window !== "undefined" && window.innerWidth < 640);
      const radius = isTouch ? Math.max(this.cfg.grabRadius, 32) : this.cfg.grabRadius;
      for (const p of this.particles) {
        if (this.mouse.subtractNew(p.pos).length < radius) {
          this.grabbed = p;
          this.grabbed._wasPinned = p.pinned;
          p.pinned = true;
          break;
        }
      }
    }

    private up() {
      if (this.grabbed) {
        this.grabbed.pinned = this.grabbed._wasPinned!;
        this.grabbed = null;
      }
    }

    private move(e: PointerEvent) {
      this.setMouse(e);
      if (this.grabbed) {
        this.grabbed.pos.reset(this.mouse.x, this.mouse.y);
        this.grabbed.oldPos.reset(this.mouse.x, this.mouse.y);
      }

      // This listener is bound to `document` (so a drag can continue past
      // the canvas edge), not the canvas itself — it fires on every mouse
      // move anywhere on the page. Skip the O(n) proximity scan entirely
      // when the pointer is nowhere near the canvas.
      const pad = Math.sqrt(this.cfg.mouseRadius);
      if (
        this.mouse.x < -pad ||
        this.mouse.x > this.canvas.clientWidth + pad ||
        this.mouse.y < -pad ||
        this.mouse.y > this.canvas.clientHeight + pad
      ) {
        return;
      }

      for (const p of this.particles) {
        if (p.pinned) continue;
        const diff = this.mouse.subtractNew(p.pos);
        const ls = diff.lengthSquared;
        if (ls < this.cfg.mouseRadius) {
          const a = diff.angle - Math.PI;
          const strength = (smoothstep(this.cfg.mouseRadius, -2000, ls) * this.cfg.mouseStrength) / 300;
          p.applyForce(new Vec2(Math.cos(a) * strength, Math.sin(a) * strength));
        }
      }
    }

    unbind() {
      document.removeEventListener("pointerdown", this.boundDown);
      document.removeEventListener("pointerup", this.boundUp);
      document.removeEventListener("pointermove", this.boundMove);
    }
  }

  build();

  let resizeTimer: ReturnType<typeof setTimeout>;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 250);
  };
  window.addEventListener("resize", handleResize);
  // If the OS-level preference changes while this is mounted (rare, but
  // easy to hit while testing), rebuild so it takes effect immediately
  // rather than waiting for the next resize or remount.
  reduceMotionQuery.addEventListener("change", handleResize);

  return {
    pause() {
      isPaused = true;
    },
    resume() {
      isPaused = false;
      lastDelta = 0;
      timeAccumulator = 0;
    },
    destroy() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (input) input.unbind();
      clearTimeout(loadWobbleTimer);
      window.removeEventListener("resize", handleResize);
      reduceMotionQuery.removeEventListener("change", handleResize);
      clearTimeout(resizeTimer);
    },
  };
}
