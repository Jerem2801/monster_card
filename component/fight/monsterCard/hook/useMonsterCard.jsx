import { useState, useEffect, useCallback } from 'react';
import { updateLegendaryMonster2 } from '../legendary/LegendaryMechanics';

export function useMonsterCard(monster) {
    // Synchronise localMonster si la prop monster change
    const [localMonster, setLocalMonster] = useState(monster);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [dead, setDead] = useState(false);

    useEffect(() => {
        setLocalMonster(monster);
    }, [monster]);

    // Ajoute ou retire un statut
    const setStatus = useCallback((status, value) => {
        setSelectedStatuses(prev =>
            value
                ? prev.includes(status)
                    ? prev
                    : [...prev, status]
                : prev.filter(s => s !== status),
        );
    }, []);

    // Met à jour le statut bloodied
    const setBloodiedStatus = useCallback(
        bloodied => {
            setStatus('bloodied', bloodied);
        },
        [setStatus],
    );

    // Met à jour le statut dead/deadly
    const setDeadStatus = useCallback(
        (newHp, legendary) => {
            const statusDead = legendary ? 'deadly' : 'dead';
            if (newHp === 0) {
                setStatus(statusDead, true);
                setDead(true);
            } else if (newHp > 0) {
                setStatus(statusDead, false);
                setDead(false);
            }
        },
        [setStatus],
    );

    // Met à jour le monstre légendaire
    const updateLegendaryMonster = useCallback(
        newHp => {
            if (!localMonster) return;
            const updated = structuredClone(localMonster);
            updateLegendaryMonster2(updated, newHp);
            setLocalMonster(updated);
        },
        [localMonster],
    );

    // Met à jour les HP et les statuts
    const handleNewHP = useCallback(
        newHp => {
            if (!localMonster) return;
            setBloodiedStatus(newHp <= localMonster.hp / 2);
            setDeadStatus(newHp, localMonster.legendary);
            if (localMonster.legendary) {
                updateLegendaryMonster(newHp);
            }
        },
        [localMonster, setBloodiedStatus, setDeadStatus, updateLegendaryMonster],
    );

    // Reset tous les statuts
    const resetStatuses = useCallback(() => {
        setSelectedStatuses([]);
        setDead(false);
    }, []);

    // Permet d'ajouter un statut custom
    const addCustomStatus = useCallback(
        status => {
            setStatus(status, true);
        },
        [setStatus],
    );

    // Sécurité : vérifie que monster est défini
    useEffect(() => {
        if (!monster) {
            setLocalMonster(null);
            setSelectedStatuses([]);
            setDead(false);
        }
    }, [monster]);

    // Commentaires explicatifs
    // - setStatus : ajoute/retire un statut
    // - setBloodiedStatus : gère le statut bloodied
    // - setDeadStatus : gère le statut dead/deadly
    // - updateLegendaryMonster : met à jour le monstre légendaire
    // - handleNewHP : met à jour tous les statuts selon les HP
    // - resetStatuses : réinitialise tous les statuts
    // - addCustomStatus : ajoute un statut personnalisé

    return {
        localMonster,
        setLocalMonster,
        selectedStatuses,
        setSelectedStatuses,
        dead,
        handleNewHP,
        resetStatuses,
        addCustomStatus,
        setBloodiedStatus,
        setDeadStatus,
    };
}
// ...existing code...
