import toast, { Toaster } from "react-hot-toast";
import { XIcon } from "lucide-react";

export const createToast = (message: React.ReactNode) => {
  toast(
    (t) => (
      <div className="flex items-center justify-between gap-4">
        <span className="opacity-50"></span>
        <div>{message}</div>

        <button className="shrink-0" onClick={() => toast.dismiss(t.id)}>
          <XIcon />
          <div className="sr-only">dismiss</div>
        </button>
      </div>
    ),
    {
      className: "opacity-50",
      style: {
        background: "var(--color-neutral-50",
        boxShadow: "none",
        border: "1px solid var(--color-border)",
        borderRadius: "9999px",
      },
    },
  );
};

export const ToasterProvider = () => {
  return (
    <Toaster
      containerStyle={{
        bottom: 40,
      }}
      position="bottom-right"
    />
  );
};
