import { BLOODIED, DEAD, DEADLY } from '@/data/statusdata';

/**
 * Clamp une valeur entre 0 et un max
 */
export function clampHp(value, max) {
    return Math.max(0, Math.min(value, max));
}

/**
 * Calcule les statuts automatiques selon les HP normaux
 */
export function computeAutoStatus(hp, maxHp, legendary = false) {
    const isMidLife = hp > 0 && hp <= maxHp / 2;
    const isDead = hp === 0;

    if (legendary && isDead) {
        return [DEADLY];
    } else if (isDead) {
        return [DEAD];
    } else if (isMidLife) {
        return [BLOODIED];
    }

    return [];
}

/**
 * Calcule les statuts automatiques pour les HP légendaires
 */
export function computeAutoStatusLegendary(hp) {
    return hp === 0 ? [DEAD] : [DEADLY];
}

/**
 * Applique les modificateurs visuels d'un monstre en fonction de ses statuts
 */
export function applyModifiers(monster, statusList) {
    if (!monster.legendary) {
        // Si le monstre n'est pas légendaire, on ne fait aucune modification
        return monster;
    }

    let modified = { ...monster };

    const hasDeadlyOrDead = statusList.some(s => s.id === DEADLY.id || s.id === DEAD.id);

    if (hasDeadlyOrDead) {
        // Applique les modifs last_stand
        const mods = monster.last_stand?.modifiers || {};
        for (const [key, value] of Object.entries(mods)) {
            modified = applyModifierByKey(modified, key, value);
        }

        // Applique aussi les modifs bloodied même si bloodied n'est pas dans les status
        const bloodiedMods = monster.bloodied?.modifiers || {};
        for (const [key, value] of Object.entries(bloodiedMods)) {
            modified = applyModifierByKey(modified, key, value);
        }
    } else {
        // Applique modifs bloodied seulement si bloodied est dans les status
        const hasBloodied = statusList.some(s => s.id === BLOODIED.id);
        if (hasBloodied) {
            const mods = monster.bloodied?.modifiers || {};
            for (const [key, value] of Object.entries(mods)) {
                modified = applyModifierByKey(modified, key, value);
            }
        }
    }

    return modified;
}

function applyModifierByKey(monster, key, value) {
    const modifierHandlers = {
        replaceDice: (mon, val) => {
            const diceRegex = /\$dice:(\d+)d(\d+)([+-]\d+)?\$/g;

            return {
                ...mon,
                action: mon.action?.map(action => ({
                    ...action,
                    description: action.description.replace(
                        diceRegex,
                        (_, diceCount, _oldDiceType, modifier = '') => {
                            return `$dice:${diceCount}d${val}${modifier}$`;
                        },
                    ),
                })),
            };
        },
        overrideArmor: (mon, val) => ({
            ...mon,
            armor: val,
        }),
        overrideActions: (mon, val) => ({
            ...mon,
            action: mon.action?.map(action =>
                action.name === 'ACTIONS.' ? { ...action, description: val } : action,
            ),
        }),
        overrideAction: (mon, val) => ({
            ...mon,
            action: mon.action?.map(action =>
                action.name === val.name ? { ...action, name: val.newName } : action,
            ),
        }),
        overridePassive: (mon, val) => ({
            ...mon,
            passif: mon.passif?.map(passif =>
                passif.name === val.oldPassifName ? { ...passif, name: val.newPassifName,description: val.newPassifDescription } : passif,
            ),
        }),
        addPassive: (mon, val) => ({
            ...mon,
            passif: [...(mon.passif || []), val],
        }),
        reloadAction: (mon, val) => ({
            ...mon,
            action: mon.action?.map(action =>
                action.name === val ? { ...action, reload: true } : action,
            ),
        }),
    };

    const handler = modifierHandlers[key];
    return handler ? handler(monster, value) : monster;
}
