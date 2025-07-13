export const SIZE_TYPE = {
    TINY: { id: 'tiny', label: 'Très Petit' },
    SMALL: { id: 'small', label: 'Petit' },
    MEDIUM: { id: null, label: 'Moyenne' },
    LARGE: { id: 'large', label: 'Grand' },
    HUGE: { id: 'huge', label: 'Très Grand' },
};

export const ARMOR_TYPE = {
    NONE: { id: null, label: 'Aucune' },
    MEDIUM: { id: 'M', label: 'M' },
    HEAVY: { id: 'H', label: 'L' },
};

// Passifs réutilisables
const passifHahaRate = {
    name: 'Haha, raté !',
    description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
};
const passifNooooo = {
    name: 'Nooooo !',
    description:
        'Quand un allié à 2 cases ou moins meurt, effectuez une attaque gratuite immédiatement.',
};
const passifEcorceArrachee = {
    name: 'Écorce Arrachée.',
    description: 'Chaque dégât subit fait baisser l’armure d’un cran : Lourd » Moyen » Aucune.',
};

// Tableau des types de monstres
export const MONSTER_TYPE = {
    GOBELIN: { id: 'gobelin', label: 'Gobelins' },
    KOBOLD: { id: 'kobold', label: 'Kobolds' },
    HOBGOBLIN: { id: 'hobgoblin', label: 'Hobgoblins' },
    ARAIGNEE: { id: 'araignee', label: 'Araignées' },
    PLANTE: { id: 'plante', label: 'Plantes' },
    ANIMAL: { id: 'animal', label: 'Animaux' },
    SORCIER: { id: 'sorcier', label: 'Sorcier' },
};

