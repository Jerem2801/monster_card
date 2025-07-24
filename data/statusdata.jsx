export const BLINDED = {
    id: 'blinded',
    label: 'Aveuglé',
    description:
        "Ne peut pas voir. Les attaques contre vous ont l'avantage, vos attaques ont le désavantage.",
    path: '/status/blinded.png',
    disadvantage: {
        name: 'Aveuglé.',
        description: 'Vos attaques ont 1 Désavantage.',
    }
};

export const CHARMED = {
    id: 'charmed',
    label: 'Charmé',
    description:
        'Considère le charmeur comme un allié. Il a l’avantage sur les interactions sociales avec vous.',
    path: '/status/charmed.png',
};

export const DAZED = {
    id: 'dazed',
    label: 'Étourdi',
    description: 'Perd 1 Action.',
    path: '/status/dazed.png',
};

export const FRIGHTENED = {
    id: 'frightened',
    label: 'Effrayé',
    description: 'Désavantage près de la source de peur. Vitesse réduite en s’en approchant.',
    path: '/status/frightened.png',
    disadvantage: {
        name: 'Effrayé.',
        description: '1 Désavantage près de la source de peur.',
    }
};

export const GRAPPLED = {
    id: 'grappled',
    label: 'Agrippé',
    description: 'Ne peut pas bouger. Les attaques contre vous ont l’avantage.',
    path: '/status/grappled.png',
};

export const RESTRAINED = {
    id: 'restrained',
    label: 'Immobilisé',
    description: 'Ne peut pas bouger. Les attaques contre vous ont l’avantage.',
    path: '/status/restrained.png',
};

export const HAMPERED = {
    id: 'hampered',
    label: 'Entravé',
    description: 'Toute créature dont les actions ou les déplacements sont réduits.',
    path: '/status/hampered.png',
};

export const INCAPACITATED = {
    id: 'incapacitated',
    label: 'Incapacité',
    description:
        'Ne peut rien faire. Les attaques contre vous ont l’avantage. Les attaques de mêlée qui touchent sont des critiques.',
    path: '/status/incapacitated.png',
};

export const INVISIBLE = {
    id: 'invisible',
    label: 'Invisible',
    description:
        'Impossible à voir. Vos attaques ont l’avantage, celles contre vous ont le désavantage.',
    path: '/status/invisible.png',
    advantage: {
        name: 'Invisible.',
        description: 'Vos attaques ont 1 Avantage.',
    }
};

export const PETRIFIED = {
    id: 'petrified',
    label: 'Pétrifié',
    description:
        'Ne peut rien faire. Devient une pierre, immunisé à la plupart des dégâts sauf outils puissants/explosifs.',
    path: '/status/petrified.png',
};

export const LATCH_ON = {
    id: 'latch_on',
    label: 'Accroché',
    description:
        'Vous vous déplacez en même temps que votre cible jusqu’à ce que l’un de vous deux meure. Vos attaques ne peuvent ni rater, ni être parées ou interceptées. Les attaques qui vous manquent infligent des dégâts à votre cible à la place.',
    path: '/status/grappled.png',
};

export const POISONED = {
    id: 'poisoned',
    label: 'Empoisonné',
    description: 'Désavantage à tous les jets.',
    path: '/status/poisoned.png',
    disadvantage: {
        name: 'Empoisonné.',
        description: '1 Désavantage à tous les jets.',
    }
};

export const PRONE = {
    id: 'prone',
    label: 'À terre',
    description:
        'Se déplacer coûte deux fois plus, et vous avez un désavantage aux attaques. Les attaques de mêlée contre vous ont l’avantage et les attaques à distance ont un désavantage. Dépensez 3 cases de déplacement pour vous relever.',
    path: '/status/prone.png',
    disadvantage: {
        name: 'À terre.',
        description: 'Vos attaques ont 1 Désavantage.',
    }
};

export const SLOWED = {
    id: 'slowed',
    label: 'Ralenti',
    description: 'Vitesse réduite de moitié au prochain tour.',
    path: '/status/slowed.png',
};

export const SILENCED = {
    id: 'silenced',
    label: 'Réduit au silence',
    description:
        'Ne peut pas lancer de sorts ni utiliser d’autres capacités nécessitant la parole (ex. : Ordres du commandant).',
    path: '/status/silence.png',
};

export const CONFUSED = {
    id: 'confused',
    label: 'Confus',
    description: 'Le MJ choisit votre prochaine action.',
    path: '/status/confused.png',
};

export const SWALLOWED = {
    id: 'swallowed',
    label: 'Avalé.',
    description:
        'Vous subissez 20 dégâts au début de votre tour. Vos attaques ne peuvent pas rater et ignorent l’armure.',
    path: '/status/swallowed.png',
};

export const TAUNTED = {
    id: 'taunted',
    label: 'Provoqué',
    description: 'Désavantage aux attaques sauf contre le dernier à vous avoir nargué.',
    emoji: '😠',
};

export const DIGESTED = {
    id: 'digested',
    label: 'Digéré',
    description: 'Inflige X (Bonus de dégâts) dégâts supplémentaires pour chaque fois que la cible a été Digéré.',
    path: '/status/swallowed.png',
};

export const SMOLDERING = {
    id: 'smoldering',
    label: 'Fumant',
    description: 'Vous êtes Fumant.',
    path: '/status/smoldering.png',
};


// États spéciaux
export const BLOODIED = {
    id: 'bloodied',
    label: 'Ensanglanté',
    description: 'À la moitié des PV ou moins.',
    path: '/status/bloodied.png',
};

export const DEAD = {
    id: 'dead',
    label: 'Mort',
    description: 'Le monstre est mort.',
    path: '/status/dead.png',
};

export const DEADLY = {
    id: 'deadly',
    label: 'Mourrant',
    description: 'Le monstre est mourrant.',
    path: '/status/dying.png',
};

export const STATUSES = {
    BLINDED,
    CHARMED,
    DAZED,
    FRIGHTENED,
    GRAPPLED,
    RESTRAINED,
    INCAPACITATED,
    HAMPERED,
    INVISIBLE,
    PETRIFIED,
    LATCH_ON,
    POISONED,
    CONFUSED,
    DIGESTED,
    SMOLDERING,
    SWALLOWED,
    PRONE,
    SILENCED,
    SLOWED,
    TAUNTED,
    BLOODIED,
    DEAD,
    DEADLY,
};

export const STATUSES_TO_SHOW = [
    BLINDED,
    CHARMED,
    DAZED,
    FRIGHTENED,
    GRAPPLED,
    RESTRAINED,
    INCAPACITATED,
    SMOLDERING,
    INVISIBLE,
    PETRIFIED,
    POISONED,
    PRONE,
    SLOWED,
];
