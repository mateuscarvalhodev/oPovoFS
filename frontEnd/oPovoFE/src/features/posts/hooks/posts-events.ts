const POSTS_CHANGED_EVENT = "opovo:posts-changed";

export function notifyPostsChanged() {
  window.dispatchEvent(new Event(POSTS_CHANGED_EVENT));
}

export function onPostsChanged(listener: () => void) {
  window.addEventListener(POSTS_CHANGED_EVENT, listener);
  return () => window.removeEventListener(POSTS_CHANGED_EVENT, listener);
}
