import { Label } from "./label";

interface FormFieldProps {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  errorText?: React.ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  errorText,
  children,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>

      {children}

      {errorText && <p>{errorText}</p>}
    </div>
  );
};
