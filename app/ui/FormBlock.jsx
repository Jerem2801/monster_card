export default function FormBlock({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
  staticContent,
  grow = false,
}) {
  const wrapperClass = grow ? "flex-grow min-w-[200px]" : "w-36";

  return (
    <div
      className={`${wrapperClass} bg-gray-100 rounded-2xl hover:bg-gray-200 shadow-md p-4`}
    >
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>

      {type === "static" ? (
        <div className="w-full text-center font-semibold">
          {staticContent}
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          min={min}
          className={`w-full ${
            type === "number" ? "text-center" : ""
          } bg-transparent focus:outline-none`}
          onChange={onChange}
        />
      )}
    </div>
  );
}
