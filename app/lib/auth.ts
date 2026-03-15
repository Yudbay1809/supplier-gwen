export const AUTH_KEY = "psg_auth";
export const AUTH_USER_EMAIL = "psg_auth_email";
export const AUTH_EVENT = "psg_auth_change";

export function isAuthed() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function getUserEmail() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem(AUTH_USER_EMAIL) || "";
}

export function login(email?: string) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(AUTH_KEY, "1");
  if (email) {
    window.localStorage.setItem(AUTH_USER_EMAIL, email);
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(AUTH_KEY);
  window.localStorage.removeItem(AUTH_USER_EMAIL);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
