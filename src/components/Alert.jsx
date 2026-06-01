export default function Alert({ children, type = "info", className = "", ...props }) {
  const types = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    danger: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div className={`px-4 py-3 rounded-lg border text-sm font-medium ${types[type] || types.info} ${className}`} role="alert" {...props}>
      {children}
    </div>
  );
}
