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
}
]