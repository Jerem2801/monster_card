import { useEffect, useState } from 'react';
import {
    applyModifiers,
    clampHp,
    computeAutoStatus,
    computeAutoStatusLegendary,
} from '../lib/fightUtils';
import { BLOODIED, DEAD, DEADLY } from '@/data/statusdata';

export function useMonsterState(monsters, setMonsters) {
    const [modifiedMonsters, setModifiedMonsters] = useState({});

    useEffect(() => {
        const newModified = {};
        monsters.forEach(m => {
            newModified[m.id] = applyModifiers(m.monster, m.status);
        });
        setModifiedMonsters(newModified);
    }, [monsters]);

    function updateMonster(id, updatedFields) {
        setMonsters(prev =>
            prev.map(m =>
                m.id === id ? { ...m, monster: { ...m.monster, ...updatedFields } } : m,
            ),
        );
    }

    function updateMonsterHp(id, newHp, legendary) {
        setMonsters(prev =>
            prev.map(m => {
                if (m.id !== id) return m;

                const maxHp = m.monster.hp;
                const clamped = clampHp(newHp, maxHp);
                const autoStatus = computeAutoStatus(clamped, maxHp, legendary);
                const manualStatus = m.status.filter(
                    s => ![BLOODIED.id, DEAD.id, DEADLY.id].includes(s.id),
                );

                return { ...m, currentHp: clamped, status: [...autoStatus, ...manualStatus] };
            }),
        );
    }

    function updateMonsterHpLegendary(id, newHp) {
        setMonsters(prev =>
            prev.map(m => {
                if (m.id !== id) return m;

                const maxHp = m.monster.last_stand?.hp ?? 0;
                const clamped = clampHp(newHp, maxHp);
                const autoStatus = computeAutoStatusLegendary(clamped);
                const manualStatus = m.status.filter(s => ![DEADLY.id, DEAD.id].includes(s.id));

                return {
                    ...m,
                    currentHpLegendary: clamped,
                    status: [...autoStatus, ...manualStatus],
                };
            }),
        );
    }

    function updateMonsterStatus(id, newStatusList) {
        setMonsters(prev =>
            prev.map(m => {
                if (m.id !== id) return m;
                const autoStatusIds = [BLOODIED.id, DEAD.id, DEADLY.id];
                const manualStatus = newStatusList.filter(s => !autoStatusIds.includes(s.id));
                const autoStatus = m.status.filter(s => autoStatusIds.includes(s.id));
                return { ...m, status: [...autoStatus, ...manualStatus] };
            }),
        );
    }

    function addMonsterCard(baseMonster, quantity = 1) {
        if (!baseMonster || quantity <= 0) return;

        const existingCount = monsters.filter(
            m => m.monster.name.replace(/\s\d+$/, '') === baseMonster.name,
        ).length;

        const newMonsters = Array.from({ length: quantity }, (_, index) => {
            const suffix = existingCount + index + 1;
            return {
                id: crypto.randomUUID(),
                monster: { ...baseMonster, name: `${baseMonster.name} ${suffix}` },
                currentHp: baseMonster.hp,
                status: [],
            };
        });

        setMonsters(prev => [...prev, ...newMonsters]);
    }

    function deleteMonster(id) {
        setMonsters(prev => prev.filter(m => m.id !== id));
    }

    return {
        modifiedMonsters,
        updateMonster,
        updateMonsterHp,
        updateMonsterHpLegendary,
        updateMonsterStatus,
        addMonsterCard,
        deleteMonster,
    };
}
