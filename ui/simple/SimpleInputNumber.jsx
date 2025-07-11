export default function SimpleInputNumber({ label, min, value, onChange }) {
    const increment = () => {
        onChange({ target: { value: Number(value) + 1 } });
    };

    const decrement = () => {
        const newValue = Math.max(min, Number(value) - 1);
        onChange({ target: { value: newValue } });
    };

    return (
        <div className="mx-auto max-w-xs">
            <label
                htmlFor="quantity-input"
                className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div className="relative flex max-w-[8rem] items-center">
                <button
                    type="button"
                    onClick={decrement}
                    className="h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                    <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                        />
                    </svg>
                </button>

                <input
                    type="text"
                    id="quantity-input"
                    readOnly
                    min={min}
                    value={value}
                    onChange={onChange}
                    className="block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />

                <button
                    type="button"
                    onClick={increment}
                    className="h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                    <svg
                        className="h-3 w-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
