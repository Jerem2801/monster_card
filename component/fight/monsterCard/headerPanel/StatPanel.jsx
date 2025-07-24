import Image from 'next/image';
import { getArmorImagePath } from '@/lib/monsterUtils';

export default function StatPanel({ monster }) {
    const armorPath = getArmorImagePath(monster);

    return (
        <>
            {monster.armor.id != 'none' &&  (
                <span className="ml-2 flex items-center gap-1 rounded bg-slate-300 px-2 py-0.5 text-sm font-bold text-slate-600">
                    <Image src={armorPath} alt="🛡️" width={20} height={20} />
                    {monster.armor.label}
                </span>
            )}

            {monster.speed != 6 && (
                <span className="ml-2 flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-sm font-bold text-blue-400">
                    <Image src="/stat/speed.png" alt="🏃" width={20} height={20} />
                    {monster.speed}
                </span>
            )}

            {monster.fly != null && monster.fly != 0 && (
                <span className="ml-2 flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-sm font-bold text-blue-400">
                    <Image src="/stat/fly.png" alt="🪶" width={20} height={20} />
                    {monster.fly}
                </span>
            )}

            {monster.save != null && (
                <span className="ml-2 flex items-center gap-1 rounded bg-amber-200 px-2 py-0.5 text-sm font-bold text-amber-600">
                    ⭐
                    {monster.save}
                </span>
            )}
        </>
    );
}
