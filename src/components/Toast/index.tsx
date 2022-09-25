import { FC } from "react";
import {
  FaBug,
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfo,
} from "react-icons/fa";
import { toast } from "react-toastify";

export const displayIcon = (type: string) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

interface ToastMessageProps {
  message: string;
  type: string;
  dismiss: any;
}

const ToastMessage: FC<ToastMessageProps> = ({
  type,
  message,
}: ToastMessageProps) =>
  ((toast as any)[type] as any)(
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

// @ts-ignore
ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
