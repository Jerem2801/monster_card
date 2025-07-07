const colorClassMap = {
  red: 'text-white bg-red-300 hover:bg-red-200',
  blue: 'text-white bg-blue-300 hover:bg-blue-200',
  green: 'text-white bg-green-300 hover:bg-green-200',
  yellow: 'text-white bg-yellow-300 hover:bg-yellow-200',
};

export default function SimpleButton({ onClick, name, color }) {
    const colorClasses = colorClassMap[color] || colorClassMap.blue;
    return (
        <button
          onClick={onClick}
          className={`px-8 py-3 rounded-2xl transition-colors font-semibold ${colorClasses}`}
        >
          {name}
        </button>
    );
}
