export default function ReadOnlyNumber({ label, value }) {
    return (
        <div className="mx-auto max-w-xs">
            <label className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>

            <div className="flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-center text-sm text-gray-900 shadow-inner dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                {value}
            </div>
        </div>
    );
}
