export const dataMonsters = [
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
  }
]