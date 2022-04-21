import { useCallback, useEffect } from "react";

export const useKeyboard = (
  key: string,
  options?: {
    onKeyDown?: (e: KeyboardEvent) => void;
    onKeyUp?: (e: KeyboardEvent) => void;
    onKeyPress?: (e: KeyboardEvent) => void;
    shiftKey?: boolean;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
  }
) => {
  const { shiftKey, altKey, ctrlKey, metaKey, onKeyDown, onKeyPress, onKeyUp } =
    options || {};

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key) {
        if (shiftKey && !e.shiftKey) return;
        if (altKey && !e.altKey) return;
        if (ctrlKey && !e.ctrlKey) return;
        if (metaKey && !e.metaKey) return;
        onKeyPress && onKeyPress(e);
      }
    },
    [shiftKey, altKey, ctrlKey, metaKey, key, onKeyPress]
  );
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key) {
        if (shiftKey && !e.shiftKey) return;
        if (altKey && !e.altKey) return;
        if (ctrlKey && !e.ctrlKey) return;
        if (metaKey && !e.metaKey) return;
        onKeyDown && onKeyDown(e);
      }
    },
    [shiftKey, altKey, ctrlKey, metaKey, key, onKeyDown]
  );
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key) {
        if (shiftKey && !e.shiftKey) return;
        if (altKey && !e.altKey) return;
        if (ctrlKey && !e.ctrlKey) return;
        if (metaKey && !e.metaKey) return;
        onKeyUp && onKeyUp(e);
      }
    },
    [shiftKey, altKey, ctrlKey, metaKey, key, onKeyUp]
  );

  useEffect(() => {
    if (onKeyPress) {
      document.addEventListener("keypress", handleKeyPress);
    }
    if (onKeyDown) {
      document.addEventListener("keydown", handleKeyDown);
    }
    if (onKeyUp) {
      document.addEventListener("keyup", handleKeyUp);
    }
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    handleKeyPress,
    handleKeyDown,
    handleKeyUp,
    onKeyPress,
    onKeyDown,
    onKeyUp,
  ]);
};

export default useKeyboard;
