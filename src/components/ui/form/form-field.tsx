import { AlertCircleIcon } from "lucide-react";

import { Label } from "./label";

type Error = string;

interface FormFieldProps {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  error?: Error;
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

      {error && <FormFieldError error={error} />}
    </div>
  );
};

interface FormFieldErrorProps {
  error?: Error;
}

const FormFieldError = ({ error }: FormFieldErrorProps) => {
  return (
    <p
      className="flex items-center gap-2 text-sm font-normal text-pink-700"
      role="alert"
    >
      <AlertCircleIcon className="size-4" />
      {error}
    </p>
  );
};
