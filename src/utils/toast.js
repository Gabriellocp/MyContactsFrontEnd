export default function addToast({ type, text }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      text, type,
    },
  });
  document.dispatchEvent(event);
}
