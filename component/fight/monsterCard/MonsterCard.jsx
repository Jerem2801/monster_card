import NamePanel from './headerPanel/NamePanel';
import PassivePanel from './passive/PassivePanel';
import ActionPanel from './actions/ActionPanel';

export default function MonsterCard({ monster, addMonsterCard }) {

    return (
        <div className="w-full space-y-4 rounded-2xl border border-neutral-300 bg-amber-50 p-6 shadow-lg transition-shadow hover:shadow-xl md:w-[70%]">

            <NamePanel monster={monster} />

            <PassivePanel monster={monster} />

            <ActionPanel monster={monster} addMonsterCard={addMonsterCard} />

        </div>
    );
}
