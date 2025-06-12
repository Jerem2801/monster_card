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
      name: "Stab.",
      description : "1d6+2.",
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
    passif: [
    ],
    action :[
      {
      name: "Cleave",
      description : "2d6+4.",
      dice : {
        numberDice: 2,
        valueDice: 6,
        bonus: 4
        }
      }
    ]
  }
]