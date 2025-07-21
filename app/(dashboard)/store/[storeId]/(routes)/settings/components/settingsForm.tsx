import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/Typography/heading2";
import { TypographyP } from "@/components/ui/Typography/paragraph";
import { Trash } from "lucide-react";

export default function SettingsForm() {
  return (
    <div>
      <div className="flex-between mb-2">
        <div>
          <TypographyH2 className="font-semibold">Settings</TypographyH2>
          <TypographyP className="text-muted-foreground">
            Manage Store Preferences
          </TypographyP>
        </div>

        <Button variant={"destructive"}>
          <Trash />
        </Button>
      </div>
      <Separator />
    </div>
  );
}
