import * as React from "react";
import { Lightbulb, Code2, FileText, Compass } from "lucide-react";
import { ChatLayout } from "../components/ai/ChatLayout";
import { WelcomeScreen } from "../components/ai/WelcomeScreen";
import { PromptComposer } from "../components/ai/PromptComposer";
import { ModelSelector } from "../components/ai/ModelSelector";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { UserMenu } from "../components/navigation/UserMenu";
import { ThemeToggle } from "../components/primitives/ThemeToggle";
import {
  DesktopConversationSidebar,
  MobileConversationDrawer,
} from "./ResponsiveConversationSidebar";

const welcomeConversationGroups = [
  { label: "Today", items: [{ id: "1", title: "Comparing hosting providers" }] },
  {
    label: "Previous 7 days",
    items: [
      { id: "2", title: "Draft a project brief" },
      { id: "3", title: "Kurdish greeting phrases" },
    ],
  },
];

/** Screen 1: empty AI chat welcome screen. */
export function WelcomeScreenExample() {
  const [value, setValue] = React.useState("");
  const [model, setModel] = React.useState("balanced");
  const [researchMode, setResearchMode] = React.useState(false);

  return (
    <ChatLayout
      sidebar={
        <DesktopConversationSidebar
          groups={welcomeConversationGroups}
          onNewConversation={() => {}}
        />
      }
      topNavigation={
        <TopNavigation
          start={
            <MobileConversationDrawer
              groups={welcomeConversationGroups}
              onNewConversation={() => {}}
            />
          }
          end={
            <>
              <ThemeToggle />
              <UserMenu name="Sawab S." email="sawab@example.com" />
            </>
          }
        />
      }
      composer={null}
    >
      <WelcomeScreen
        greeting="What can I help with?"
        description="Ask a question, paste some code, or start from a suggestion below."
        composer={
          <PromptComposer
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue("")}
            onAttachClick={() => {}}
            researchMode={researchMode}
            onResearchModeChange={setResearchMode}
            modelSelector={
              <ModelSelector
                models={[
                  { value: "fast", label: "Fast" },
                  { value: "balanced", label: "Balanced" },
                  { value: "reasoning", label: "Reasoning" },
                ]}
                value={model}
                onValueChange={setModel}
              />
            }
          />
        }
        suggestedPrompts={[
          {
            icon: Lightbulb,
            label: "Explain a concept",
            description: "Break down a hard idea simply",
          },
          { icon: Code2, label: "Debug this code", description: "Paste an error and get help" },
          {
            icon: FileText,
            label: "Summarize a document",
            description: "Upload a file to get started",
          },
          { icon: Compass, label: "Plan a trip", description: "Get a day-by-day itinerary" },
        ]}
      />
    </ChatLayout>
  );
}
