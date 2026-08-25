import * as React from "react";
import { ArrowUp, Paperclip, Square, Globe } from "lucide-react";
import { cn } from "../../utilities/cn";
import { useAutosizeTextarea } from "../../hooks/use-autosize-textarea";
import { IconButton } from "../inputs/IconButton";
import { Icon } from "../primitives/Icon";
import { ComposerToolbar } from "./ComposerToolbar";

export interface PromptComposerProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Submitting the current turn — disables input, shows a spinner on submit. */
  loading?: boolean;
  /** Assistant is streaming a response — submit button becomes a Stop button. */
  streaming?: boolean;
  onStop?: () => void;
  /** Rendered above the textarea, typically a row of AttachmentChip. */
  attachments?: React.ReactNode;
  onAttachClick?: () => void;
  attachDisabled?: boolean;
  researchMode?: boolean;
  onResearchModeChange?: (value: boolean) => void;
  /** Slot for ModelSelector. */
  modelSelector?: React.ReactNode;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * The primary input surface for an AI conversation. Auto-grows with content,
 * submits on Enter (Shift+Enter for a newline — the composer never submits
 * mid-IME-composition, which matters for CJK/Arabic input methods), and
 * exposes disabled/loading/streaming states as the three distinct phases a
 * turn can be in.
 */
export function PromptComposer({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Message...",
  disabled = false,
  loading = false,
  streaming = false,
  onStop,
  attachments,
  onAttachClick,
  attachDisabled = false,
  researchMode = false,
  onResearchModeChange,
  modelSelector,
  maxLength,
  autoFocus,
  className,
  "aria-label": ariaLabel = "Message",
}: PromptComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const isComposing = React.useRef(false);
  useAutosizeTextarea(textareaRef, value);

  const canSubmit = value.trim().length > 0 && !disabled && !loading && !streaming;
  const isBusy = loading || streaming;
  const state = streaming ? "streaming" : loading ? "loading" : "idle";

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing.current) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      data-state={state}
      aria-busy={isBusy || undefined}
      className={cn(
        "n-surface-auto n-focus-glow flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 shadow-xs",
        "focus-within:border-border-strong focus-within:shadow-sm",
        "transition-[box-shadow,border-color] duration-fast ease-standard",
        disabled && "opacity-disabled",
        className,
      )}
    >
      {attachments ? <div className="flex flex-wrap gap-2">{attachments}</div> : null}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        placeholder={placeholder}
        disabled={disabled || loading}
        autoFocus={autoFocus}
        maxLength={maxLength}
        rows={1}
        aria-label={ariaLabel}
        className={cn(
          "max-h-composer w-full resize-none bg-transparent text-body text-text-primary placeholder:text-text-muted",
          "focus:outline-none disabled:cursor-not-allowed",
        )}
      />

      <ComposerToolbar
        leading={
          <>
            {onAttachClick ? (
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Attach files"
                onClick={onAttachClick}
                disabled={disabled || attachDisabled}
              >
                <Icon icon={Paperclip} size="sm" />
              </IconButton>
            ) : null}
            {onResearchModeChange ? (
              <button
                type="button"
                onClick={() => onResearchModeChange(!researchMode)}
                aria-pressed={researchMode}
                disabled={disabled}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-md px-2.5 text-caption font-medium transition-colors duration-fast ease-standard",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  researchMode
                    ? "bg-surface-active text-text-primary"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                )}
              >
                <Icon icon={Globe} size="xs" />
                Research
              </button>
            ) : null}
          </>
        }
        trailing={
          <>
            {modelSelector}
            {isBusy && onStop ? (
              <IconButton
                type="button"
                variant="primary"
                size="sm"
                aria-label="Stop generating"
                onClick={onStop}
              >
                <Icon icon={Square} size="xs" className="fill-current" />
              </IconButton>
            ) : (
              <IconButton
                type="button"
                variant="primary"
                size="sm"
                aria-label="Send message"
                onClick={handleSubmit}
                disabled={!canSubmit}
                loading={loading && !streaming}
              >
                <Icon icon={ArrowUp} size="sm" />
              </IconButton>
            )}
          </>
        }
      />
    </div>
  );
}
