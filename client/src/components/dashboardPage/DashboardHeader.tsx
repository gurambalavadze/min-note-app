import { IconButton } from "@/components/IconButton";
import { FileEdit, LogOut, Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewNote: () => void;
  onLogout: () => void;
  searchTags: string[];
  onSearchTagsChange: (tags: string[]) => void;
}

export function DashboardHeader({ onNewNote, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <FileEdit className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold">Dashboard</span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <IconButton onClick={onNewNote} icon={<Plus className="h-5 w-5" />}>
          New Note
        </IconButton>
        <IconButton
          variant="outline"
          onClick={onLogout}
          icon={<LogOut className="h-5 w-5 text-black" />}
        >
          Logout
        </IconButton>
      </div>
    </div>
  );
}
