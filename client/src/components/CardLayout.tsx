import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CardLayoutProps } from "@/types/CardLayoutProps";

export function CardLayout({
  title,
  children,
  headerClassName = "",
  contentClassName = "",
  cardClassName = "",
}: CardLayoutProps) {
  return (
    <Card className={cardClassName}>
      {title && (
        <CardHeader className={headerClassName}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
