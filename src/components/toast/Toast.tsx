import { toast } from "react-toastify";

export const showToast = (
  type: "success" | "error",
  title: string,
  message?: string
) => {
  const toastContent = (
    <div className={`toast-container`}>
      <div className="toast-title">{title}</div>
      {message && <div className="toast-message">{message}</div>}
    </div>
  );

  if (type === "error") {
    toast.error(toastContent, {
      position: "top-right",
      autoClose: 5000,
    });
  } else {
    toast.success(toastContent, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};
