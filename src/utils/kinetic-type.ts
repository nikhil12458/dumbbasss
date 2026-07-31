export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

class Vec2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
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

class Particle {
  pos: Vec2;
  oldPos: Vec2;
  acceleration: Vec2;
  pinned: boolean;
  homeX: number;
  homeY: number;
  col: number;
  row: number;
  char: string;
  downConstraint?: any;
  _wasPinned?: boolean;

  constructor({ x, y, pinned, col, row, char }: any) {
    this.pos = new Vec2(x, y);
    this.oldPos = new Vec2(x, y);
    this.acceleration = new Vec2();
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

    // gentle horizontal wobble
    const wind =
      Math.sin(t * windFreq + this.col * 0.14 + this.row * 0.05) * windAmp;

    // pull every particle back toward the original word
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

class Constraint {
  p1: Particle;
  p2: Particle;
  length: number;
  minLength: number;
  maxLength: number;
  constructor({ p1, p2, length, compress, stretch }: any) {
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
    const ox = dx * diff,
      oy = dy * diff;
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

export function mountKineticWord(container: HTMLElement, opts?: any) {
  const cfg = Object.assign(
    {
      word: "dumbbasss",
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      spacing: 7,
      widthFraction: 0.88,
      ink: "#1C1712",
      gravity: 0.05,
      damping: 0.985,
      iterations: 5,
      windAmp: 0.028,
      windFreq: 0.0016,
      compressV: 0.35,
      stretchV: 1.55,
      compressH: 0.55,
      stretchH: 1.9,
      mouseRadius: 2600,
      mouseStrength: 2.2,
      interactive: true,
      grabRadius: 16,
      restoreStrength: 0.035,
    },
    opts || {},
  );

  const charset = cfg.word.replace(/[^a-zA-Z0-9]/g, "") || "x";
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    particles: Map<string, Particle>,
    constraints: Constraint[],
    input: Input,
    rafId: number,
    resizeObs: any;
  let widthPx = 0,
    heightPx = 0,
    running = true;

  function measureAndBuildMask(stageW: number, stageH: number) {
    const probe = document.createElement("canvas").getContext("2d")!;
    probe.font = `${cfg.fontWeight} 100px ${cfg.fontFamily}`;
    const w100 = probe.measureText(cfg.word).width;
    const targetW = stageW * cfg.widthFraction;
    let fontSize = Math.max(24, 100 * (targetW / w100));

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
    off.height = Math.ceil(ascent + descent + pad * 2);
    octx.font = `${cfg.fontWeight} ${fontSize}px ${cfg.fontFamily}`;
    octx.textBaseline = "alphabetic";
    octx.fillStyle = "#000";
    octx.fillText(cfg.word, pad, pad + ascent);

    const img = octx.getImageData(0, 0, off.width, off.height).data;
    const spacing = cfg.spacing;
    const cols = Math.floor(off.width / spacing);
    const rows = Math.floor(off.height / spacing);

    const grid = new Map();
    const topOfCol = new Map();

    for (let cx = 0; cx < cols; cx++) {
      for (let cy = 0; cy < rows; cy++) {
        const px = Math.min(
          off.width - 1,
          cx * spacing + Math.floor(spacing / 2),
        );
        const py = Math.min(
          off.height - 1,
          cy * spacing + Math.floor(spacing / 2),
        );
        const alpha = img[(py * off.width + px) * 4 + 3];
        if (alpha > 110) {
          grid.set(cx + "," + cy, { x: cx * spacing, y: cy * spacing });
          if (!topOfCol.has(cx) || cy < topOfCol.get(cx)) topOfCol.set(cx, cy);
        }
      }
    }

    const maskW = cols * spacing,
      maskH = rows * spacing;
    const offsetX = (stageW - maskW) / 2;
    const offsetY = Math.max(0, (stageH - maskH) / 2);

    return { grid, topOfCol, spacing, offsetX, offsetY, fontSize };
  }

  function buildGlyphAtlas(spacing: number) {
    const box = Math.ceil(spacing * 2.2);
    const atlas: any = {};
    const glyphFontSize = Math.max(7, spacing * 1.15);
    const charArray = Array.from(new Set(charset.split("")));
    for (const ch of charArray) {
      const c = document.createElement("canvas");
      c.width = c.height = Math.ceil(box * dpr);
      const gctx = c.getContext("2d")!;
      gctx.scale(dpr, dpr);
      gctx.font = `600 ${glyphFontSize}px "JetBrains Mono", monospace`;
      gctx.textAlign = "center";
      gctx.textBaseline = "middle";
      gctx.fillStyle = cfg.ink;
      gctx.fillText(ch as string, box / 2, box / 2);
      (c as any).logicalSize = box;
      atlas[ch as string] = c;
    }
    return atlas;
  }

  function build() {
    if (rafId) cancelAnimationFrame(rafId);
    if (input) input.unbind();

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

    const { grid, topOfCol, spacing, offsetX, offsetY } = measureAndBuildMask(
      widthPx,
      heightPx,
    );
    const atlas = buildGlyphAtlas(spacing);

    particles = new Map();
    let i = 0;
    const charList = charset.split("");
    grid.forEach((pos: any, key: any) => {
      const [col, row] = key.split(",").map(Number);
      const pinned = topOfCol.get(col) === row;
      const ch = charList[i % charList.length];
      i++;
      particles.set(
        key,
        new Particle({
          x: pos.x + offsetX,
          y: pos.y + offsetY,
          pinned,
          col,
          row,
          char: ch,
        }),
      );
    });

    constraints = [];
    particles.forEach((p, key) => {
      const [col, row] = key.split(",").map(Number);
      const rightKey = col + 1 + "," + row;
      const downKey = col + "," + (row + 1);
      if (particles.has(rightKey)) {
        constraints.push(
          new Constraint({
            p1: p,
            p2: particles.get(rightKey),
            length: spacing,
            compress: cfg.compressH,
            stretch: cfg.stretchH,
          }),
        );
      }
      if (particles.has(downKey)) {
        const down = particles.get(downKey);
        const con = new Constraint({
          p1: p,
          p2: down,
          length: spacing,
          compress: cfg.compressV,
          stretch: cfg.stretchV,
        });
        constraints.push(con);
        p.downConstraint = con;
      }
    });

    const particleList = Array.from(particles.values());

    if (cfg.interactive) {
      input = new Input({ canvas, particles: particleList, cfg });
    }

    function draw() {
      const ox = 0,
        oy = 0;
      particleList.forEach((p) => {
        const img = atlas[p.char];
        if (!img) return;
        let cos = 1,
          sin = 0;
        const con = p.downConstraint;
        if (con) {
          const dx = con.p2.pos.x - con.p1.pos.x;
          const dy = con.p2.pos.y - con.p1.pos.y;
          const angle = Math.atan2(dy, dx) - Math.PI / 2;
          cos = Math.cos(angle);
          sin = Math.sin(angle);
        }
        const tx = p.pos.x + ox,
          ty = p.pos.y + oy;
        ctx.setTransform(
          dpr * cos,
          dpr * sin,
          -dpr * sin,
          dpr * cos,
          dpr * tx,
          dpr * ty,
        );
        const half = img.logicalSize / 2;
        ctx.drawImage(img, -half, -half, img.logicalSize, img.logicalSize);
      });
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    let lastDelta = 0;
    function loop(t: number) {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const delta = t - lastDelta;
      particleList.forEach((p) =>
        p.update(
          16.6,
          cfg.gravity,
          cfg.damping,
          cfg.windAmp,
          cfg.windFreq,
          t,
          cfg.restoreStrength,
        ),
      );
      lastDelta = t;
      for (let k = 0; k < cfg.iterations; k++) {
        for (let j = 0; j < constraints.length; j++) constraints[j].solve();
      }
      draw();
    }
    rafId = requestAnimationFrame(loop);
  }

  class Input {
    canvas: HTMLCanvasElement;
    particles: Particle[];
    cfg: any;
    mouse: Vec2;
    grabbed: Particle | null = null;
    constructor({ canvas, particles, cfg }: any) {
      this.canvas = canvas;
      this.particles = particles;
      this.cfg = cfg;
      this.mouse = new Vec2();
      this.bind();
    }
    setMouse(e: any) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }
    down(e: any) {
      if (e.target !== this.canvas) return;
      this.setMouse(e);
      for (const p of this.particles) {
        if (this.mouse.subtractNew(p.pos).length < this.cfg.grabRadius) {
          this.grabbed = p;
          this.grabbed._wasPinned = p.pinned;
          p.pinned = true;
          break;
        }
      }
    }
    up() {
      if (this.grabbed) {
        this.grabbed.pinned = this.grabbed._wasPinned!;
        this.grabbed = null;
      }
    }
    move(e: any) {
      this.setMouse(e);
      if (this.grabbed) {
        this.grabbed.pos.reset(this.mouse.x, this.mouse.y);
        this.grabbed.oldPos.reset(this.mouse.x, this.mouse.y);
      }
      for (const p of this.particles) {
        if (p.pinned) continue;
        const diff = this.mouse.subtractNew(p.pos);
        const ls = diff.lengthSquared;
        if (ls < this.cfg.mouseRadius) {
          const a = diff.angle - Math.PI;
          const strength =
            (smoothstep(this.cfg.mouseRadius, -2000, ls) *
              this.cfg.mouseStrength) /
            300;
          p.applyForce(
            new Vec2(Math.cos(a) * strength, Math.sin(a) * strength),
          );
        }
      }
    }
    bind() {
      this.down = this.down.bind(this);
      this.up = this.up.bind(this);
      this.move = this.move.bind(this);
      document.addEventListener("pointerdown", this.down);
      document.addEventListener("pointerup", this.up);
      document.addEventListener("pointermove", this.move);
    }
    unbind() {
      document.removeEventListener("pointerdown", this.down);
      document.removeEventListener("pointerup", this.up);
      document.removeEventListener("pointermove", this.move);
    }
  }

  build();

  let resizeRAF: number;
  const handleResize = () => {
    cancelAnimationFrame(resizeRAF);
    resizeRAF = requestAnimationFrame(build);
  };
  window.addEventListener("resize", handleResize);

  return {
    destroy() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (input) input.unbind();
      window.removeEventListener("resize", handleResize);
    },
  };
}
