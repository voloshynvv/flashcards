import { AlertCircleIcon } from "lucide-react";
import { Label } from "./label";

interface FormFieldProps {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  invalid?: boolean;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  children,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>

      <div>{children}</div>

      {error && (
        <p
          className="flex items-center gap-2 text-sm font-normal text-pink-700"
          role="alert"
        >
          <AlertCircleIcon className="size-4" />
          {error}
        </p>
      )}
    </div>
  );
};
