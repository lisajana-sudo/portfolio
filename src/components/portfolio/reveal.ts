/** Seconds from load until the curtain starts to lift. */
const CURTAIN_S = 2.2;

/** Hero may start while the curtain is still rising. */
export const heroEntrance = CURTAIN_S + 0.2;

/** Nav follows the hero, once the curtain is nearly gone. */
export const navEntrance = CURTAIN_S + 0.6;

/** How long the preloader counts before it finishes. */
export const countMs = (CURTAIN_S - 0.5) * 1000;
