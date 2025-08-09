import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, currencyFormat } from "@/lib/utils";
import { ReactNode } from "react";

export default function StatCard({
  title,
  icon,
  data,
  dataIcon,
  dataType,
  className,
}: {
  title: string;
  icon: ReactNode;
  data: number;
  dataIcon?: ReactNode;
  dataType: "currency" | "number";
  className?: string;
}) {
  return (
    <Card className={cn(className, "gap-4 rounded-md lg:min-w-75")}>
      <CardHeader className="flex-between">
        <CardTitle>{title}</CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="align-center gap-1">
        {dataIcon}{" "}
        <p className="text-xl font-semibold">
          {dataType === "currency" ? currencyFormat.format(data) : data}
        </p>
      </CardContent>
    </Card>
  );
}
