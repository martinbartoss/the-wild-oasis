import { useEffect, useRef } from "react";

export default function useCloseOnClickOutside(
  handler,
  listenCapturing = true
) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // the true will set the listener only on capturing phase, not bubbling phase :D
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
