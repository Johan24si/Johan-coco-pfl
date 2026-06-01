export default function TextArea({ label, placeholder, rows = 4, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y bg-white text-sm"
        {...props}
      ></textarea>
    </div>
  );
}