// Valeurs par défaut pour chaque monstre
const defaultMonster = {
    armor: ARMOR_TYPE.NONE,
    speed: null,
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
    {
        ...defaultMonster,
        name: 'Gobelin',
        type: MONSTER_TYPE.GOBELIN,
        hp: 15,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [passifHahaRate],
        action: [
            {
                name: 'Planter.',
                description: '$dice.',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
            {
                name: 'Tirer.',
                description: '(Portée 8) $dice.',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Maître Gobelin',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        armor: ARMOR_TYPE.MEDIUM,
        level: '2',
        size: SIZE_TYPE.SMALL,
        passif: [
            passifHahaRate,
            {
                name: 'Bouclier de viande.',
                description: "Peut forcer un autre gobelin à s'Interposer pour Lui.",
            },
        ],
        action: [
            {
                name: 'Planter.',
                description: '$dice.',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
            {
                name: 'Tirer.',
                description: '(Portée 8) $dice.',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
            {
                name: 'Ramenez-vous ! ',
                description: 'Appelle un sbire gobelin au combat.',
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Kobold',
        type: MONSTER_TYPE.KOBOLD,
        hp: 12,
        level: '1/3',
        size: SIZE_TYPE.SMALL,
        passif: [passifNooooo],
        action: [
            {
                name: 'Coup de dague',
                description: '$dice.',
                dice: { numberDice: 1, valueDice: 4, bonus: 2 },
            },
            {
                name: 'Fronde',
                description: '(Portée 8) $dice.',
                dice: { numberDice: 1, valueDice: 4, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Kobold Sournois',
        type: MONSTER_TYPE.KOBOLD,
        hp: 16,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [
            passifNooooo,
            {
                name: 'Revanche !',
                description:
                    "Quand un allié meurt, vous pouvez vous déplacer jusqu'à 6 cases avant d'utiliser votre capacité Nooooo !",
            },
        ],
        action: [
            {
                name: 'Coup de dague',
                description: '$dice.',
                dice: { numberDice: 1, valueDice: 4, bonus: 2 },
            },
            {
                name: 'Fronde',
                description: '(Portée 8) $dice.',
                dice: { numberDice: 1, valueDice: 4, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Kobold Trappeur',
        type: MONSTER_TYPE.KOBOLD,
        hp: 26,
        level: '1',
        size: SIZE_TYPE.SMALL,
        passif: [
            passifNooooo,
            {
                name: 'Pièges !',
                description:
                    'Quand un ennemi se déplace adjacent à vous ou un allié, il déclenche un de vos pièges ! (1 fois par rencontre chacun).',
            },
        ],
        action: [
            {
                name: 'Lancer de scorpion (2×)',
                description: '(Portée 8) $dice.',
                dice: { numberDice: 1, valueDice: 4, bonus: 2 },
            },
            {
                name: 'Filet caché',
                description: 'Entravé (évasion DD 10).',
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Bugbear',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        level: '2',
        armor: ARMOR_TYPE.MEDIUM,
        speed: 2,
        action: [
            {
                name: 'Cleave.',
                description: '$dice.',
                dice: { numberDice: 2, valueDice: 6, bonus: 4 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Soldat Hobgoblin',
        type: MONSTER_TYPE.HOBGOBLIN,
        hp: 11,
        level: '1/2',
        armor: ARMOR_TYPE.MEDIUM,
        passif: [
            {
                name: 'Ichor infernal.',
                description: 'À la mort, les créatures adjacentes subissent 1 dégâts de feu.',
            },
        ],
        action: [
            {
                name: 'Fléau de feu.',
                description:
                    '$dice dégâts de feu et une cible adjacente à la 1er subit 2 dégâts de feu.',
                dice: { numberDice: 1, valueDice: 8, bonus: 0 },
            },
            {
                name: 'Tambour du bouclier.',
                description: '(Porté 3) JdS de VOL 10 ou Provoqué pendant 1 tour.',
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Gobelin Minion',
        type: MONSTER_TYPE.GOBELIN,
        hp: 1,
        level: '1/4',
        size: SIZE_TYPE.SMALL,
        minion: true,
        passif: [passifHahaRate],
        action: [
            {
                name: 'Planter.',
                description: '$dice.',
                dice: { numberDice: 1, valueDice: 6, bonus: 0 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Gobelin Monteur De Rat',
        type: MONSTER_TYPE.GOBELIN,
        hp: 30,
        level: '2',
        size: SIZE_TYPE.LARGE,
        speed: 10,
        passif: [
            passifHahaRate,
            {
                name: 'CHAAARGE!',
                description:
                    "Si vous vous déplacez d'au moins 4 cases en ligne droite, effectuez une attaque avec avantage.",
            },
        ],
        action: [
            {
                name: 'Mordre & Planter (x2).',
                description: '$dice. Sur un critique: A terre.',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Araignée Géante',
        type: MONSTER_TYPE.ARAIGNEE,
        hp: 27,
        level: '2',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        action: [
            {
                name: 'Lancer de toile.',
                description:
                    '(Portée 6) $dice. En cas de coup réussi : Entravé (évasion DD 12, ou dégâts tranchants/feu).',
                dice: { numberDice: 1, valueDice: 8, bonus: 2 },
            },
            {
                name: 'Morsure.',
                description:
                    '(Cible entravée) $dice, Empoisonné (les soins magiques prennent fin).',
                dice: { numberDice: 2, valueDice: 8, bonus: 4 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Brise-racines Géante',
        type: MONSTER_TYPE.PLANTE,
        hp: 50,
        level: '5',
        size: SIZE_TYPE.LARGE,
        armor: ARMOR_TYPE.MEDIUM,
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Coup écrasant.',
                description: '$dice. En cas de critique : repousse de 2 cases.',
                dice: { numberDice: 3, valueDice: 6, bonus: 6 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Pousse',
        type: MONSTER_TYPE.PLANTE,
        hp: 8,
        level: '1/2',
        size: SIZE_TYPE.SMALL,
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Graine de ronces.',
                description: '(Portée 6) $dice.',
                dice: { numberDice: 2, valueDice: 6, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Gousse Acide',
        type: MONSTER_TYPE.PLANTE,
        hp: 8,
        level: '1',
        size: SIZE_TYPE.SMALL,
        passif: [
            passifEcorceArrachee,
            {
                name: 'Éruption caustique.',
                description: 'À la mort : $dice d’acide à TOUTES les créatures adjacentes.',
                dice: { numberDice: 4, valueDice: 6, bonus: 0 },
            },
        ],
        action: [
            {
                name: 'Attraper.',
                description: 'JdS de DEX 12 ou Aggripé.',
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Enchevêtreur',
        type: MONSTER_TYPE.PLANTE,
        hp: 20,
        level: '2',
        passif: [passifEcorceArrachee],
        action: [
            {
                name: 'Enchevêtrement (2×).',
                description:
                    '(Portée 6) $dice. En cas de coup réussi : Aggripé (évasion DD 12, ou tout dégât de feu ou tranchant).',
                dice: { numberDice: 1, valueDice: 6, bonus: 2 },
            },
        ],
    },
    {
        ...defaultMonster,
        name: 'Treant',
        type: MONSTER_TYPE.PLANTE,
        hp: 170,
        level: '14',
        size: SIZE_TYPE.HUGE,
        armor: ARMOR_TYPE.HEAVY,
        passif: [
            passifEcorceArrachee,
            {
                name: 'Enragé.',
                description: "Attaque avec avantage quand il n'a plus d'armure.",
            },
        ],
        action: [
            {
                name: 'Choisissez deux fois :',
                description: '',
            },
            {
                name: '• Coup de masse.',
                description: '(Portée 3) $dice. En cas de dégâts : Mise à terre.',
                dice: { numberDice: 2, valueDice: 6, bonus: 10 },
            },
            {
                name: '• Piétinement.',
                description: '(Cible entravée) $dice.',
                dice: { numberDice: 2, valueDice: 6, bonus: 20 },
            },
        ],
    },
    {
        ...defaultMonster,
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
                    'Se déplace de 6. Inflige $dice dégâts, la cible est agrippée (évasion DD 10).',
                dice: { numberDice: 2, valueDice: 6, bonus: 3 },
            },
            {
                name: '• Casse-crânes.',
                description:
                    'Se déplace de 6. Utilise une créature agrippée comme arme contre une autre créature. Les deux subissent $dice dégâts, et l’agrippement prend fin.',
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
                description: '(Portée 10) $dice.',
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
