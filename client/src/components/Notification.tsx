interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export function Notification({ message, type = "info", onClose }: NotificationProps) {
  const color =
    type === "success"
      ? "bg-green-100 text-green-700"
      : type === "error"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700";
  return (
    <div className={`p-3 rounded shadow ${color} flex items-center justify-between`}>
      <span>{message}</span>
      {onClose && (
        <button className="ml-4 text-sm text-gray-500 hover:underline" onClick={onClose}>
          Close
        </button>
      )}
    </div>
  );
}
