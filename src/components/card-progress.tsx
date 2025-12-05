import { Brain } from "lucide-react";
import { Progress } from "./ui/progress";
import { Tag } from "./ui/tag";

const MAX_ALLOWED_PROGRESS = 5;

interface CardProgressProps {
  value?: number;
}

export const CardProgress = ({ value = 0 }: CardProgressProps) => {
  if (value === MAX_ALLOWED_PROGRESS) {
    return (
      <Tag className="bg-teal-400">
        <Brain className="size-4" />
        Mastered {value}/{MAX_ALLOWED_PROGRESS}
      </Tag>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Progress className="w-15" value={value} max={MAX_ALLOWED_PROGRESS} />
      <p className="text-xs">
        {value}/{MAX_ALLOWED_PROGRESS}
      </p>
    </div>
  );
};
