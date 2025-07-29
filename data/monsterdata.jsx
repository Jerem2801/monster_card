import {
    DAZED,
    PRONE,
    RESTRAINED,
    GRAPPLED,
    POISONED,
    BLINDED,
    SWALLOWED,
    LATCH_ON,
    DIGESTED,
    INVISIBLE,
    DESPAIR,
} from './statusdata';

// Tableau des types de taille
export const SIZE_TYPE = {
    TINY: { id: 'tiny', label: 'Très Petit' },
    SMALL: { id: 'small', label: 'Petit' },
    MEDIUM: { id: null, label: 'Moyenne' },
    LARGE: { id: 'large', label: 'Grand' },
    HUGE: { id: 'huge', label: 'Très Grand' },
    GARGANTUAN: { id: 'gargantuan', label: 'Gigantesque' },
};

// Tableau des types d'armure
export const ARMOR_TYPE = {
    NONE: { id: 'none', label: 'Aucune' },
    MEDIUM: { id: 'M', label: 'Moyenne', path: '/armor/mediumArmor.png' },
    HEAVY: { id: 'L', label: 'Lourde', path: '/armor/heavyArmor.png' },
};

// Tableau des types de monstres
export const MONSTER_TYPE = {
    GOBELIN: { id: 'gobelin', label: 'Gobelins' },
    KOBOLD: { id: 'kobold', label: 'Kobolds' },
    BANDIT: { id: 'bandit', label: 'Bandits' },
    SNAKEMEN: { id: 'snakemen', label: 'Hommmes-serpents' },
    TROGLODYTE: { id: 'troglodyte', label: 'Troglodyte' },
    HILL_FIELD: { id: 'hill_field', label: 'Colline et Champ' },
    UNDEAD: {id:'undead', label :'Mort-vivant'},
    CULTISTS_HORRORS: {id: 'cultists_horrors', label:'Cultiste et Horreur'},
    UNDEAD: {id:'undead', label :'Mort-vivant'},
    FOREST_DENIZEN: { id: 'forest_denizen', label: 'Habitant de la forêt' },
    DUNGEON_DENIZEN: { id: 'dungeon_denizen', label: 'Habitant du donjons' },
    UNDERGROUND: { id: 'underground', label: 'Souterrain' },
    ANIMAL: { id: 'animal', label: 'Animaux' },
    SORCIER: { id: 'sorcier', label: 'Sorcier' },
    DEVIL: { id: 'devil', label: 'Diable' },
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
    description: 'Les attaques contre les Stirges se font avec $advantage:-1$.',
};
const passiveMimicsAmbusher = {
    name: 'Embusqueur.',
    description:
        'Les mimics commencent toujours en premier et les héros jettent l’Initiative avec $advantage:-1$.',
};
const passiveMimicsSticky = {
    name: 'Collant.',
    description:
        'Les Mimic peuvent agripper un nombre illimité de créatures. En cas de coup critique : libère 1 créature (au choix de l’attaquant).',
};
const passiveUnlivingUndying = {
    name: 'Non-vivant, non-mortel.',
    description: "La première fois que cette créature meurt, elle revient à 1 PV à la place.",
};
const passiveFanaticalZeal = {
    name: 'Zèle Fanatique.',
    description: 'Tant que vous n’êtes pas à vos PV max, vous effectuez tous vos jets avec $advantage:+1$. Vos coups critiques infligent également $status:despair$.',
};


