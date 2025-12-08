interface AlertProps {
  message: string;
}

export const Alert = ({ message }: AlertProps) => {
  return (
    <div className="shadow-border-sm flex items-center justify-between rounded-2xl border border-blue-200 bg-neutral-50 px-6 py-4">
      <p className="text-sm sm:text-base">{message}</p>
    </div>
  );
};
