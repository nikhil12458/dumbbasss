/**
 * Public configuration for mountKineticWord(). Every field is optional —
 * sensible defaults live alongside the engine in kinetic-type.ts.
 */
export interface KineticWordOptions {
  /** The text to render. Letters, numbers, and spaces only — punctuation
   * is stripped when building the glyph set (it rarely samples cleanly
   * from a display font at small sizes). Required in practice. */
  word: string;

  /** CSS font-family string used to render (and measure) the word itself,
   * e.g. `"'Space Grotesk', sans-serif"`. Should be a bold/black display
   * weight for the mask to sample cleanly — thin weights produce a sparse,
   * fragile-looking mesh. */
  fontFamily?: string;

  /** Numeric font-weight passed alongside fontFamily when measuring/drawing
   * the source word. */
  fontWeight?: number;

  /** Font family used for the tiny individual glyphs that make up the mesh.
   * Defaults to a monospace font so every glyph occupies a predictable box. */
  glyphFontFamily?: string;

  /** Numeric font-weight for the small glyph atlas. */
  glyphFontWeight?: number;

  /** Fill color for the small glyphs. Any valid CSS color string. */
  ink?: string;

  /** Fraction (0–1) of the container's width the word should target when
   * choosing a font size. */
  widthFraction?: number;

  /** Distance in CSS pixels between sample points when building the
   * particle grid. Smaller = denser mesh = more particles = more detail,
   * at a real CPU cost. 6–9 is a reasonable range for most word lengths. */
  spacing?: number;

  /** Downward pull applied to every unpinned particle each physics step. */
  gravity?: number;

  /** Amplitude of the ambient sinusoidal sideways drift applied to every
   * unpinned particle — this is the "gently alive" wobble, independent of
   * any pointer interaction. */
  windAmp?: number;

  /** Angular frequency of that same ambient drift. */
  windFreq?: number;

  /** Velocity retained per physics step (0–1). Lower = more friction,
   * settles faster; higher = looser, keeps moving longer. */
  damping?: number;

  /** How strongly each particle is pulled back toward the exact position
   * it started at. This is what keeps the word legible and self-recovering
   * instead of sagging into a shapeless pile under gravity. */
  restoreStrength?: number;

  /** Constraint solver iterations per physics step. More = stiffer, more
   * accurate mesh, more CPU per frame. 4–6 is a good range. */
  iterations?: number;

  /** Compression/stretch tolerance (as a fraction of rest length) for the
   * vertical constraints between stacked particles. */
  compressV?: number;
  stretchV?: number;

  /** Same, for the horizontal constraints between side-by-side particles. */
  compressH?: number;
  stretchH?: number;

  /** Whether pointer interaction (drag a particle, push nearby ones) is
   * enabled at all. Set false for a purely decorative, non-interactive word. */
  interactive?: boolean;

  /** Squared-pixel radius (in canvas space) within which nearby particles
   * feel a pointer's presence, even without a direct grab. */
  mouseRadius?: number;

  /** Strength of the push force applied within mouseRadius. */
  mouseStrength?: number;

  /** Pixel radius within which a pointer-down will "grab" the nearest
   * particle and drag it directly. */
  grabRadius?: number;

  /** If true, gives the mesh one small random nudge shortly after it first
   * settles into place, so it visibly "drops" into position instead of
   * appearing static. Set false to disable. */
  loadWobble?: boolean;

  /** Delay in ms before the load-in wobble fires. */
  loadWobbleDelay?: number;

  /** When true (the default), ambient motion — the gravity pull and the
   * sideways wind drift — is suppressed for visitors whose OS is set to
   * "reduce motion", per the `prefers-reduced-motion` media query. The
   * mesh still renders in its resting shape and can still be dragged
   * (user-initiated interaction isn't what that preference is about) —
   * it just won't autoplay a continuous sway. Set false to ignore the
   * preference and always animate. */
  respectReducedMotion?: boolean;
}

/** What mountKineticWord() returns. Hold onto this to pause, resume, or
 * tear the simulation down (e.g. on unmount, or when scrolled offscreen). */
export interface KineticWordInstance {
  /** Freezes the simulation in place (still visible, stops updating). Cheap
   * to call repeatedly; safe to call when already paused. */
  pause(): void;
  /** Resumes a paused simulation. Resets internal frame timing so there's
   * no large "catch-up" jump for time spent paused. */
  resume(): void;
  /** Cancels the animation loop, removes all event listeners, and clears
   * the canvas from the container. Call this on unmount. The instance
   * cannot be reused after destroy() — call mountKineticWord() again. */
  destroy(): void;
}
