export default function SimpleInputNumber({ label, min, max, value, onChange }) {
    const increment = () => {
        if (typeof max === 'number' && Number(value) >= max) return;
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
            <div className="relative flex max-w-[8rem] items-center rounded-xl shadow-md">
                <button
                    type="button"
                    onClick={decrement}
                    disabled={Number(value) <= min}
                    className={`h-11 cursor-pointer rounded-s-lg border border-gray-300 bg-gray-100 p-3 transition-transform hover:bg-gray-200 focus:outline-none active:scale-95 ${Number(value) <= min ? 'cursor-not-allowed opacity-50' : ''}`}
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
                    max={max}
                    value={value}
                    onChange={onChange}
                    className="block h-11 w-full border border-gray-200 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                />

                <button
                    type="button"
                    onClick={increment}
                    disabled={typeof max === 'number' && Number(value) >= max}
                    className={`h-11 cursor-pointer rounded-e-lg border border-gray-300 bg-gray-100 p-3 transition-transform hover:bg-gray-200 focus:outline-none active:scale-95 ${typeof max === 'number' && Number(value) >= max ? 'cursor-not-allowed opacity-50' : ''}`}
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
