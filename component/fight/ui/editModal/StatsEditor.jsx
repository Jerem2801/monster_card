import SimpleInputText from '@/ui/simple/SimpleInputText';
import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import { ARMOR_TYPE } from '@/data/monsterdata';
import Image from 'next/image';
import { Select, Label } from 'flowbite-react';
import { getArmorType } from '@/lib/monsterUtils';

export default function StatsEditor({ monster, updateMonster }) {
    const options = Object.values(ARMOR_TYPE).map(type => ({
        id: type.id ?? '',
        label: type.label,
        path: type.path ?? null,
    }));

    return (
        <div className="space-y-6 px-4 py-4 text-sm text-gray-700">
            {/* Nom */}
            <SimpleInputText
                label="Nom"
                placeholder={monster.name}
                value={monster.name}
                onChange={e => updateMonster({ name: e.target.value })}
            />

            {/* Armure */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <Label htmlFor="armor">Armure</Label>
                    <Image src="/stat/armor.png" alt="🛡️" width={20} height={20} />
                </div>
                <Select
                    id="armor"
                    value={monster.armor?.id ?? ''}
                    onChange={e => {
                        const armorObj = getArmorType(e.target.value);
                        updateMonster({ armor: armorObj });
                    }}
                >
                    {options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </div>

            {/* Vitesse + Vol */}
            <div className="flex items-end gap-8">
                {/* Vitesse */}
                <div className="flex flex-col">
                    <div className="mb-1 flex items-center gap-2">
                        <Label>Vitesse</Label>
                        <Image src="/stat/speed.png" alt="🏃" width={20} height={20} />
                    </div>
                    <SimpleInputNumber
                        label=""
                        min={1}
                        max={30}
                        value={monster.speed}
                        onChange={e => updateMonster({ speed: e.target.value })}
                    />
                </div>

                {/* Vol */}
                <div className="flex flex-col">
                    <div className="mb-1 flex items-center gap-2">
                        <Label>Vol</Label>
                        <Image src="/stat/fly.png" alt="🪶" width={20} height={20} />
                    </div>
                    <SimpleInputNumber
                        label=""
                        min={0}
                        max={30}
                        value={monster.fly}
                        onChange={e => updateMonster({ fly: e.target.value })}
                    />
                </div>
            </div>

            {/* Jets de sauvegarde */}
            <SimpleInputText
                label="Jets de Sauvegarde ⭐"
                value={monster.save}
                onChange={e => updateMonster({ save: e.target.value })}
            />
        </div>
    );
}
