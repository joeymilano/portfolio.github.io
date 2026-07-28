/* ============================================================
   ID.AURA — Console · dynamic layout engine (Phase C1)
   A small card-registry: media / comfort / vehicle / ambience
   compete for 3 fixed rail slots. Each card scores itself
   against the current driving context; the top 3 scores win a
   slot (ranked L/M/S), the loser is hidden. Slot changes reflow
   with a FLIP (First-Last-Invert-Play) animation so the rail
   never "pops" — it always looks like it settled there.

   Nav/map is intentionally NOT a candidate here — it always
   owns the stage and never competes for a rail slot.

   Contract: createLayoutEngine({ rail, cards, gsap }) →
     { applyContext(partialCtx), setScenario(name), get context(),
       get visible(), SCENARIOS }
   ============================================================ */

const SLOTS = 3;
const SIZE_BY_RANK = ['l', 'm', 's'];

export const SCENARIOS = {
  PARKED: {
    speed: 0, soc: 74, timeOfDay: 'day', navState: 'idle',
    weather: 'mild', occupancy: 1, driveMode: 'park', charging: false
  },
  CHARGING: {
    speed: 0, soc: 38, timeOfDay: 'day', navState: 'idle',
    weather: 'mild', occupancy: 1, driveMode: 'park', charging: true
  },
  COMMUTE: {
    speed: 60, soc: 82, timeOfDay: 'day', navState: 'commute',
    weather: 'mild', occupancy: 1, driveMode: 'cruise', charging: false
  },
  'HIGHWAY-PILOT': {
    speed: 120, soc: 55, timeOfDay: 'day', navState: 'highway',
    weather: 'clear', occupancy: 1, driveMode: 'pilot', charging: false
  },
  ARRIVING: {
    speed: 20, soc: 44, timeOfDay: 'day', navState: 'arriving',
    weather: 'mild', occupancy: 2, driveMode: 'cruise', charging: false
  },
  NIGHT: {
    speed: 40, soc: 66, timeOfDay: 'night', navState: 'commute',
    weather: 'clear', occupancy: 1, driveMode: 'cruise', charging: false
  }
};

export function createLayoutEngine({ rail, cards, gsap }) {
  let ctx = { ...SCENARIOS.COMMUTE };
  let visible = new Set();

  function computeRanking() {
    return cards
      .map((card) => ({ card, score: card.priority(ctx) }))
      .sort((a, b) => b.score - a.score);
  }

  function applyContext(partial) {
    ctx = { ...ctx, ...partial };
    const ranking = computeRanking();
    const top = ranking.slice(0, SLOTS);
    const topIds = new Set(top.map((r) => r.card.id));

    // FIRST — measure whatever is currently on screen, before any DOM change
    const first = new Map();
    cards.forEach((c) => {
      if (!c.el.hidden) first.set(c.id, c.el.getBoundingClientRect());
    });

    // reorder + resize + show/hide
    top.forEach(({ card }, rank) => {
      card.el.hidden = false;
      card.el.dataset.size = SIZE_BY_RANK[rank];
      rail.appendChild(card.el);
    });
    cards.forEach((c) => {
      if (!topIds.has(c.id)) c.el.hidden = true;
    });

    // LAST + INVERT + PLAY
    cards.forEach((c) => {
      if (c.el.hidden) return;
      const last = c.el.getBoundingClientRect();
      const f = first.get(c.id);
      if (f && f.width > 0 && last.width > 0) {
        const dx = f.left - last.left;
        const dy = f.top - last.top;
        const sx = f.width / last.width;
        const sy = f.height / last.height;
        gsap.fromTo(c.el,
          { x: dx, y: dy, scaleX: sx, scaleY: sy, transformOrigin: '0 0' },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.62, ease: 'power3.inOut', overwrite: true, clearProps: 'transform' }
        );
      } else {
        gsap.fromTo(c.el,
          { opacity: 0, y: 14, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true, clearProps: 'transform' }
        );
      }
    });

    visible = topIds;
    return top;
  }

  function setScenario(name) {
    const preset = SCENARIOS[name];
    if (!preset) return null;
    applyContext(preset);
    return preset;
  }

  return {
    applyContext,
    setScenario,
    get context() { return ctx; },
    get visible() { return visible; },
    SCENARIOS
  };
}
