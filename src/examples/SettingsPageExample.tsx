import * as React from "react";
import { TopNavigation } from "../components/navigation/TopNavigation";
import { UserMenu } from "../components/navigation/UserMenu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/data-display/Card";
import { FormField } from "../components/inputs/FormField";
import { Select } from "../components/inputs/Select";
import { Switch } from "../components/inputs/Switch";
import { SegmentedControl } from "../components/inputs/SegmentedControl";
import { Separator } from "../components/primitives/Separator";
import { Typography } from "../components/primitives/Typography";
import { useTheme } from "../providers/theme-provider";
import { useDirection } from "../providers/direction-provider";

/** Screen 4: settings — theme and language controls, driving the real providers. */
export function SettingsPageExample() {
  const { theme, setTheme } = useTheme();
  const { direction, setDirection } = useDirection();
  const [language, setLanguage] = React.useState("en");
  const [streaming, setStreaming] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(false);

  return (
    <div className="flex h-full flex-col bg-canvas">
      <TopNavigation
        start={<Typography variant="heading-sm">Settings</Typography>}
        end={<UserMenu name="Sawab S." compact />}
      />
      <div className="mx-auto w-full max-w-content-sm flex-1 overflow-y-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Choose how Noor looks on this device.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField label="Theme">
                <SegmentedControl
                  aria-label="Theme"
                  value={theme}
                  onValueChange={(v) => setTheme(v as typeof theme)}
                  options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "system", label: "System" },
                  ]}
                />
              </FormField>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Typography variant="body-sm" weight="medium">
                    Stream responses
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Show assistant replies as they&apos;re generated.
                  </Typography>
                </div>
                <Switch
                  checked={streaming}
                  onCheckedChange={setStreaming}
                  aria-label="Stream responses"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Typography variant="body-sm" weight="medium">
                    Sound effects
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Play a sound when a response finishes.
                  </Typography>
                </div>
                <Switch
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                  aria-label="Sound effects"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language &amp; region</CardTitle>
              <CardDescription>Sets the interface language and text direction.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                label="Interface language"
                helperText="Kurdish and Arabic switch the layout to right-to-left automatically."
              >
                <Select
                  options={[
                    { value: "en", label: "English" },
                    { value: "ar", label: "العربية (Arabic)" },
                    { value: "ckb", label: "کوردیی ناوەندی (Kurdish, Sorani)" },
                  ]}
                  value={language}
                  onValueChange={(v) => {
                    setLanguage(v);
                    setDirection(v === "ar" || v === "ckb" ? "rtl" : "ltr");
                  }}
                />
              </FormField>
              <FormField label="Text direction">
                <SegmentedControl
                  aria-label="Text direction"
                  value={direction}
                  onValueChange={(v) => setDirection(v as typeof direction)}
                  options={[
                    { value: "ltr", label: "LTR" },
                    { value: "rtl", label: "RTL" },
                  ]}
                />
              </FormField>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
