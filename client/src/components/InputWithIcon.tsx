import { Input } from "@/components/ui/input";
import type { InputWithIconProps } from "@/types/InputWithIconProps";

export function InputWithIcon({
  icon,
  label,
  error,
  className = "",
  ...props
}: InputWithIconProps) {
  const inputClassName = ["pl-10", className].filter(Boolean).join(" ");
  return (
    <div className={"mb-2 " + className}>
      {label && props.id && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Input {...props} className={inputClassName} />
        <span className="absolute left-2 top-2.5">{icon}</span>
      </div>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}
