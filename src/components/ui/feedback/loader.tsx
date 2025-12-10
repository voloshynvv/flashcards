import { cn } from "@/utils/cn";
import { Loader2Icon } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
  return <Loader2Icon className={cn("size-4 animate-spin", className)} />;
};
