export const dataMonsters =[
  {
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
    name: "Gobelin",
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
      },{
        name: "Fronde.",
        description : "$dice (Portée 8).",
        dice: {
          numberDice: 1,
          valueDice: 6,
          bonus: 2
        }
      }
    ]
  }
  ,
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
    name: "Krogg, Roi des Gobelins",
    hp: 75,
    armor: "M",
    level: "2",
    save: "FOR+,DEX+",
    passif: [
    ],
    action : [
      {
        name: "Massacre brutal.",
        description : "Se déplace de 6. Inflige $dice dégâts, la cible est agrippée (évasion DD 10).",
        dice : {
          numberDice: 2,
          valueDice: 6,
          bonus: 3
        }
      },
      {
      name: "Casse-crânes.",
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