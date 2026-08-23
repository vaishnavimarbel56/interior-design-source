import { useSyncExternalStore } from "react";
import { SITE } from "@/lib/site-info";
import { UPLOADED_IMAGES, SUB_IMAGES } from "@/data/sub-images";
import showroom from "@/assets/showroom.jpg";
import { registerImageScanner } from "@/lib/catalog-store";

/* ------------------------------------------------------------------ *
 * Site settings store — contact info + homepage hero carousel.
 * 100% client side (IndexedDB). Supports a draft copy that admins can
 * preview before publishing, plus an audit log of every change.
 * ------------------------------------------------------------------ */

export type SiteInfo = {
  name: string;
  blurb: string;
  address: string;
  mapsUrl: string;
  phones: string[];
  whatsapp: string;
  email: string;
  youtube: string;
  facebook: string;
  facebookPage: string;
};

export type Slide = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  to: string;
};

export type AuditEntry = {
  id: string;
  at: number;
  who: string;
  area: "Site info" | "Carousel" | "Publishing";
  action: string;
};

export type SiteData = { info: SiteInfo; slides: Slide[] };

export type SettingsState = {
  published: SiteData;
  draft: SiteData;
  dirty: boolean;
  audit: AuditEntry[];
  previewDraft: boolean;
  loaded: boolean;
};

const DEFAULT_INFO: SiteInfo = {
  name: SITE.name,
  blurb: SITE.blurb,
  address: SITE.address,
  mapsUrl: SITE.mapsUrl,
  phones: [...SITE.phones],
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  youtube: SITE.social.youtube,
  facebook: SITE.social.facebook,
  facebookPage: SITE.social.facebookPage,
};

export const DEFAULT_SLIDES: Slide[] = [
  {
    id: "showroom",
    image: showroom,
    eyebrow: "Kolkata showroom",
    title: "Vaishnavi Marble — Kolkata's marble destination",
    text: "Italian marble, granite, tiles, sanitaryware, mandirs and statues under one roof.",
    to: "tiles",
  },
  {
    id: "radha-krishna",
    image: UPLOADED_IMAGES.radhaKrishna,
    eyebrow: "Marble statues",
    title: "Hand-carved Radha Krishna statues",
    text: "Pure white marble idols finished with gold detailing and vibrant hand painting.",
    to: "marble-statues",
  },
  {
    id: "lakshmi",
    image: UPLOADED_IMAGES.lakshmi,
    eyebrow: "Devotional collection",
    title: "Goddess Lakshmi in flawless white marble",
    text: "Seated lotus idols crafted by master artisans for homes and temples.",
    to: "marble-statues",
  },
  {
    id: "mandir",
    image: UPLOADED_IMAGES.marbleMandir,
    eyebrow: "Marble home interiors",
    title: "Bespoke marble mandirs",
    text: "Domes, pillars and jaali carving — built to your room size and budget.",
    to: "marble-home-interiors",
  },
  {
    id: "fireplace",
    image: UPLOADED_IMAGES.marbleFireplace,
    eyebrow: "Statement pieces",
    title: "Carved marble fireplaces",
    text: "Bas-relief mantels that turn a living room into a centrepiece.",
    to: "marble-home-interiors",
  },
  {
    id: "green-marble",
    image: UPLOADED_IMAGES.greenMarble,
    eyebrow: "Natural stone",
    title: "Green marble with dramatic veining",
    text: "Premium slabs selected block by block, polished to a mirror finish.",
    to: "marble-and-granite",
  },
  {
    id: "granite",
    image: SUB_IMAGES["granite"]!,
    eyebrow: "Granite",
    title: "Hard-wearing granite for kitchens & stairs",
    text: "Scratch and stain resistant surfaces in a wide palette of shades.",
    to: "marble-and-granite",
  },
  {
    id: "floor-tiles",
    image: SUB_IMAGES["floor-tiles"]!,
    eyebrow: "Tiles",
    title: "Vitrified floor & wall tiles",
    text: "Marble-look, wood-look and anti-skid ranges with live stock and bulk pricing.",
    to: "tiles",
  },
];

const defaultData = (): SiteData => ({
  info: { ...DEFAULT_INFO, phones: [...DEFAULT_INFO.phones] },
  slides: DEFAULT_SLIDES.map((s) => ({ ...s })),
});

type Persisted = { published: SiteData; draft: SiteData; dirty: boolean; audit: AuditEntry[] };

/* --------------------------- persistence --------------------------- */

