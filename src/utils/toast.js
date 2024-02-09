import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function addToast({ type, text }) {
  toastEventManager.emit('addtoast', { type, text });
}
