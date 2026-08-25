import { useLayoutEffect, type RefObject } from "react";

/** Grows a textarea to fit its content, up to maxHeightPx. Used by PromptComposer. */
export function useAutosizeTextarea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  maxHeightPx?: number,
) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    const tokenMaxHeight = Number.parseFloat(window.getComputedStyle(node).maxHeight);
    const resolvedMaxHeight =
      maxHeightPx ?? (Number.isFinite(tokenMaxHeight) ? tokenMaxHeight : 240);
    const next = Math.min(node.scrollHeight, resolvedMaxHeight);
    node.style.height = `${next}px`;
    node.style.overflowY = node.scrollHeight > resolvedMaxHeight ? "auto" : "hidden";
  }, [ref, value, maxHeightPx]);
}
