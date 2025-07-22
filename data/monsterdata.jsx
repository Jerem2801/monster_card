import { DAZED, PRONE, RESTRAINED, GRAPPLED, POISONED, BLINDED, SWALLOWED } from './statusdata';

// Tableau des types de taille
export const SIZE_TYPE = {
    TINY: { id: 'tiny', label: 'Très Petit' },
    SMALL: { id: 'small', label: 'Petit' },
    MEDIUM: { id: null, label: 'Moyenne' },
    LARGE: { id: 'large', label: 'Grand' },
    HUGE: { id: 'huge', label: 'Très Grand' },
};

// Tableau des types d'armure
export const ARMOR_TYPE = {
    NONE: { id: null, label: 'Aucune' },
    MEDIUM: { id: 'M', label: 'M', path: '/armor/mediumArmor.png' },
    HEAVY: { id: 'H', label: 'L', path: '/armor/heavyArmor.png' },
};

// Tableau des types de monstres
export const MONSTER_TYPE = {
    GOBELIN: { id: 'gobelin', label: 'Gobelins' },
    KOBOLD: { id: 'kobold', label: 'Kobolds' },
    BANDIT: { id: 'bandit', label: 'Bandits' },
    SNAKEMEN: { id: 'snakemen', label: 'Hommmes-serpents' },
    FOREST_DENIZEN: { id: 'forest_denizen', label: 'Habitant de la forêt' },
    BRIARBANE: { id: 'briarbane', label: 'Fléaux des ronces' },
    TROGLODYTE: { id: 'troglodyte', label: 'Troglodyte' },
    UNDERGROUND: { id: 'underground', label: 'Souterrain' },
    DUNGEON_DENIZEN: { id: 'dungeon_denizen', label: 'Habitant du donjons' },
    ANIMAL: { id: 'animal', label: 'Animaux' },
    SORCIER: { id: 'sorcier', label: 'Sorcier' },
};

// Passifs réutilisables
const passiveHahaMissedMe = {
    name: 'Haha, raté !',
    description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
};
const passiveNooooo = {
    name: 'Nooooo !',
    description:
        'Quand un allié à 2 cases ou moins meurt, effectuez une attaque gratuite immédiatement.',
};
const passifEcorceArrachee = {
    name: 'Écorce Arrachée.',
    description: 'Chaque dégât subit fait baisser l’armure d’un cran : Lourd » Moyen » Aucune.',
};
const passifParry = {
    name: 'Parade.',
    description: 'Considérez les attaques contre vous qui font un 2 au jet comme un échec.',
};
const passifCoilingStrike = {
    name: 'Frappe enroulée.',
    description: 'En cas de coup critique en mêlée : $status:grappled$ (Évasion DD 10).',
};
const passiveDeathStench = {
    name: 'Peste de mort.',
    description: 'À la mort, il $status:poisoned$ les ennemis adjacents pendant 1 manche.',
};
const passiveOverwhelmingStench = {
    name: 'Peste accablante.',
    description:
        'Lors d’un jet d’initiative contre des troglodytes, faites un JdS de FOR à la place.',
};
const passiveEvasiveFlier = {
    name: 'Vol Évasif.',
    description:
        'Les attaques contre les Stirges se font avec $advantage:-1$.',
};

// Tableau des types conditions
export const TRIGGER_TYPE = {
    CRITIC: {
        id: 'critic',
        name: 'de Critique',
    },
    HIT: {
        id: 'damage',
        name: 'de Touche',
    },
    DAMAGE: {
        id: 'damage',
        name: 'de Dégâts',
    },
    MISS: {
        id: 'miss',
        name: "de d'Echecs",
    },
};

// Valeurs par défaut pour chaque monstre
const defaultMonster = {
    armor: ARMOR_TYPE.NONE,
    speed: 6,
    fly: null,
    save: null,
    size: SIZE_TYPE.MEDIUM,
    legendary: false,
    minion: false,
    passif: [],
    action: [],
    bloodied: null,
    lastStand: null,
};

