export type MockLoadState = "loading" | "ready" | "error";

type Listener = () => void;

type Store = {
  state: MockLoadState;
  listeners: Set<Listener>;
  timer?: NodeJS.Timeout;
};

const stores = new Map<string, Store>();

function ensureStore(key: string) {
  if (!stores.has(key)) {
    stores.set(key, { state: "loading", listeners: new Set() });
  }
  return stores.get(key)!;
}

export function initMockLoad(key: string, delayMs = 700, shouldError = false) {
  const store = ensureStore(key);
  if (store.timer) return;
  store.state = "loading";
  store.timer = setTimeout(() => {
    store.state = shouldError ? "error" : "ready";
    store.timer = undefined;
    store.listeners.forEach((listener) => listener());
  }, delayMs);
}

export function resetMockLoad(key: string, delayMs = 700, shouldError = false) {
  const store = ensureStore(key);
  if (store.timer) {
    clearTimeout(store.timer);
  }
  store.state = "loading";
  store.listeners.forEach((listener) => listener());
  store.timer = setTimeout(() => {
    store.state = shouldError ? "error" : "ready";
    store.timer = undefined;
    store.listeners.forEach((listener) => listener());
  }, delayMs);
}

export function getMockLoadState(key: string) {
  return ensureStore(key).state;
}

export function subscribeMockLoad(key: string, listener: Listener) {
  const store = ensureStore(key);
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}
