import * as React from "react";
import { Menu, PanelRight, Sparkles, Code2, PenLine } from "lucide-react";
import { ChatLayout } from "../components/ai/ChatLayout";
import { ConversationSidebar } from "../components/ai/ConversationSidebar";
import { ArtifactPanel } from "../components/ai/ArtifactPanel";
import { PromptComposer } from "../components/ai/PromptComposer";
import { WelcomeScreen } from "../components/ai/WelcomeScreen";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { Drawer } from "../components/overlays/Drawer";
import { IconButton } from "../components/inputs/IconButton";
import { Typography } from "../components/primitives/Typography";
import { CodeBlock } from "../components/data-display/CodeBlock";

const groups = [
  {
    label: "Today",
    items: [
      { id: "lumen", title: "Noor Lumen workspace" },
      { id: "rtl", title: "RTL interface review" },
    ],
  },
];

function SidebarContent() {
  return (
    <ConversationSidebar
      groups={groups}
      activeId="lumen"
      header={<Typography variant="label">Noor</Typography>}
      onNewConversation={() => {}}
    />
  );
}

function ArtifactContent({ onClose }: { onClose?: () => void }) {
  return (
    <ArtifactPanel title="Token preview" subtitle="appearance.css" onClose={onClose}>
      <div className="p-4">
        <CodeBlock
          language="css"
          code={`[data-noor-appearance="lumen"] {\n  --n-accent-focal: #70aeff;\n  --n-material-blur: 20px;\n}`}
          showLineNumbers
        />
      </div>
    </ArtifactPanel>
  );
}

/** Reference composition demonstrating responsive shell state outside ChatLayout. */
export function LumenWorkspaceExample() {
  const [value, setValue] = React.useState("");

  return (
    <div className="h-[720px] overflow-hidden rounded-lg border border-border">
      <ChatLayout
        className="h-full"
        sidebar={
          <div className="hidden md:block">
            <SidebarContent />
          </div>
        }
        topNavigation={
          <TopNavigation
            start={
              <>
                <div className="md:hidden">
                  <Drawer
                    side="start"
                    title="Conversations"
                    trigger={
                      <IconButton aria-label="Open conversations" size="sm">
                        <Menu className="size-4" aria-hidden="true" />
                      </IconButton>
                    }
                    className="p-0"
                  >
                    <SidebarContent />
                  </Drawer>
                </div>
                <Typography variant="label">New conversation</Typography>
              </>
            }
            end={
              <div className="lg:hidden">
                <Drawer
                  side="end"
                  title="Token preview"
                  trigger={
                    <IconButton aria-label="Open artifact" size="sm">
                      <PanelRight className="size-4" aria-hidden="true" />
                    </IconButton>
                  }
                  className="p-0"
                >
                  <ArtifactContent />
                </Drawer>
              </div>
            }
          />
        }
        composer={
          <PromptComposer
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue("")}
            onAttachClick={() => {}}
          />
        }
        artifactPanel={
          <div className="hidden lg:block">
            <ArtifactContent />
          </div>
        }
      >
        <WelcomeScreen
          greeting="What will you illuminate?"
          description="A calm, multilingual workspace for focused AI work."
          suggestedPrompts={[
            { icon: Sparkles, label: "Synthesize research", onClick: () => {} },
            { icon: Code2, label: "Build an interface", onClick: () => {} },
            { icon: PenLine, label: "Draft a proposal", onClick: () => {} },
          ]}
        />
      </ChatLayout>
    </div>
  );
}