export const dataMonsters = [
    //GOBELIN
    {
        ...defaultMonster,
        id: 'goblin_minion',
        name: 'Sbire Gobelin',
        type: MONSTER_TYPE.GOBELIN,
        hp: 1,
        level: '1/4',
        size: SIZE_TYPE.SMALL,
        minion: true,
        passif: [passiveHahaMissedMe],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d6$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'goblin',
        name: 'Gobelin',
        type: MONSTER_TYPE.GOBELIN,
        hp: 15,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [passiveHahaMissedMe],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d6+2$.',
            },
            {
                name: 'Tir.',
                description: '(Distance 8) $dice:1d6+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'goblin_ratrider',
        name: 'Gobelin Monteur de Rat',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        level: '2',
        size: SIZE_TYPE.LARGE,
        speed: 10,
        passif: [
            passiveHahaMissedMe,
            {
                name: 'CHAAARGE!',
                description:
                    "Si vous vous déplacez d'au moins 4 cases en ligne droite, effectuez une attaque avec $advantage:+1$.",
            },
        ],
        action: [
            {
                name: 'Mordre & Planter (x2).',
                description: '$dice:1d6+2$. Sur un critique: $status:prone$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: PRONE,
                },
                advantage: {
                    name: 'CHAAARGE!',
                    description:
                        "Si vous vous déplacez d'au moins 4 cases en ligne droite, effectuez une attaque avec 1 Avantage.",
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'goblin_taskmaster',
        name: 'Maître Gobelin',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        armor: ARMOR_TYPE.MEDIUM,
        level: '2',
        size: SIZE_TYPE.SMALL,
        passif: [
            passiveHahaMissedMe,
            {
                name: 'Bouclier de viande.',
                description: "Peut forcer un autre gobelin à s'Interposer pour Lui.",
            },
        ],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d6+2$.',
            },
            {
                name: 'Tir.',
                description: '(Distance 8) $dice:1d6+2$.',
            },
            {
                name: 'Ramenez-vous ! ',
                description: 'Appelle un $summon:goblin_minion:1$ au combat.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bugbear',
        name: 'Bugbear',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        level: '2',
        armor: ARMOR_TYPE.MEDIUM,
        action: [
            {
                name: 'Frappe large.',
                description: '$dice:2d6+4$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'Nilbog',
        name: 'Nilbog',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        level: '3',
        passif: [
            {
                name: 'Chaos inversé.',
                description:
                    'Les attaques qui toucheraient normalement un Nilbog ratent à la place, et celles qui rateraient normalement touchent à la place.',
            },
        ],
        action: [
            {
                name: 'Na-na-nère !',
                description:
                    "Réaction — lorsqu'une attaque d'un héros rate un Gobelin, ou lorsqu'un héros aurait pu effectuer une attaque d'opportunité contre un Gobelin mais ne le fait pas : infligez 4 dégâts psychiques.",
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bugbear_cheiftain',
        name: 'Bugbear Chef de Guerre',
        type: MONSTER_TYPE.GOBELIN,
        hp: 40,
        level: '4',
        armor: ARMOR_TYPE.MEDIUM,
        action: [
            {
                name: 'Frappe large.',
                description:
                    '(Portée 2) $dice:2d6+10$, peut également infliger des dégâts à une 2ᵉ cible à portée.',
            },
        ],
    },
    //KOBOLD
    {
        ...defaultMonster,
        id: 'kobold_minion',
        name: 'Sbire Kobold',
        type: MONSTER_TYPE.KOBOLD,
        hp: 1,
        minion: true,
        level: '1/4',
        size: SIZE_TYPE.SMALL,
        passif: [passiveNooooo],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d4+2$.',
            },
            {
                name: 'Fronde.',
                description: '(Distance 8) $dice:1d4+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'kobold',
        name: 'Kobold',
        type: MONSTER_TYPE.KOBOLD,
        hp: 12,
        level: '1/3',
        size: SIZE_TYPE.SMALL,
        passif: [passiveNooooo],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d4+2$.',
            },
            {
                name: 'Fronde',
                description: '(Distance 8) $dice:1d4+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'kobold_sneak',
        name: 'Kobold Sournois',
        type: MONSTER_TYPE.KOBOLD,
        hp: 16,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [
            passiveNooooo,
            {
                name: 'Revanche !',
                description:
                    "Quand un allié meurt, vous pouvez vous déplacer jusqu'à 6 cases avant d'utiliser votre capacité Nooooo !",
            },
        ],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d4+2$.',
            },
            {
                name: 'Fronde.',
                description: '(Distance 8) $dice:1d4+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'kobold_denwarden',
        name: 'Gardien de Tanière Kobold',
        type: MONSTER_TYPE.KOBOLD,
        hp: 20,
        level: '1',
        size: SIZE_TYPE.SMALL,
        armor: ARMOR_TYPE.MEDIUM,
        passif: [
            passiveNooooo,
            {
                name: 'Halte !',
                description: 'Les alliés adjacents gagnent une armure intermédiaire.',
            },
        ],
        action: [
            {
                name: 'Planter (2x).',
                description: '$dice:1d4+2$.',
            },
            {
                name: 'Fronde (2x).',
                description: '(Distance 8) $dice:1d4+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'kobold_trapper',
        name: 'Kobold Trappeur',
        type: MONSTER_TYPE.KOBOLD,
        hp: 26,
        level: '1',
        size: SIZE_TYPE.SMALL,
        passif: [
            passiveNooooo,
            {
                name: 'Pièges !',
                description:
                    'Quand un ennemi se déplace adjacent à vous ou un allié, il déclenche un de vos pièges !',
            },
        ],
        action: [
            {
                name: 'Lancer de scorpion (2×)',
                description: '(Distance 8) $dice:1d4+2$.',
            },
            {
                name: 'ABEIIILLES !',
                description:
                    '$dice:5d4$ (ne rate jamais). La moitié des dégâts est infligée à toutes les créatures adjacentes.',
                use: 1,
            },
            {
                name: 'Filet caché.',
                description: '$status:restrained$ (Évasion DD 10).',
                use: 1,
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'kobold_clanger',
        name: 'Kobold Sonneur',
        type: MONSTER_TYPE.KOBOLD,
        hp: 16,
        level: '1',
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            passiveNooooo,
            {
                name: 'CLANG !',
                description:
                    'Les alliés qui entendent votre vacarme lancent 1 dé supplémentaire à chaque fois qu’ils attaquent.',
            },
        ],
        action: [],
    },
    //BANDIT
    {
        ...defaultMonster,
        id: 'bandit_minion',
        name: 'Sbire Bandit',
        type: MONSTER_TYPE.BANDIT,
        hp: 1,
        minion: 1,
        level: '1/4',
        passif: [passifParry],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d8$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit',
        name: 'Bandit',
        type: MONSTER_TYPE.BANDIT,
        hp: 12,
        level: '1/3',
        passif: [passifParry],
        action: [
            {
                name: 'Planter.',
                description: '$dice:1d8+1$.',
                dice: { numberDice: 1, valueDice: 8, bonus: 1 },
            },
            {
                name: 'Tir.',
                description: '$dice:1d8+1$.',
                dice: { numberDice: 1, valueDice: 8, bonus: 1 },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit_hunter',
        name: 'Bandit Chasseur',
        type: MONSTER_TYPE.BANDIT,
        hp: 22,
        level: '1',
        passif: [passifParry],
        action: [
            {
                name: 'Arc de combat.',
                description: '(Distance 12) $dice:2d8+2$.',
                dice: { numberDice: 2, valueDice: 8, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit_bruiser',
        name: 'Bandit Brutal',
        type: MONSTER_TYPE.BANDIT,
        hp: 24,
        armor: ARMOR_TYPE.MEDIUM,
        level: '2',
        passif: [passifParry],
        action: [
            {
                name: 'Coup violent.',
                description: '$dice:2d8+4$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit_assassin',
        name: 'Bandit Assassin',
        type: MONSTER_TYPE.BANDIT,
        hp: 24,
        level: '2',
        passif: [
            passifParry,
            {
                name: 'Furtivité.',
                description: "Vous êtes $status:invisible$ jusqu'à ce que vous attaquiez.",
            },
        ],
        action: [
            {
                name: 'Lame empoisonnée (2×).',
                description: '$dice:1d8+2$. En cas de dégâts : $status:poisoned$.',
                effect: {
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: POISONED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit_mage',
        name: 'Bandit Mage',
        type: MONSTER_TYPE.BANDIT,
        hp: 41,
        level: '4',
        passif: [
            passifParry,
            {
                name: 'Pas Étincelant.',
                description: 'Lorsqu’il subit des dégâts, téléporte jusqu’à 4 cases.',
            },
        ],
        action: [
            {
                name: 'Éclair Arqué.',
                description:
                    '(Distance 12) $dice:3d8$. Frappe également la créature la plus proche suivante. En cas d’échec : se blesse soi-même à la place.',
                effect: {
                    trigger: TRIGGER_TYPE.MISS,
                    message: 'Vous vous blessez des dégâts.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bandit_captain',
        name: 'Capitaine Bandit',
        type: MONSTER_TYPE.BANDIT,
        hp: 36,
        armor: ARMOR_TYPE.MEDIUM,
        level: '4',
        passif: [passifParry],
        action: [
            {
                name: 'Entaille (3×).',
                description: '$dice:1d8+1$.',
            },
            {
                name: 'Tir (3×).',
                description: '(Distance 8) $dice:1d8+1$.',
            },
        ],
    },
    //HABITANT DU DONJONS
    {
        ...defaultMonster,
        id: 'strige',
        name: 'Strige',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        size: SIZE_TYPE.TINY,
        hp: 10,
        fly: 6,
        level: '1/2',
        passif: [passiveEvasiveFlier],
        action: [
            {
                name: 'S\'accrocher.',
                description: '$dice:1d4+2$. En cas de touche : $status:latch_on$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: LATCH_ON,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'greater_strige',
        name: 'Strige Supérieur',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        size: SIZE_TYPE.SMALL,
        hp: 60,
        fly: 6,
        level: '6',
        passif: [passiveEvasiveFlier],
        action: [
            {
                name: 'S\'accrocher.',
                description: '$dice:1d12+10$. En cas de touche: $status:latch_on$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: LATCH_ON,
                },
            },
        ],
    },
    //HABITANT DE LA FORET
    {
        ...defaultMonster,
        id: 'duskprowler',
        name: 'Traqueur du Crépuscule',
        type: MONSTER_TYPE.FOREST_DENIZEN,
        hp: 70,
        level: '6',
        size: SIZE_TYPE.LARGE,
        passif: [
            {
                name: 'Aura Illusoire.',
                description:
                    "Les attaques contre du Traqueur du Crépuscule ont $advantage:-2$. Les dégâts suppriment cet effet jusqu'à la fin du prochain tour du héros.",
            },
        ],
        action: [
            {
                name: 'Ravage (2x).',
                description: '$dice:2d8+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'basilik',
        name: 'Basilic ',
        type: MONSTER_TYPE.FOREST_DENIZEN,
        hp: 48,
        level: '7',
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            {
                name: 'Chair en pierre.',
                description:
                    'Les créatures $status:dazed$ par le Basilic restent dans cet état pendant 10 minutes. $status:dazed$ 3 fois = $status:petrified$.',
            },
        ],
        action: [
            {
                name: 'Regard de pierre.',
                description: '$status:dazed$ 1 créature dans le champ de vision.',
            },
            {
                name: 'PUIS :',
                description: '',
            },
            {
                name: 'Envenimer.',
                description: '$dice:1d8+10$. $advantage:+1$ contre les cibles $status:dazed$.',
                advantage: {
                    name: 'Envenimer!',
                    description: '1 Avantage contre les cibles Étourdis.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'druid',
        name: 'Druide',
        type: MONSTER_TYPE.FOREST_DENIZEN,
        hp: 90,
        level: '8',
        passif: [],
        action: [
            {
                name: 'Métamorphose bestiale.',
                description: '+4 en vitesse, gagne une Armure Moyenne ce tour. $dice:4d4+10$',
            },
            {
                name: 'OU :',
                description: '',
            },
            {
                name: 'Ouragan.',
                description:
                    '(Portée 3) $dice:4d4+10$ à tous les ennemis à portée. En cas de dégâts : déplace les cibles n’importe où dans la portée.',
                effect: {
                    trigger: TRIGGER_TYPE.DAMAGE,
                    message: 'Déplacer les cibles n’importe où dans Portée 3.',
                },
            },
        ],
    },
    //FLEAUX DES RONCES
    {
        ...defaultMonster,
        id: 'seedling',
        name: 'Pousse',
        type: MONSTER_TYPE.BRIARBANE,
        hp: 8,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        armor: ARMOR_TYPE.HEAVY,
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Graine de ronces.',
                description: '(Distance 6) $dice:2d6+2$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'acidpod',
        name: 'Gousse Acide',
        type: MONSTER_TYPE.BRIARBANE,
        hp: 8,
        level: '1',
        size: SIZE_TYPE.SMALL,
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            passifEcorceArrachee,
            {
                name: 'Éruption caustique.',
                description: 'À la mort : $dice:4d6$ d’acide à TOUTES les créatures adjacentes.',
            },
        ],
        action: [
            {
                name: 'Attraper.',
                description: 'JdS de DEX 12 ou $status:grappled$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'tangler',
        name: 'Enchevêtreur',
        type: MONSTER_TYPE.BRIARBANE,
        hp: 20,
        level: '2',
        armor: ARMOR_TYPE.HEAVY,
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Enchevêtrement (2×).',
                description:
                    '(Distance 6) $dice:1d6+2$. En cas de coup réussi : $status:grappled$ (Évasion DD 12, ou tout dégât de feu ou tranchant).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'rootbreaker',
        name: 'Brise-racines Géante',
        type: MONSTER_TYPE.BRIARBANE,
        hp: 50,
        level: '5',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.HEAVY,
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Coup écrasant.',
                description: '$dice:3d6+6$. En cas de critique : Repousse de 2 cases.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    message: 'Repousse de 2 cases.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'treant',
        name: 'Gardien Sylvestre',
        type: MONSTER_TYPE.BRIARBANE,
        hp: 170,
        level: '14',
        size: SIZE_TYPE.HUGE,
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            passifEcorceArrachee,
            {
                name: 'Enragé.',
                description: "Attaque avec $advantage:+1$ quand il n'a plus d'Armure.",
            },
        ],
        action: [
            {
                name: 'Choisissez deux fois :',
                description: '',
            },
            {
                name: '• Coup de masse.',
                description: '(Portée 3) $dice:2d6+10$. En cas de dégâts : $status:prone$.',
                effect: {
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: PRONE,
                },
                advantage: {
                    name: 'Enragé.',
                    description: "1 Avantage quand il n'a plus d'Armure.",
                },
            },
            {
                name: '• Piétinement.',
                description: '(Cible $status:hampered$) $dice:2d6+20$.',
                advantage: {
                    name: 'Enragé.',
                    description: "1 Avantage quand il n'a plus d'Armure.",
                },
            },
        ],
    },
    //HOMME-SERPENT
    {
        ...defaultMonster,
        id: 'snakeman_minion',
        name: 'Sbire Homme-serpent',
        type: MONSTER_TYPE.SNAKEMEN,
        hp: 1,
        level: '1/4',
        minion: true,
        passif: [passifCoilingStrike],
        action: [
            {
                name: 'Frappe.',
                description: '$dice:1d6$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Crachat.',
                description: '(Distance 8) $dice:1d6$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'snakeman',
        name: 'Homme-serpent',
        type: MONSTER_TYPE.SNAKEMEN,
        hp: 26,
        level: '1',
        passif: [passifCoilingStrike],
        action: [
            {
                name: 'Entaille.',
                description: '$dice:1d6+6$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Crachat.',
                description: '(Distance 8) $dice:1d6+6$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'cobra_captain',
        name: 'Capitaine Cobra',
        type: MONSTER_TYPE.SNAKEMEN,
        hp: 36,
        level: '4',
        armor: ARMOR_TYPE.MEDIUM,
        passif: [passifCoilingStrike],
        action: [
            {
                name: 'Entaille (2x).',
                description: '$dice:1d6+6$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Crachat (2x).',
                description: '(Distance 8) $dice:1d6+6$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'giant_cobra',
        name: 'Cobra Géant',
        type: MONSTER_TYPE.SNAKEMEN,
        hp: 80,
        level: '8',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        passif: [passifCoilingStrike],
        action: [
            {
                name: 'Écrasement.',
                description: '$dice:2d6+20$. $advantage:+1$ contre les créatures plus petites.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: GRAPPLED,
                },
                advantage: {
                    name: 'Écrasement.',
                    description: '1 Avantage contre les créatures plus petites.',
                },
            },
        ],
    },
    //TROGLODYTE
    {
        ...defaultMonster,
        id: 'troglodyte',
        name: 'Troglodyte',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 14,
        level: '1/3',
        passif: [passiveOverwhelmingStench, passiveDeathStench],
        action: [
            {
                name: 'Griffes.',
                description: '$dice:1d6+3$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troglodyte_tunneler',
        name: 'Troglodyte Tunnelier',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 14,
        level: '1',
        passif: [
            passiveOverwhelmingStench,
            passiveDeathStench,
            {
                name: 'Fouisseur.',
                description:
                    "$status:invisible$ jusqu'à ce que vous attaquiez. Si le troglodyte n’est ni en train de creuser ni d’agripper, il creuse au lieu d’attaquer.",
            },
        ],
        action: [
            {
                name: 'Par en dessous !',
                description:
                    '$dice:1d6+3$. En cas de coup réussi : $status:grappled$ (Évasion DD 10).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troglodyte_muckthrower',
        name: 'Troglodyte Lance-boue',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 20,
        level: '2',
        passif: [passiveOverwhelmingStench, passiveDeathStench],
        action: [
            {
                name: 'Jet de Glu.',
                description:
                    '(Distance 6) $dice:1d6+3$. En cas de touche : $status:blinded$ pendant 1 round.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: BLINDED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troglodyte_screecher',
        name: 'Troglodyte Hurleur',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 30,
        level: '3',
        passif: [passiveOverwhelmingStench, passiveDeathStench],
        action: [
            {
                name: 'Hurlement.',
                description: '(ZdE, Portée 2) $dice:1d6+3$. $status:dazed$ tous les ennemis.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DAZED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troglodyte_champion',
        name: 'Troglodyte Champion',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 40,
        armor: ARMOR_TYPE.MEDIUM,
        level: '4',
        passif: [passiveOverwhelmingStench, passiveDeathStench],
        action: [
            {
                name: 'Massue à pointes.',
                description: '$dice:3d6+9$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'fungal_hulk',
        name: 'Colosse Fongique',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 50,
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        speed: 4,
        level: '4',
        passif: [
            passiveOverwhelmingStench,
            passiveDeathStench,
            {
                name: 'Véhicule de Siège.',
                description:
                    'Jusqu’à 4 créatures moyennes peuvent monter dessus et diriger le mouvement de cette créature. Elles bénéficient de Couverture et d’une Armure Moyenne. Lorsqu’il est détruit, toutes les créatures à son bord tombent $status:prone$.',
            },
        ],
        action: [
            {
                name: 'Écrasement.',
                description: 'Une créature plus petite sur son chemin subit 10 dégâts.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troglodyte_swollen_one',
        name: 'Troglodyte Enflé',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 50,
        size: SIZE_TYPE.LARGE,
        level: '5',
        passif: [passiveOverwhelmingStench, passiveDeathStench],
        action: [
            {
                name: 'Lancer.',
                description: 'Lance un allié adjacent jusqu’à 6 cases.',
            },
            {
                name: 'Puis :',
                description: '',
            },
            {
                name: 'Puantise Envahissante.',
                description:
                    '(ZdE, Portée 12) : $dice:3d6+3$ à tous les ennemis. Ils sont $status:dazed$ et $status:poisoned$ pendant 1 round.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'gloom_moth',
        name: 'Phalène de l’Ombre',
        type: MONSTER_TYPE.TROGLODYTE,
        hp: 40,
        size: SIZE_TYPE.HUGE,
        level: '6',
        fly: 4,
        passif: [
            passiveOverwhelmingStench,
            passiveDeathStench,
            {
                name: 'Ailes Absorbant la Lumière.',
                description: 'Le rayon de la lumière et du son est réduit de moitié.',
            },
            {
                name: 'Poussière d’Ombre.',
                description:
                    'Les Troglodytes dans une Portée de 12 lancent des d12 au lieu de d6. Lorsqu’elle subit des dégâts, inflige 1d12 de dégâts psychiques imparables aux ennemis dans une portée de 12.',
            },
        ],
        action: [],
    },
    //UNDERGROUND
    {
        ...defaultMonster,
        id: 'spider_minion',
        name: 'Sbire Araignée',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 1,
        level: '1/4',
        minion: true,
        action: [
            {
                name: 'Morsure.',
                description: '$dice:1d8$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'giant_spider',
        name: 'Araignée Géante',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 27,
        level: '2',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        action: [
            {
                name: 'Lancer de toile.',
                description:
                    '(Distance 6) $dice:1d8+2$. En cas de coup réussi : $status:restrained$ (Évasion DD 12, ou dégâts tranchants/feu).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: RESTRAINED,
                },
            },
            {
                name: 'Morsure.',
                description:
                    '(Cible $status:hampered$) $dice:2d8+4$, $status:poisoned$ (les soins magiques prennent fin).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: POISONED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'ettercap',
        name: 'Tisseur bestial',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 49,
        level: '4',
        action: [
            {
                name: 'Garrot de toile.',
                description:
                    '$dice:1d8+2$. En cas de touche : $status:grappled$ (Évasion DD 13), $status:silenced$ jusqu’à ce que la cible se libère.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'nestweaver',
        name: 'Tisseur de Nid',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 54,
        level: '6',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        action: [
            {
                name: '',
                description: 'Invoque 2 $summon:spider_minion:2$. Puis choisissez 1 option :',
            },
            {
                name: '• Lancer de toile.',
                description:
                    '(Distance 6) $dice:1d8+2$. En cas de coup réussi : $status:restrained$ (Évasion DD 12, ou dégâts tranchants/feu).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: RESTRAINED,
                },
            },
            {
                name: 'OU :',
                description: '',
            },
            {
                name: '• Morsure.',
                description:
                    '(Cible $status:hampered$) $dice:3d8+6$, $status:poisoned$ (les soins magiques prennent fin).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: POISONED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'umber_hulk',
        name: 'Colosse des ombres',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 70,
        level: '10',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            {
                name: 'Phéromones déroutantes.',
                description:
                    'Les ennemis doivent réussir un JdS de VOL 15 au début de leur tour, sinon ils sont $status:confused$ pour ce tour. Ils gagnent $advantage:+1$ au jet pour chaque échec subi durant cet affrontement.',
            },
        ],
        action: [
            {
                name: 'Mandibules & Griffes (2×).',
                description: '$dice:1d10+10$ dégâts.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'cloaker',
        name: 'Voileur',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 110,
        level: '13',
        size: SIZE_TYPE.LARGE,
        fly: 10,
        passif: [
            {
                name: 'Embusqué.',
                description:
                    'Les voileurs agissent toujours en premier et les héros lancent leur initiative avec $advantage:-1$.',
            },
            {
                name: 'Souffrance partagée.',
                description:
                    'Vous subissez la moitié des dégâts des attaques pendant que vous $status:grappled$ une créature (elle subit l’autre moitié).',
            },
        ],
        action: [
            {
                name: 'Enveloppement.',
                description:
                    '$dice:2d10+20$. En cas de touche : $status:grappled$ (Évasion DD 16).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: 'OU :',
                description: '',
            },
            {
                name: 'Hurlement terrifiant.',
                description:
                    'JdS de VOL 16, ou les créatures situées dans un rayon de 6 cases sont $status:frightened$ et doivent utiliser 1 action pour s’éloigner le plus possible.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'great_worm',
        name: 'Grand Ver',
        type: MONSTER_TYPE.UNDERGROUND,
        hp: 140,
        level: '16',
        size: SIZE_TYPE.HUGE,
        armor: ARMOR_TYPE.HEAVY,
        speed: 8,
        passif: [
            {
                name: 'Vision sismique.',
                description:
                    '$advantage:+1$ contre les créatures qui se sont déplacées depuis le dernier tour du ver.',
            },
        ],
        action: [
            {
                name: 'Écrasement.',
                description:
                    'Les créatures dans une zone de 2×6 cases subissent 50 dégâts si elles ratent un JdS de DEX 18. (Les créatures ayant échoué peuvent dépenser 1 action pour plonger hors de la zone au lieu de subir les dégâts. Elles se déplacent alors de la moitié de leur vitesse et finissent $status:prone$.)',
            },
            {
                name: 'OU :',
                description: '',
            },
            {
                name: 'Morsure / Déglutition.',
                description: '$dice:1d4+40$. Sur un coup critique : $status:swallowed$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: SWALLOWED,
                },
                advantage: {
                    name: 'Vision sismique.',
                    description:
                        '1 Avantage contre les créatures qui se sont déplacées depuis le dernier tour du ver.',
                },
            },
        ],
    },
    //LEGENDAIRE
    {
        ...defaultMonster,
        id: 'krogg',
        name: 'Krogg',
        type: MONSTER_TYPE.GOBELIN,
        legendary: true,
        hp: 75,
        armor: ARMOR_TYPE.MEDIUM,
        level: '2',
        save: 'FOR+,DEX+',
        passif: [],
        action: [
            {
                name: 'ACTIONS.',
                description: "Après chaque tour d'un héro, choissisez un :",
            },
            {
                name: '• Massacre brutal.',
                description:
                    'Se déplace de 6. Inflige $dice:2d6+3$ dégâts, la cible est $status:grappled$ (Évasion DD 10).',
            },
            {
                name: '• Casse-crânes.',
                description:
                    'Se déplace de 6. Utilise une créature $status:grappled$ comme arme contre une autre créature. Les deux subissent $dice:2d6+3$ dégâts, et l’agrippement prend fin.',
                dice: { numberDice: 2, valueDice: 6, bonus: 3 },
            },
        ],
        bloodied: {
            description: 'À $hp, les dégâts de Krogg passent à 2d8+3.',
            hp: '37 PV',
            newDice: { numberDice: 2, valueDice: 8, bonus: 3 },
        },
        lastStand: {
            description:
                'Krogg est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. D’ici là, il bénéficie d’une armure lourde.',
            hp: 20,
            newArmor: ARMOR_TYPE.HEAVY,
        },
    },
    {
        ...defaultMonster,
        name: 'Grimbeak',
        type: MONSTER_TYPE.ANIMAL,
        legendary: true,
        hp: 100,
        armor: ARMOR_TYPE.MEDIUM,
        level: '3',
        size: SIZE_TYPE.LARGE,
        save: 'FOR+',
        passif: [
            {
                name: 'Brutal.',
                description:
                    "Traitez n'import qu'elle dé comme un Dé Primaire. Sur un critique: A Terre.",
            },
        ],
        action: [
            {
                name: 'ACTIONS.',
                description: "Après chaque tour d'un héro, choissisez un :",
            },
            {
                name: '• Hurlement Sauvage.',
                description:
                    "Tous les ennemis dans un rayon de 12 subissent $dice dégâts (ignorent l'armure). JdS de VOL 11 ou deviennent Effrayés pendant 1 round.",
                dice: { numberDice: 2, valueDice: 6, bonus: 0 },
                use: 1,
            },
            {
                name: '• Déchirer & Lacérer.',
                description: '$dice.',
                dice: { numberDice: 2, valueDice: 6, bonus: 10 },
            },
            {
                name: '• Bec.',
                description: 'Déplacement de 8 et $dice.',
                dice: { numberDice: 2, valueDice: 6, bonus: 0 },
            },
        ],
        bloodied: {
            description: 'À $hp, Hurlement Sauvage se recharge.',
            hp: '50 PV',
        },
        lastStand: {
            description:
                "Grimbeak est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. Jusqu'à ce moment-là, ses attaques utilisent des d10 au lieu des d6.",
            hp: 30,
            newValueDice: 10,
        },
    },
    {
        ...defaultMonster,
        name: 'Greenthumb',
        type: MONSTER_TYPE.SORCIER,
        legendary: true,
        hp: 100,
        level: '3',
        size: SIZE_TYPE.SMALL,
        save: 'INT+,VOL+',
        passif: [],
        action: [
            {
                name: 'ACTIONS.',
                description: "Après chaque tour d'un héro, mouvement de 6 puis choissisez un :",
            },
            {
                name: '• Invoquer des Roncespectres.',
                description: 'Invoque 1 sbire / héros (taille : 1d4).',
            },
            {
                name: '• Enracinement.',
                description:
                    'Choisissez la moitié des héros. Ils doivent réussir un JdS de DEX 11 ou subir $dice et être Entravés par des lianes épineuses (évasion : JdS de STR ou DEX 11, ou recevoir des dégâts tranchants ou de feu pour se libérer).',
                dice: { numberDice: 2, valueDice: 4, bonus: 0 },
            },
            {
                name: '• Tir de ronces.',
                description: '(Distance 10) $dice.',
                dice: { numberDice: 5, valueDice: 4, bonus: 5 },
            },
        ],
        bloodied: {
            description:
                'À $hp, Greenthumb gagne une écorce magique qui lui confère une Armure Lourde.',
            hp: '50 PV',
            armor: ARMOR_TYPE.HEAVY,
        },
        lastStand: {
            description:
                'Grimbeak est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. En attendant, il agit deux fois par tour.',
            hp: 30,
            newDescription: "Après chaque tour d'un héro, mouvement de 6 puis choissisez deux :",
        },
    },
];
