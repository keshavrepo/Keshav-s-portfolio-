/**
 * Scene lifecycle (ARCHITECTURE §8): nothing renders that cannot also be
 * cleanly torn down — traversal replays causally (NR-61), and a scene's
 * disposal is part of its authorship.
 */
export interface SceneLifecycle {
  /** Acquire resources; may be async (asset budgets, shader compiles). */
  mount(): void | Promise<void>;
  /** Begin performing; called when the scene becomes the solo voice. */
  activate(): void;
  /** Yield the stage; the scene keeps state but stops performing. */
  deactivate(): void;
  /** Return every byte and listener. */
  dispose(): void;
}

/** Identity helper that types a scene module at its definition site. */
export function defineScene<T extends SceneLifecycle>(scene: T): T {
  return scene;
}