const DB_NAME = "tilehaus-admin";
const STORE = "kv";
const KEY = "site-settings";
const PREVIEW_KEY = "vm-preview-draft";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(): Promise<Persisted | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve((req.result as Persisted) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(value: Persisted) {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* ------------------------------ store ------------------------------ */

let state: SettingsState = {
  published: defaultData(),
  draft: defaultData(),
  dirty: false,
  audit: [],
  previewDraft: false,
  loaded: false,
};
const serverState: SettingsState = { ...state };
const listeners = new Set<() => void>();
let hydrating = false;

const notify = () => listeners.forEach((l) => l());

function persist() {
  void idbSet({
    published: state.published,
    draft: state.draft,
    dirty: state.dirty,
    audit: state.audit,
  }).catch(() => undefined);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined" && !hydrating && !state.loaded) {
    hydrating = true;
    const preview = localStorage.getItem(PREVIEW_KEY) === "1";
    idbGet()
      .then((stored) => {
        state = {
          published: stored?.published ?? defaultData(),
          draft: stored?.draft ?? stored?.published ?? defaultData(),
          dirty: stored?.dirty ?? false,
          audit: stored?.audit ?? [],
          previewDraft: preview,
          loaded: true,
        };
        notify();
      })
      .catch(() => {
        state = { ...state, previewDraft: preview, loaded: true };
        notify();
      });
  }
  return () => listeners.delete(listener);
}

function set(next: Partial<SettingsState>, save = true) {
  state = { ...state, ...next, loaded: true };
  notify();
  if (save) persist();
}

/** Full admin view of the settings (published + draft + audit). */
export function useSiteSettings(): SettingsState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => serverState,
  );
}

/** What the public site should render — draft when preview mode is on. */
export function useLiveSite(): SiteData {
  const s = useSiteSettings();
  return s.previewDraft ? s.draft : s.published;
}

export const getSettings = () => state;

/* ------------------------------- API ------------------------------- */

const uid = () => Math.random().toString(36).slice(2, 10);

function log(who: string, area: AuditEntry["area"], action: string) {
  return [{ id: uid(), at: Date.now(), who: who || "admin", area, action }, ...state.audit].slice(
    0,
    200,
  );
}

export function updateDraftInfo(patch: Partial<SiteInfo>, who: string) {
  const changed = Object.keys(patch).join(", ");
  set({
    draft: { ...state.draft, info: { ...state.draft.info, ...patch } },
    dirty: true,
    audit: log(who, "Site info", `Updated ${changed || "site info"}`),
  });
}

export function setDraftSlides(slides: Slide[], who: string, action: string) {
  set({
    draft: { ...state.draft, slides },
    dirty: true,
    audit: log(who, "Carousel", action),
  });
}

export function addDraftSlide(slide: Omit<Slide, "id">, who: string) {
  setDraftSlides(
    [...state.draft.slides, { ...slide, id: uid() }],
    who,
    `Added slide "${slide.title || "untitled"}"`,
  );
}

export function updateDraftSlide(id: string, patch: Partial<Slide>, who: string) {
  const slide = state.draft.slides.find((s) => s.id === id);
  setDraftSlides(
    state.draft.slides.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    who,
    `Edited slide "${slide?.title ?? id}"`,
  );
}

export function removeDraftSlide(id: string, who: string) {
  const slide = state.draft.slides.find((s) => s.id === id);
  setDraftSlides(
    state.draft.slides.filter((s) => s.id !== id),
    who,
    `Removed slide "${slide?.title ?? id}"`,
  );
}

export function moveDraftSlide(id: string, dir: -1 | 1, who: string) {
  const list = [...state.draft.slides];
  const i = list.findIndex((s) => s.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  const a = list[i]!;
  const b = list[j]!;
  list[i] = b;
  list[j] = a;
  setDraftSlides(list, who, `Reordered slide "${a.title}"`);
}

export function publishDraft(who: string) {
  set({
    published: JSON.parse(JSON.stringify(state.draft)) as SiteData,
    dirty: false,
    audit: log(who, "Publishing", "Published draft changes to the live site"),
  });
}

export function discardDraft(who: string) {
  set({
    draft: JSON.parse(JSON.stringify(state.published)) as SiteData,
    dirty: false,
    audit: log(who, "Publishing", "Discarded unpublished draft changes"),
  });
}

export function resetSettings(who: string) {
  set({
    published: defaultData(),
    draft: defaultData(),
    dirty: false,
    audit: log(who, "Publishing", "Reset site info and carousel to defaults"),
  });
}

export function setPreviewDraft(on: boolean) {
  if (typeof window !== "undefined") {
    if (on) localStorage.setItem(PREVIEW_KEY, "1");
    else localStorage.removeItem(PREVIEW_KEY);
  }
  set({ previewDraft: on }, false);
}

/* ------------------- duplicate image protection -------------------- */

/** Carousel slides join the catalog-wide "no duplicate image" rule. */
registerImageScanner((image, exclude) => {
  for (const s of state.draft.slides) {
    if (s.id === exclude) continue;
    if (s.image === image) return `carousel slide "${s.title || s.id}"`;
  }
  return null;
});
