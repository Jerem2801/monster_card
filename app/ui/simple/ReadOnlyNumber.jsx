export default function ReadOnlyNumber({ label, value }) {
  return (
    <div className="max-w-xs mx-auto">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
      >
        {label}
      </label>

      <div
        className="h-11 bg-gray-50 border border-gray-300 rounded-lg text-center flex items-center justify-center text-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {value}
      </div>
    </div>
  );
}
