export default function ReadOnlyNumber({ label, value, format, ...props }) {
    // Formatage optionnel du nombre
    const displayValue = typeof format === 'function' ? format(value) : value;
    return (
        <div className="mx-auto max-w-xs">
            <label className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <div
                tabIndex={0}
                {...props}
                className="flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-center text-lg font-bold text-gray-900 shadow-inner transition-all duration-150 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
                {displayValue}
            </div>
        </div>
    );
}
