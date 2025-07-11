export default function SimpleInputText({
    label,
    value,
    onChange,
    placeholder = '',
    required = false,
    ...props
}) {
    return (
        <div className="max-w-[700] flex-grow">
            <label
                htmlFor="default-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                type="text"
                id="default-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                {...props}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-md transition-all duration-150 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
