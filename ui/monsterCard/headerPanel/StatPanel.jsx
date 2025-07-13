export default function StatPanel({ monster }) {
    return (
        <>
            {monster.armor.id != null && (
                <span className="ml-2 rounded bg-slate-300 px-2 py-0.5 text-sm font-bold text-slate-600">
                    🛡️ {monster.armor.label}
                </span>
            )}

            {monster.speed != null && (
                <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-sm font-bold text-blue-400">
                    🏃 {monster.speed}
                </span>
            )}

            {monster.save != null && (
                <span className="ml-2 rounded bg-amber-200 px-2 py-0.5 text-sm font-bold text-amber-600">
                    ⭐ {monster.save}
                </span>
            )}
        </>
    );
}
