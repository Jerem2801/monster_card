export const dataMonsters =[
  {
    name: "Gobelin",
    hp: 15,
    action :[
      {
      name: "Stab",
      description : "1d6+2.",
      dice : {
        numberDice: 1,
        valueDice: 6,
        bonus: 2
        }
      },
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
    
  },
  {
    name: "Bugbear",
    hp: 30,
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