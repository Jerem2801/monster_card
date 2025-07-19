export default function FightHeader({ encounterName, deleteMode, setDeleteMode }) {
    return (
        <div className="flex items-center justify-between border-b border-gray-300 bg-white px-5 py-3 shadow-sm">
            <div className="flex items-center gap-3">
                ⚔️
                <h1 className="text-xl font-bold tracking-tight text-gray-800">{encounterName}</h1>
            </div>

            <button
                onClick={() => setDeleteMode(!deleteMode)}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition duration-200 ${
                    deleteMode
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                <span className="text-base">{deleteMode ? '✖' : '🗑️'}</span>
                {deleteMode ? 'Quitter Suppression' : 'Mode Suppression'}
            </button>
        </div>
    );
}
