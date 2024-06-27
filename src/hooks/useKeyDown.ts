import { useEffect, useCallback } from "react";
export const useKeyDown = (callback: () => void, keys: string[]) => {
  const onKeyDown = useCallback(
    (event: Event) => {
      // @ts-ignore
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [keys, callback]
  );
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};
