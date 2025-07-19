export function getArmorImagePath(monster) {
    if (!monster?.armor?.id) return;
    console.log(monster.armor.path);
    return monster.armor.path;
}
