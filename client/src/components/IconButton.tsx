import { Button } from "@/components/ui/button";

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ icon, children, className = "", ...props }: IconButtonProps) {
  return (
    <Button {...props} className={`flex items-center gap-1 cursor-pointer ${className}`.trim()}>
      {icon}
      {children}
    </Button>
  );
}
