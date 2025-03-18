import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Synced" | "Syncing..." | string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let color;
  
  switch (status) {
    case "In Stock":
    case "Synced":
      color = "bg-green-100 text-green-800";
      break;
    case "Low Stock":
    case "Syncing...":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "Out of Stock":
      color = "bg-red-100 text-red-800";
      break;
    default:
      color = "bg-gray-100 text-gray-800";
  }
  
  return (
    <Badge variant="outline" className={cn("px-2 py-1 font-semibold rounded-full text-xs", color, className)}>
      {status}
    </Badge>
  );
}

export default StatusBadge;
