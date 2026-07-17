import { useLayoutEffect, type RefObject } from "react";

/** Grows a textarea to fit its content, up to maxHeightPx. Used by PromptComposer. */
export function useAutosizeTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  maxHeightPx = 240,
) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    const next = Math.min(node.scrollHeight, maxHeightPx);
    node.style.height = `${next}px`;
    node.style.overflowY = node.scrollHeight > maxHeightPx ? "auto" : "hidden";
  }, [ref, value, maxHeightPx]);
}
