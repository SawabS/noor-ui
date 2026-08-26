import * as React from "react";
import { cn } from "../../utilities/cn";

export interface MarkerBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseTravellingMarkerResult {
  /** Attach to the element the marker is positioned inside. */
  trackRef: React.RefObject<HTMLDivElement>;
  /** Register each selectable item by key; pass `null` to unregister. */
  registerItem: (key: string, node: HTMLElement | null) => void;
  /** Measured box of the active item, or `null` before the first measurement. */
  box: MarkerBox | null;
  /**
   * False until a non-zero box has been measured. The marker must not be
   * shown before this: a group inside a hidden container measures as a zero
   * box, and arming there makes the marker animate in from the wrong place
   * once the container is revealed.
   */
  ready: boolean;
}

function readBox(node: HTMLElement): MarkerBox {
  // offsetLeft/offsetTop are physical and relative to the offset parent, which
  // is the track (it is `position: relative`). Physical is what we want: the
  // marker is placed with `translate()`, so the same numbers are correct in
  // both directions and no RTL branch is needed.
  return {
    x: node.offsetLeft,
    y: node.offsetTop,
    width: node.offsetWidth,
    height: node.offsetHeight,
  };
}

function boxesEqual(a: MarkerBox | null, b: MarkerBox | null): boolean {
  if (a === null || b === null) return a === b;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

/**
 * Measures the active item of a one-of-N group so a single shared indicator
 * can travel to it.
 *
 * Both axes are measured, not just X. One code path then covers horizontal
 * groups, vertical groups, and a horizontal group that wraps onto a second
 * row — all three were separate bugs when only `offsetLeft`/`offsetWidth`
 * were tracked.
 */
export function useTravellingMarker(activeKey: string): UseTravellingMarkerResult {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const items = React.useRef<Map<string, HTMLElement>>(new Map());
  const observer = React.useRef<ResizeObserver | null>(null);
  const [box, setBox] = React.useState<MarkerBox | null>(null);
  const [ready, setReady] = React.useState(false);

  // `measure` is read through a ref by the observer so the observer itself
  // never has to be torn down and rebuilt when the active item changes.
  const measureRef = React.useRef<() => void>(() => {});

  const registerItem = React.useCallback((key: string, node: HTMLElement | null) => {
    const previous = items.current.get(key);
    if (previous && previous !== node) observer.current?.unobserve(previous);
    if (node) {
      items.current.set(key, node);
      // Items are observed individually, not just the track: a label that
      // rewraps or changes width without changing the track's size still
      // moves the marker's target.
      observer.current?.observe(node);
    } else {
      items.current.delete(key);
    }
  }, []);

  const measure = React.useCallback(() => {
    const node = items.current.get(activeKey);
    if (!node) return;
    const next = readBox(node);
    setBox((prev) => (boxesEqual(prev, next) ? prev : next));
    // A zero box means the group is inside something hidden. Keep the marker
    // disarmed rather than parking it at the origin.
    if (next.width > 0 && next.height > 0) setReady(true);
  }, [activeKey]);

  measureRef.current = measure;

  // Layout effect, not effect: measuring before paint means the marker's very
  // first painted frame is already at the right place, so there is nothing for
  // the CSS transition to animate from on mount.
  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const instance = new ResizeObserver(() => measureRef.current());
    observer.current = instance;
    if (trackRef.current) instance.observe(trackRef.current);
    for (const node of items.current.values()) instance.observe(node);
    return () => {
      instance.disconnect();
      observer.current = null;
    };
  }, []);

  React.useEffect(() => {
    // Label widths only settle once the webfont lands; without this the marker
    // keeps the fallback-font width it was measured at.
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure]);

  return { trackRef, registerItem, box, ready };
}

export interface TravellingMarkerProps {
  box: MarkerBox | null;
  ready: boolean;
  className?: string;
}

/**
 * The marker itself. Purely decorative — `aria-checked` on the items is what
 * announces the selection, so this is hidden from the accessibility tree.
 */
export function TravellingMarker({ box, ready, className }: TravellingMarkerProps) {
  return (
    <span
      aria-hidden="true"
      data-ready={ready ? "true" : "false"}
      className={cn("n-marker", className)}
      style={
        box
          ? {
              width: box.width,
              height: box.height,
              transform: `translate(${box.x}px, ${box.y}px)`,
            }
          : undefined
      }
    />
  );
}
