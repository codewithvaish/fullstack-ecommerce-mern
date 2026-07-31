import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

function Toast() {
  const { toast, clearToast } = useApp();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`flex items-center gap-3 rounded-xl px-5 py-4 shadow-xl text-white transition-all duration-300
        ${
          toast.type === "error"
            ? "bg-red-500"
            : "bg-green-600"
        }`}
      >
        {toast.type === "error" ? (
          <XCircle size={22} />
        ) : (
          <CheckCircle size={22} />
        )}

        <span className="font-medium">
          {toast.message}
        </span>
      </div>
    </div>
  );
}

export default Toast;