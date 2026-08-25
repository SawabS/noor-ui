import * as React from "react";
import { cn } from "../../utilities/cn";
import { Typography } from "../primitives/Typography";
import { SuggestedPrompt, type SuggestedPromptProps } from "./SuggestedPrompt";

export interface WelcomeScreenProps {
  greeting: React.ReactNode;
  description?: React.ReactNode;
  /** Rendered above the suggested prompts, typically the PromptComposer. */
  composer?: React.ReactNode;
  suggestedPrompts?: Array<Omit<SuggestedPromptProps, "className">>;
  className?: string;
}

/** The empty-state landing screen for a new conversation: greeting, an
 *  inline composer, and a grid of starter prompts. Centered, generous
 *  negative space, no chrome. */
export function WelcomeScreen({
  greeting,
  description,
  composer,
  suggestedPrompts,
  className,
}: WelcomeScreenProps) {
  return (
    <div
      className={cn(
        "n-atmosphere mx-auto flex w-full max-w-content-md flex-1 flex-col justify-center px-4 py-12",
        className,
      )}
    >
      <div className="relative mb-8 text-center">
        <Typography variant="heading-lg" as="h1">
          {greeting}
        </Typography>
        {description && (
          <Typography variant="body" color="secondary" className="mt-2">
            {description}
          </Typography>
        )}
      </div>

      {composer && <div className="relative mb-6">{composer}</div>}

      {suggestedPrompts && suggestedPrompts.length > 0 && (
        <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
          {suggestedPrompts.map((prompt, i) => (
            <SuggestedPrompt key={i} {...prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
