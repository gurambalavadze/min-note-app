import type React from "react";

export interface InputWithIconProps extends React.ComponentProps<"input"> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  type?: string;
  placeholder?: string;
}
