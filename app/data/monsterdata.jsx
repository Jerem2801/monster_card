export const dataMonsters =[
  {
    name: "Gobelin",
    hp: 15,
    level: "1/2, Petit",
    passif: [
      {
        name: "Haha, raté !",
        description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
      }
    ],
    action : [
      {
      name: "Planter.",
      description : "$dice.",
      dice : {
        numberDice: 1,
        valueDice: 6,
        bonus: 2
        }
      }
    ]
  },
  {
    name: "Kobold",
    hp: 12,
    level: "1/3, Petit",
    passif: [{
        name: "Nooooo !",
        description: "Quand un allié à 2 cases ou moins meurt, effectuez une attaque gratuite immédiatement."
      }
    ],
    action: [
      {
        name: "Coup de dague",
        description: "$dice.",
        dice: {
          numberDice: 1,
          valueDice: 4,
          bonus: 2
        }
      },
      {
        name: "Fronde",
        description : "$dice (Portée 8).",
        dice: {
          numberDice: 1,
          valueDice: 4,
          bonus: 2
        }
      }
    ]
  },
  {
    name: "Kobold Sournois",
    hp: 16,
    level: "1/2, Petit",
    passif: [
      {
        name: "Nooooo !",
        description: "Quand un allié à 2 cases ou moins meurt, effectuez une attaque gratuite immédiatement."
      },
      {
        name: "Revanche !",
        description: "Quand un allié meurt, vous pouvez vous déplacer jusqu'à 6 cases avant d'utiliser votre capacité Nooooo !"
      }
    ],
    action: [
      {
        name: "Coup de dague",
        description: "$dice.",
        dice: {
          numberDice: 1,
          valueDice: 4,
          bonus: 2
        }
      },
      {
        name: "Fronde",
        description: "$dice (Portée 8).",
        dice: {
          numberDice: 1,
          valueDice: 4,
          bonus: 2
        }
      }
    ]
  },
  {
    name: "Kobold Trappeur",
    hp: 26,
    level: "1, Petit",
    passif: [
      {
        name: "Nooooo !",
        description: "Quand un allié à 2 cases ou moins meurt, effectuez une attaque gratuite immédiatement."
      },
      {
        name: "Pièges !",
        description: "Quand un ennemi se déplace adjacent à vous ou un allié, il déclenche un de vos pièges ! (1 fois par rencontre chacun)."
      }
    ],
    action: [
      {
        name: "Lancer de scorpion (2×)",
        description: "$dice (Portée 8).",
        dice: {
          numberDice: 1,
          valueDice: 4,
          bonus: 2
        }
      },
      {
        name: "Filet caché",
        description: "Entravé (évasion DD 10)."
      }
    ]
  },
  {
    name: "Bugbear",
    hp: 30,
    level: "2",
    armor : "M",
    speed:2,
    passif: [
    ],
    action :[
      {
      name: "Cleave",
      description : "$dice.",
      dice : {
        numberDice: 2,
        valueDice: 6,
        bonus: 4
        }
      }
    ]
  },
  {
   name: "Soldat Hobgoblin",
   level : "1/2",
   armor : "M",
   hp : 11,
   passif: [
    {
      name: "Ichor infernal.",
      description: "À la mort, les créatures adjacentes subissent 1 dégâts de feu."
    }
  ],
  action: [
    {
      name: "Fléau de feu.",
      description: "$dice dégâts de feu et une cible adjacente à la 1er subit 2 dégâts de feu.",
      dice : {
        numberDice: 1,
        valueDice: 8,
        bonus: 0
        }
    },
    {
      name: "Tambour du bouclier.",
      description: "(Porté 3) JdS de VOL 10 ou Provoqué pendant 1 tour."
    }
  ]
},{
    name: "Gobelin Minion",
    hp: 1,
    level: "1/4, Petit",
    passif: [
      {
        name: "Haha, raté !",
        description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
      }
    ],
    action : [
      {
      name: "Planter.",
      description : "$dice.",
      dice : {
        numberDice: 1,
        valueDice: 6,
        bonus: 0
        }
      }
    ]
  },
  {
    name: "Gobelin Mêlée",
    hp: 15,
    level: "1/3, Petit",
    passif: [
      {
        name: "Haha, raté !",
        description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
      }
    ],
    action : [
      {
      name: "Planter.",
      description : "$dice.",
      dice : {
        numberDice: 1,
        valueDice: 6,
        bonus: 2
        }
      }
    ]
  },
  {
    name: "Gobelin Distance",
    hp: 15,
    level: "1/3, Petit",
    passif: [
      {
        name: "Haha, raté !",
        description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
      }
    ],
    action : [
      {
        name: "Fronde.",
        description : "$dice (Portée 8).",
        dice: {
          numberDice: 1,
          valueDice: 6,
          bonus: 2
        }
      }
    ]
  },
  {
    name: "Gobelin Monteur De Rat",
    hp: 30,
    speed: 10,
    level: "2",
    passif: [
      {
        name: "Haha, raté !",
        description: "À chaque fois qu'une attaque vous rate, infligez 1 dégât psychique en retour.",
      },
    {
        name: "CHAAARGE!",
        description: "Si vous vous déplacez d'au moins 4 cases en ligne droite, effectuez une attaque avec avantage.",
      }
    ],
    action : [
      {
      name: "Mordre & Planter (x2).",
      description : "$dice. Sur un critique: A terre.",
      dice : {
        numberDice: 1,
        valueDice: 6,
        bonus: 2
        }
      }
    ]
  },
  {
    name: "Araignée Géante",
    hp: 27,
    armor: "M",
    level: "2",
    passif: [
    ],
    action : [
      {
      name: "Lancer de toile.",
      description : "$dice (Portée 6). En cas de coup réussi : Entravé (évasion DD 12, ou dégâts tranchants/feu).",
      dice : {
        numberDice: 1,
        valueDice: 8,
        bonus: 2
        }
      },
      {
      name: "Morsure.",
      description : "(Cible entravée) $dice, Empoisonné (les soins magiques prennent fin).",
      dice : {
        numberDice: 2,
        valueDice: 8,
        bonus: 4
        }
      }
    ]
  },
  {
    name: "Brise-racines Géante",
    hp: 50,
    armor: "L",
    level: "5, Grand",
    passif: [
      {
        name: "Écorce Arrachée",
        description: "Chaque dégât subit fait baisser l’armure d’un cran : Lourd » Moyen » Aucune.",
      }
    ],
    action : [
      {
      name: "Coup écrasant.",
      description : "$dice. En cas de critique : repousse de 2 cases.",
      dice : {
        numberDice: 3,
        valueDice: 6,
        bonus: 6
        }
      }
    ]
  },
  {
    name: "Krogg",
    legendary: true,
    hp: 75,
    armor: "M",
    level: "2",
    save: "FOR+,DEX+",
    passif: [
    ],
    action : [
      {
        name: "ACTIONS.",
        description : "Après chaque tour d'un héro, choissisez un :"
      },
      {
        name: "• Massacre brutal.",
        description : "Se déplace de 6. Inflige $dice dégâts, la cible est agrippée (évasion DD 10).",
        dice : {
          numberDice: 2,
          valueDice: 6,
          bonus: 3
        }
      },
      {
      name: "• Casse-crânes.",
      description : "Se déplace de 6. Utilise une créature agrippée comme arme contre une autre créature. Les deux subissent $dice dégâts, et l’agrippement prend fin.",
      dice : {
        numberDice: 2,
        valueDice: 6,
        bonus: 3
        }
      }
    ],
    bloodied :{
      description : "À $hp, les dégâts de Krogg passent à 2d8+3.",
      hp : "35 PV",
      newDice : {
        numberDice: 2,
        valueDice: 8,
        bonus: 3
      }
    },
    lastStand :{
      description : "Krogg est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. D’ici là, il bénéficie d’une armure lourde.",
      hp : 20,
      newArmor : "L"
    }
  },
  {
    name: "Grimbeak",
    legendary: true,
    hp: 100,
    armor: "M",
    level: "3, Grand",
    save: "FOR+",
    passif: [
      {
        name: "Brutal.",
        description: "Traitez n'import qu'elle dé comme un Dé Primaire. Sur un critique: A Terre.",
      }
    ],
    action : [
      {
        name: "ACTIONS.",
        description : "Après chaque tour d'un héro, choissisez un :"
      },
      {
        name: "• Hurlement Sauvage.",
        description : "Tous les ennemis dans un rayon de 12 subissent $dice dégâts (ignorent l'armure). JdS de VOL 11 ou deviennent Effrayés pendant 1 round.",
        dice : {
          numberDice: 2,
          valueDice: 6,
          bonus: 0
        },
        use: 1
      },
      {
      name: "• Déchirer & Lacérer.",
      description : "$dice.",
      dice : {
        numberDice: 2,
        valueDice: 6,
        bonus: 10
        }
      },
      {
      name: "• Bec.",
      description : "Déplacement de 8 et $dice.",
      dice : {
        numberDice: 2,
        valueDice: 6,
        bonus: 0
        }
      }
    ],
    bloodied :{
      description : "À $hp, Hurlement Sauvage se recharge.",
      hp : "50 PV"
    },
    lastStand :{
      description : "Grimbeak est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. Jusqu'à ce moment-là, ses attaques utilisent des d10 au lieu des d6.",
      hp : 30,
      newValueDice : 10
    }
  },
  {
    name: "Greenthumb",
    legendary: true,
    hp: 100,
    level: "3",
    save: "INT+,VOL+",
    passif: [
    ],
    action : [
      {
        name: "ACTIONS.",
        description : "Après chaque tour d'un héro, mouvement de 6 puis choissisez un :"
      },
      {
        name: "• Invoquer des Roncespectres.",
        description : "Invoque 1 sbire / héros (taille : 1d4)."
      },
      {
      name: "• Enracinement.",
      description : "Choisissez la moitié des héros. Ils doivent réussir un JdS de DEX 11 ou subir $dice et être Entravés par des lianes épineuses (évasion : JdS de STR ou DEX 11, ou recevoir des dégâts tranchants ou de feu pour se libérer).",
      dice : {
        numberDice: 2,
        valueDice: 4,
        bonus: 0
        }
      },
      {
      name: "• Tir de ronces.",
      description : "(Portée 10) $dice.",
      dice : {
        numberDice: 5,
        valueDice: 4,
        bonus: 5
        }
      }
    ],
    bloodied :{
      description : "À $hp, Greenthumb gagne une écorce magique qui lui confère une Armure Lourde.",
      hp : "50 PV",
      armor : "L"
    },
    lastStand :{
      description : "Grimbeak est mourant ! S’il subit $hp dégâts supplémentaires, il meurt. En attendant, il agit deux fois par tour.",
      hp : 30,
      newDescription: "Après chaque tour d'un héro, mouvement de 6 puis choissisez deux :"
    }
  }
]