// Tableau des types conditions
export const TRIGGER_TYPE = {
    CRITIC: {
        id: 'critic',
        name: '🔥Critique !',
    },
    HIT: {
        id: 'damage',
        name: '✅ Touché :',
    },
    DAMAGE: {
        id: 'damage',
        name: '💥Dégâts :',
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
    fly: 0,
    save: '',
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
        initStatus: [INVISIBLE],
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
    //COLLINE ET CHAMPS
    {
        ...defaultMonster,
        id: 'gnoll',
        name: 'Gnoll',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 28,
        level: '1',
        passif: [
            {
                name: 'Frénésie.',
                description: '$advantage:+1$ contre les créatures $status:bloodied$.',
            },
        ],
        action: [
            {
                name: 'Ravage (2×).',
                description: '$dice:1d10$.',
                advantage: {
                    name: 'Frénésie.',
                    description: '1 Avantage contre les créatures Ensanglanté.',
                },
            },
            {
                name: 'Tir.',
                description: '(Distance 12) $dice:1d10$.',
                advantage: {
                    name: 'Frénésie.',
                    description: '1 Avantage contre les créatures Ensanglanté.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'worg',
        name: 'Worg',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 28,
        speed: 10,
        level: '1',
        passif: [
            {
                name: 'Sauvage.',
                description: 'Effectue toujours un coup critique lorsqu’il attaque une créature agrippée.',
            },
        ],
        action: [
            {
                name: 'Déchirer (2×).',
                description: '$dice:1d6+2$. En cas de touche : $status:grappled$ (Évasion DD 10).',
            }
        ],
    },
    {
        ...defaultMonster,
        id: 'blue_drake',
        name: 'Drake Bleu',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 34,
        level: '2',
        fly: 12,
        passif: [
            {
                name: 'À la mort.',
                description: 'Inflige $dice:1d12$ dégâts en retour (ignore l’armure métallique).',
            },
        ],
        action: [
            {
                name: 'Morsure Foudroyante.',
                description: '$dice:1d12+5$ (ignore l’armure métallique).',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'griffon',
        name: 'Griffon',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 50,
        fly: 12,
        level: '4',
        passif: [
        ],
        action: [
            {
                name: 'Serres. ',
                description: '$dice:2d6+10$, en cas de touche : $status:grappled$ (Évasion DD 14)',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    statusbar: GRAPPLED,
                },
            },
            {
                name: 'Vol & Lâcher.' ,
                description: '(Une cible $status:grappled$) Vole 12 vers le haut et lâche la cible ($dice:6d6$ dégâts de chute).',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'gnoll_packleader',
        name: 'Chef de Meute Gnoll',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 39,
        armor: ARMOR_TYPE.MEDIUM,
        level: '4',
        passif: [
            {
                name: 'Frénésie.',
                description: '$advantage:+1$ contre les créatures $status:bloodied$.',
            },
        ],
        action: [
            {
                name: 'Aboyer des Ordres.',
                description: '2 alliés peuvent se déplacer.',
            },
            {
                name: 'PUIS :',
                description: '',
            },
            {
                name: 'Ravage (3×).',
                description: '$dice:1d10$.',
                advantage: {
                    name: 'Frénésie.',
                    description: '1 Avantage contre les créatures Ensanglanté.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'troll',
        name: 'Troll',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 100,
        armor: ARMOR_TYPE.MEDIUM,
        level: '10',
        speed: 8,
        size: SIZE_TYPE.LARGE,
        passif: [
            {
                name: 'Régénération.',
                description: 'Ne meurt pas à 0 PV. Seuls le feu, les dégâts radiants, ou un coup critique alors qu’il est à 0 PV peuvent le tuer.',
            },
        ],
        action: [
            {
                name: '',
                description: 'Choisissez deux fois :',
            },
            {
                name: '• Griffes.',
                description: '(Portée 2) $dice:1d4+10$. En cas de critique : $status:prone$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: PRONE
                },
            },
            {
                name: '• Morsure.',
                description: '(Sur une créature $status:prone$) $dice:1d4+20$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'bulette',
        name: 'Bulette',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 74,
        armor: ARMOR_TYPE.HEAVY,
        level: '10',
        size: SIZE_TYPE.LARGE,
        passif: [
            {
                name: 'Jaillissement !',
                description: 'Le combat contre une Bulette commence avec le personnage le plus lourd qui doit réussir un JdS de DEX 14, ou bien il est $status:grappled$ (Évasion DD 14) et subit $dice:1d12+20$ dégâts (moitié en cas de réussite).',
            },
        ],
        action: [
            {
                name: 'Entraîner Sous Terre.',
                description: '(Sur une cible $status:grappled$) $dice:2d12$, puis l’entraîne sous terre et creuse pour s’éloigner.',
            },
            {
                name: 'Bond & Morsure.',
                description: '(Si elle n’agrippe personne) bondit de 6 cases, puis attaque pour $dice:1d12+20$. En cas de touche : $status:grappled$',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'hill_giant',
        name: 'Géant des Collines',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 140,
        level: '12',
        speed: 8,
        size: SIZE_TYPE.HUGE,
        passif: [
            {
                name: 'Brute.',
                description: 'En cas de touche : repousse de nombre de cases égal au Dé Primaire.',
            },
        ],
        action: [
            {
                name: 'Écrasement (2×).',
                description: '(Portée 2) $dice:1d6+15$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    message: 'Repousse de nombre de cases égal au Dé Primaire.',
                },
            },
            {
                name: 'Rocher !',
                description: '(Distance 12) $dice:1d6+20$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    message: 'Repousse de nombre de cases égal au Dé Primaire.',
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'roc',
        name: 'Roc',
        type: MONSTER_TYPE.HILL_FIELD,
        hp: 195,
        level: '17',
        fly: 20,
        size: SIZE_TYPE.GARGANTUAN,
        passif: [],
        action: [
            {
                name: 'Happer.',
                description: '(Portée 4, jusqu’à 2 cibles) $dice:3d12+20$. En cas de touche : $status:grappled$ (Évasion DD 18).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED
                },
            },
            {
                name: 'Lâcher & Écraser.',
                description: 'Vole vers le haut de 20 cases, inflige 20 dégâts aux créatures $status:grappled$, puis les relâche ($dice:10d6$ dégâts de chute).',
            },
        ],
    },
    //MORT-VIVANT
    {
        ...defaultMonster,
        id: 'minion_scarab',
        name: 'Sbire Scarabée',
        type: MONSTER_TYPE.UNDEAD,
        minion:true,
        hp: 1,
        level: '1/3',
        passif: [],
        action: [
            {
                name: 'Corne.',
                description: '$dice:1d6$ dégâts.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'skeleton',
        name: 'Squelette',
        type: MONSTER_TYPE.UNDEAD,
        hp: 10,
        level: '1/3',
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Flèche de Tombe.',
                description: '(Distance 8) $dice:1d4+3$ dégâts.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'zombie',
        name: 'Zombie',
        type: MONSTER_TYPE.UNDEAD,
        hp: 15,
        level: '1/2',
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Morsure.',
                description: '$dice:1d4+4$ dégâts. En cas de dégâts : $status:grappled$',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: GRAPPLED
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'Ghoul',
        name: 'Goule',
        type: MONSTER_TYPE.UNDEAD,
        hp: 15,
        level: '1',
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Griffe Nauséabonde.',
                description: '$dice:1d4+8$ dégâts. En cas de dégâts : $status:dazed$',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: DAZED
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'Specter',
        name: 'Spectre',
        type: MONSTER_TYPE.UNDEAD,
        hp: 30,
        fly: 6,
        level: '3',
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Toucher Mortel.',
                description: '$dice:1d4$ dégâts. En cas de dégâts : les PV sont réduits à 0.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    message: 'Les PV sont réduits à 0'
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'ogre_zombie',
        name: 'Ogre Zombie',
        type: MONSTER_TYPE.UNDEAD,
        hp: 46,
        level: '5',
        size: SIZE_TYPE.LARGE,
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Massue Géante (2×).',
                description: '$dice:1d4+8$ dégâts. En cas de crtitique : $status:prone$.',
                effect :{
                    trigger: TRIGGER_TYPE.CRITIC,
                    stauts: PRONE,
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'mummy',
        name: 'Momie',
        type: MONSTER_TYPE.UNDEAD,
        hp: 54,
        level: '6',
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Coup Brutal (2×).',
                description: '$dice:1d4+8$ dégâts. En cas de dégâts : $status:dazed$.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    stauts: DAZED,
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'giant_zombie',
        name: 'Zombie Géant',
        type: MONSTER_TYPE.UNDEAD,
        hp: 73,
        level: '8',
        size: SIZE_TYPE.HUGE,
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Balayage en Décomposition (2×).',
                description: '$dice:1d4+10$ dégâts. En cas de dégâts : repousse d’un nombre de cases égal au Dé Primaire.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    message: 'Repousse d’un nombre de cases égal au Dé Primaire.'
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'wraith',
        name: 'Revenant',
        type: MONSTER_TYPE.UNDEAD,
        hp: 94,
        level: '10',
        fly: 6,
        passif: [passiveUnlivingUndying],
        action: [
            {
                name: 'Déchirure d’Âme (2×).',
                description: '(Distance 8) $dice:1d4+10$ dégâts. En cas de dégâts : inflige 1 Blessure.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    message: 'Inflige 1 Blessure.'
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'mummy_lord',
        name: 'Seigneur Momie',
        type: MONSTER_TYPE.UNDEAD,
        hp: 280,
        level: '21',
        passif: [
            passiveUnlivingUndying,
            {
                name: 'Regard Maudit.',
                description: 'En cas de critique : JdS de INT 20, ou inflige 1 Blessure.'
            }
        ],
        action: [
            {
                name: '• Essaim de Scarabées.',
                description: 'Invoque 10 $summon:minion_scarab:10$ dans une Portée de 6.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    message: 'Inflige 1 Blessure.'
                }
            },
            {
                name: 'Puis',
                description: '',
            },
                        {
                name: '• Coup Brutal (2×).',
                description: '$dice:1d4+20$ dégâts. En cas de dégâts : $status:dazed$.',
                effect :{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: DAZED
                }
            },
        ],
    },
    //CULTISTE ET HORREUR
    {
        ...defaultMonster,
        id: 'cultist',
        name: 'Cultiste',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 28,
        level: '1',
        passif: [passiveFanaticalZeal],
        action: [
            {
                name: 'Oblation de Sang !',
                description: 'Si indemne, s’inflige 2 dégâts. Les ennemis adjacents subissent $status:despair$.'
            },
            {
                name: 'Lame Terrifiante.',
                description: '$dice:1d6+6$ dégâts.',
                advantage: {
                    name: 'Zèle Fanatique.',
                    description: 'Tant que vous n’êtes pas à vos PV max, vous avez 1 Avantage.',
                },
                effect :{
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: DESPAIR
                }
            },
            {
                name: 'Ébullition de Sang.',
                description: '(Distance 12, cible $status:bloodied$) $dice:3d6+6$ dégâts.',
                advantage: {
                    name: 'Zèle Fanatique.',
                    description: 'Tant que vous n’êtes pas à vos PV max, vous avez 1 Avantage.',
                },
                effect :{
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: DESPAIR
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'fanatic',
        name: 'Fanatique',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 41,
        level: '3',
        passif: [passiveFanaticalZeal],
        action: [
            {
                name: 'Oblation de Sang !',
                description: 'Si indemne, s’inflige 2 dégâts. Les ennemis adjacents subissent $status:despair$.'
            },
            {
                name: 'Murmures de Folie.',
                description: ' Jet opposé de FOR ou $status:grappled$ (peut s’échapper par un jet ou tout dégât radiant). Si réussi, inflige $dice:3d6+6$ dégâts psychiques (ne peut pas être Défendu ni Interposé).',
                advantage: {
                    name: 'Zèle Fanatique.',
                    description: 'Tant que vous n’êtes pas à vos PV max, vous avez 1 Avantage.',
                },
                effect :{
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: DESPAIR
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'doomsayer',
        name: 'Prophète de Malheur',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 58,
        level: '5',
        passif: [passiveFanaticalZeal],
        action: [
            {
                name: 'Chant Fiévreux.',
                description: '(Concentration) Réduit tous les dégâts infligés à vos alliés qui peuvent vous entendre à 1.'
            },
            {
                name: 'Délires Extatiques.',
                description: ' Inflige $dice:2d6$ dégâts psychiques à tous les ennemis qui peuvent vous entendre.',
                advantage: {
                    name: 'Zèle Fanatique.',
                    description: 'Tant que vous n’êtes pas à vos PV max, vous avez 1 Avantage.',
                },
                effect :{
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: DESPAIR
                }
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'stenchling',
        name: 'Pestelingue',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 18,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [
            {
                name:'Nuage Putride.',
                description:'À la mort : $dice:2d6$ dégâts de poison aux ennemis dans une Portée 2.'
            }
        ],
        action: [
            {
                name: 'Morsure.',
                description: '$dice:2d6$ dégâts.'
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'spiny_fiend',
        name: 'Démon Épineux',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 49,
        level: '4',
        passif: [
            {
                name:'Épines.',
                description:'Les attaquants au corps à corps subissent 3 dégâts.'
            }
        ],
        action: [
            {
                name: 'Griffes (2×).',
                description: '$dice:1d6+6$ dégâts.'
            },
            {
                name: 'Lancer d’Épine.',
                description: '(Distance 12) $dice:1d6+6$ dégâts.'
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'glabrezu',
        name: 'Glabrezu',
        type: MONSTER_TYPE.CULTISTS_HORRORS,
        hp: 110,
        armor: ARMOR_TYPE.HEAVY,
        size: SIZE_TYPE.LARGE,
        level: '14',
        passif: [],
        action: [
            {
                name: ' Griffe du Destin (2×).',
                description: '(Portée 2) $dice:3d6+10$. En cas de dégâts : $status:grappled$ (Évasion DD 17). Si la même créature est agrippée par les deux griffes du glabrezu, elle doit s’échapper séparément de chacune.',
                effect:{
                    trigger: TRIGGER_TYPE.DAMAGE,
                    status: GRAPPLED
                }
            },
            {
                name: 'Déchirer en Morceaux.',
                description: '(Sur une créature $status:grappled$ par les deux griffes du glabrezu) Inflige 50 dégâts inévitables. Si la cible est à 0 PV : Jds de FOR 17 ou elle est déchirée en deux, $status:dead$ sur-le-champ.'
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
                name: "S'accrocher.",
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
                name: "S'accrocher.",
                description: '$dice:1d12+10$. En cas de touche: $status:latch_on$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: LATCH_ON,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'tiny_mimic',
        name: 'Mimic Minuscule',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        size: SIZE_TYPE.TINY,
        hp: 28,
        level: '1',
        passif: [passiveMimicsAmbusher, passiveMimicsSticky],
        action: [
            {
                name: 'Pseudopode.',
                description: '$dice:1d4$. En cas de touche: $status:grappled$ (Évasion DD 9).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Morsure.',
                description: '(Une créature $status:grappled$) $dice:1d12$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'small_mimic',
        name: 'Mimic Petite',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        size: SIZE_TYPE.SMALL,
        hp: 41,
        level: '2',
        passif: [passiveMimicsAmbusher, passiveMimicsSticky],
        action: [
            {
                name: 'Pseudopode.',
                description: '$dice:1d6$. En cas de touche: $status:grappled$ (Évasion DD 11).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Morsure.',
                description: '(Une créature $status:grappled$) $dice:1d20$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'medium_mimic',
        name: 'Mimic Moyenne',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 79,
        level: '6',
        passif: [passiveMimicsAmbusher, passiveMimicsSticky],
        action: [
            {
                name: 'Pseudopode.',
                description: '$dice:1d8$. En cas de touche: $status:grappled$ (Évasion DD 13).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: 'Morsure.',
                description: '(Une créature $status:grappled$) $dice:2d20$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'minion_ooze',
        name: 'Sbire Vase',
        minion: true,
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 1,
        level: '1/3',
        passif: [],
        action: [
            {
                name: 'Toucher Acide.',
                description: '$dice:1d6$. En cas de coup : $status:digested$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DIGESTED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'gray_ooze',
        name: 'Vase Grise',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 28,
        level: '1',
        passif: [
            {
                name: 'Contact digestif.',
                description: 'Le contact avec une vase inflige $status:digested$.',
            },
            {
                name: 'Visqueux.',
                description:
                    'En cas de coup critique ou lorsqu’elle subit des dégâts tranchants : invoque 2 $summon:minion_ooze:2$.',
            },
        ],
        action: [
            {
                name: 'Toucher Acide (2x).',
                description: '$dice:1d6+2$. En cas de coup : $status:digested$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DIGESTED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'ochre_jelly',
        name: 'Vase Ocre',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 52,
        level: '4',
        size: SIZE_TYPE.LARGE,
        passif: [
            {
                name: 'Contact digestif.',
                description: 'Le contact avec une vase inflige $status:digested$.',
            },
            {
                name: 'Visqueux.',
                description:
                    'En cas de coup critique ou lorsqu’elle subit des dégâts tranchants : invoque 3 $summon:minion_ooze:3$.',
            },
        ],
        action: [
            {
                name: 'Toucher Acide (2x).',
                description: '$dice:1d6+3$. En cas de coup : $status:digested$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DIGESTED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'black_pudding',
        name: 'Vase Noir',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 90,
        level: '8',
        size: SIZE_TYPE.LARGE,
        passif: [
            {
                name: 'Contact digestif.',
                description: 'Le contact avec une vase inflige $status:digested$.',
            },
            {
                name: 'Visqueux.',
                description:
                    'En cas de coup critique ou lorsqu’elle subit des dégâts tranchants : invoque 5 $summon:minion_ooze:5$.',
            },
        ],
        action: [
            {
                name: 'Toucher Acide (2x).',
                description: '(Portée 2) $dice:1d6+5$. En cas de coup : $status:digested$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DIGESTED,
                },
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'elder_ooze',
        name: 'Vase Vieille',
        type: MONSTER_TYPE.DUNGEON_DENIZEN,
        hp: 150,
        level: '12',
        size: SIZE_TYPE.HUGE,
        passif: [
            {
                name: 'Contact digestif.',
                description: 'Le contact avec une vase inflige $status:digested$.',
            },
            {
                name: 'Visqueux.',
                description:
                    'En cas de coup critique ou lorsqu’elle subit des dégâts tranchants : invoque 6 $summon:minion_ooze:6$.',
            },
        ],
        action: [
            {
                name: 'Toucher Acide (3x).',
                description: '(Portée 3) $dice:1d6+6$. En cas de coup : $status:digested$.',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: DIGESTED,
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
        name: 'Basilic',
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
    {
        ...defaultMonster,
        id: 'minion_briarbanes',
        name: 'Sbire Ombre-Ronce',
        type: MONSTER_TYPE.FOREST_DENIZEN,
        hp: 1,
        minion: true,
        level: '1/4',
        size: SIZE_TYPE.SMALL,
        passif: [],
        action: [
            {
                name: 'Graine de ronces.',
                description: '$dice:1d4$.',
            },
        ],
    },
    {
        ...defaultMonster,
        id: 'seedling',
        name: 'Pousse',
        type: MONSTER_TYPE.FOREST_DENIZEN,
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
        type: MONSTER_TYPE.FOREST_DENIZEN,
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
        type: MONSTER_TYPE.FOREST_DENIZEN,
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
        type: MONSTER_TYPE.FOREST_DENIZEN,
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
        type: MONSTER_TYPE.FOREST_DENIZEN,
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
        initStatus: [INVISIBLE],
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
                    'Les Troglodytes dans une Portée de 12 lancent des d12 au lieu de d6. Lorsqu’elle subit des dégâts, inflige $dice:1d12$ de dégâts psychiques imparables aux ennemis dans une portée de 12.',
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
                description: "Après chaque tour d'un héro, Mouvement de 6 puis choissisez un :",
            },
            {
                name: '• Massacre brutal.',
                description:
                    'Inflige $dice:2d6+3$ dégâts, la cible est $status:grappled$ (Évasion DD 10).',
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: '• Casse-crânes.',
                description:
                    'Utilise une créature $status:grappled$ comme arme contre une autre créature. Les deux subissent $dice:2d6+3$ dégâts, et l’agrippement prend fin.',
            },
        ],
        bloodied: {
            description: 'À $hp$, ses attaques utilisent des d8 au lieu des d6.',
            hp: '37 PV',
            modifiers: {
                replaceDice: 8,
            },
        },
        last_stand: {
            description:
                'Krogg est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. Il bénéficie d’une armure lourde.',
            hp: 20,
            modifiers: {
                overrideArmor: ARMOR_TYPE.HEAVY,
            },
        },
    },
    {
        ...defaultMonster,
        id: 'grimbeak',
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
                    "Traitez n'import qu'elle dé comme un Dé Primaire. Sur un critique: $status:prone$.",
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
                    "Tous les ennemis dans une Portée de 12 subissent $dice:2d6$ dégâts (ignorent l'armure). JdS de VOL 11 ou deviennent $status:frightened$ pendant 1 round.",
                use: 1,
                reload: false,
                AOE:true,
            },
            {
                name: '• Déchirer & Lacérer.',
                description: '$dice:2d6+10$.',
                brutal:true,
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: PRONE,
                },
            },
            {
                name: '• Bec.',
                description: 'Déplacement de 8 et $dice:2d6$.',
                brutal:true,
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: PRONE,
                },
            },
        ],
        bloodied: {
            description: 'À $hp$, Hurlement Sauvage se recharge.',
            hp: '50 PV',
            modifiers: {
                reloadAction: '• Hurlement Sauvage.',
            },
        },
        last_stand: {
            description:
                "Grimbeak est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. Jusqu'à ce moment-là, ses attaques utilisent des d10 au lieu des d6.",
            hp: 30,
            modifiers: {
                replaceDice: 10,
            },
        },
    },
    {
        ...defaultMonster,
        id: 'thorn_quickblade',
        name: 'Thorn Lamevive',
        type: MONSTER_TYPE.BANDIT,
        legendary: true,
        hp: 125,
        armor: ARMOR_TYPE.MEDIUM,
        level: '4',
        save: 'DEX+',
        passif: [
            {
                name: 'Riposte.',
                description:
                    "Lorsqu’il subit un coup critique, effectue immédiatement une attaque Perce-Cœur ou Trait-tempête en retour.",
            },
        ],
        action: [
            {
                name: 'ACTIONS.',
                description: "Après chaque tour d'un héro, choissisez un :",
            },
            {
                name: '• Trait-tempête (Arbalète).',
                description: 'Mouvement de 4, inflige $dice:4d4+10$ dégâts (Distance 8).',
            },
            {
                name: '• Perce-Cœur (Rapière).',
                description: 'Mouvement de 8, inflige $dice:2d4+3$ dégâts. En cas de critique : $status:dazed$.',
                effect: {
                    trigger: TRIGGER_TYPE.CRITIC,
                    status: DAZED,
                },
            }
        ],
        bloodied: {
            description: 'À $hp$, Thorn devient immédiatement $status:invisible$ (jusqu’à la fin de son prochain tour), puis se déplace de 8 cases, sans provoquer d’attaques d’opportunité.',
            hp: '62 PV',
            modifiers: {
                newStatus: INVISIBLE,
            },
        },
        last_stand: {
            description:
                "Thorn est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. Jusqu'à ce moment-là, il Riposte à chaque fois qu’il est touché (1/Tour).",
            hp: 30,
            modifiers: {
                overridePassive: { 
                    oldPassifName: 'Riposte.',
                    newPassifName: 'Riposte (1/Tour).',
                    newPassifDescription: 'Lorsqu’il subit un coup, effectue immédiatement une attaque Perce-Cœur ou Trait-tempête en retour.',

                } 
            },
        },
    },
    {
        ...defaultMonster,
        id: 'ravager_of_the_lowlands',
        name: 'Ravageur des Terres Basses',
        type: MONSTER_TYPE.ANIMAL,
        legendary: true,
        hp: 130,
        armor: ARMOR_TYPE.MEDIUM,
        level: '5',
        save: 'FOR+, DEX+',
        passif: [
            {
                name: 'Instinct Sauvage.',
                description: 'Chaque fois que le Ravageur subit un coup critique, il peut voler de 10 cases.',
            },
        ],
        action: [
            {
                name: 'ACTIONS.',
                description: "Après chaque tour d'un héro, choissisez un :",
            },
            {
                name: '• Dard Venimeux.',
                description: 'Portée 3, inflige $dice:5d12$ dégâts.',
                use:1
            },
            {
                name: '• Ravage.',
                description: '$dice:1d12+20$ dégâts.',
            },
            {
                name: '• Griffe.',
                description: 'Vole de 10, puis inflige $dice:1d12+6$ dégâts.',
            }
        ],
        bloodied: {
            description: 'À $hp$, son Dard Venimeux se recharge.',
            hp: '65 PV'
        },
        last_stand: {
            description:
                "Le Ravageur est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. Jusqu'à ce moment-là, la première fois qu’il subit des dégâts à chaque tour, il utilise Vol & Griffe.",
            hp: 40,
            modifiers: {
                overridePassive: {
                    oldPassifName: 'Instinct Sauvage.',
                    newPassifName: 'Instinct Sauvage (1/Tour).',
                    newPassifDescription: 'Chaque fois que le Ravageur subit un coup, il utilise Griffe.',
                },
            },
        },
    },
    {
        ...defaultMonster,
        id: 'greenthumb',
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
                description: 'Invoque 1 $summon:minion_briarbanes:4$ par héros.',
            },
            {
                name: '• Enracinement.',
                description:
                    'Choisissez la moitié des héros. Ils doivent réussir un JdS de DEX 11 ou subir $dice:2d4$ et être $status:restrained$ par des lianes épineuses (Évasion : JdS de FOR ou DEX 11, ou recevoir des dégâts tranchants ou de feu).',
                AOE:true
            },
            {
                name: '• Tir de ronces.',
                description: '(Distance 10) $dice:5d4+4$.',
            },
        ],
        bloodied: {
            description:
                'À $hp$, Greenthumb gagne une écorce magique qui lui confère une Armure Lourde.',
            hp: '50 PV',
            modifiers: {
                overrideArmor: ARMOR_TYPE.HEAVY,
            },
        },
        last_stand: {
            description:
                'Greenthumb est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. En attendant, il agit deux fois par tour.',
            hp: 30,
            modifiers: {
                overrideActions:
                    "Après chaque tour d'un héro, mouvement de 6 puis choissisez deux :",
            },
        },
    },
    {
        ...defaultMonster,
        id: 'azriel',
        name: 'Azriel',
        type: MONSTER_TYPE.DEVIL,
        hp: 135,
        level: '6',
        legendary: true,
        armor: ARMOR_TYPE.HEAVY,
        save: 'TOUT+',
        passif: [
            {
                name: 'DOULEUR !',
                description:
                    'Les coups critiques contre Azriel sont Vicieux et ils infligent des dégâts égaux aux dés de critique à l’attaquant.',
            },
        ],
        action: [
            {
                name: 'ACTIONS:',
                description: 'Après le tour de chaque héros, choisissez-en un:',
            },
            {
                name: '• Fouet Crépitant.',
                description:
                    "Mouvement 6. (Portée 6) Inflige  $dice:2d12$. Sur un coup touche $status:grappled$ et tirée au contact d’Azriel (Évasion DC 13 FOR, DEX ou jusqu'à ce qu'il réutilise le fouet).",
                effect: {
                    trigger: TRIGGER_TYPE.HIT,
                    status: GRAPPLED,
                },
            },
            {
                name: '• Épée du Destin.',
                description:
                    'Inflige $dice:3d12+4$ dégâts de feu à toutes les créatures dans une Portée de 2.',
            },
        ],
        bloodied: {
            description: 'À $hp$, Azriel peut utiliser Fouet Crépitant 2x par tour.',
            hp: '67 PV',
            modifiers: {
                overrideAction: {
                    name: '• Fouet Crépitant.',
                    newName: '• Fouet Crépitant (2x).',
                },
            },
        },
        last_stand: {
            description:
                'Azriel est mourant ! S’il subit $hp$ dégâts supplémentaires, il meurt. En attendant, TOUT les coups contre lui sont critique.',
            hp: 60,
            modifiers: {
                addPassive: {
                    name: 'OUI, PLUS DE DOULEUR.',
                    description: 'Tout les coups contre Azriel sont des critiques.',
                },
            },
        },
    },
];
