interface NotificationBarProps {
  notif: { type: "success" | "error"; message: string } | null;
}

export function NotificationBar({ notif }: NotificationBarProps) {
  if (!notif) return null;
  return (
    <div
      className={`mb-2 rounded border p-3 ${notif.type === "error" ? "border-red-500 bg-red-50 text-red-700" : "border-green-500 bg-green-50 text-green-700"}`}
    >
      <strong>{notif.type === "error" ? "Error" : "Success"}:</strong> {notif.message}
    </div>
  );
}
