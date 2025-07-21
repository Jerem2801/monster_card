import Image from 'next/image';

export default function AdvantageInputNumber({ min, max, value, onChange }) {
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
            <div className="relative max-w-[9rem] flex items-center rounded-xl shadow-md">
                <button
                    type="button"
                    onClick={decrement}
                    disabled={Number(value) <= min}
                    className={`h-11 cursor-pointer rounded-s-md border border-gray-300 bg-gray-100 p-2 transition-transform hover:bg-gray-200 focus:outline-none active:scale-95 ${Number(value) <= min ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <Image src="/dice/disadvantage.png" alt="advantage" width={80} height={80} />
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
                    className={`h-11 cursor-pointer rounded-e-md border border-gray-300 bg-gray-100 p-2 transition-transform hover:bg-gray-200 focus:outline-none active:scale-95 ${typeof max === 'number' && Number(value) >= max ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                   <Image src="/dice/advantage.png" alt="advantage" width={80} height={80} />
                </button>
            </div>
        </div>
    );
}
