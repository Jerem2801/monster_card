export function getArmorImagePath(monster) {
    if (!monster?.armor?.id) return;
    return monster.armor.path;
}
