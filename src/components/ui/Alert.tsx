/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { JSX } from "react/jsx-runtime";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
  duration?: number; // Auto close after X ms
};

const Alert: React.FC<AlertProps> = ({ message, type = "info", onClose, duration = 10000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const alertStyles: Record<string, string> = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  const icons: Record<string, JSX.Element> = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  return (
    <div className={`flex items-center border-l-4 p-4 rounded shadow-md ${alertStyles[type]} relative`}>
      {icons[type]}
      <span className="ml-3">{message}</span>
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
