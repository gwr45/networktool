class Connection {
  constructor() {
    let nullProps = ["resources", "connectionName", "closeness", "context", "rank",
    "frequency", "diffGender", "diffRace", "related", "differentNationality", "differentUniversity"]
    let numericProps = [
      {name: "connectionAge", default: 30},
      {name: "relationshipDuration", default: 5},
      {name: "experienceYears", default: 5},
      {name: "countriesLived", default: 2},
      {name: "difficultyComfort", default: 1},
      {name: "hopesComfort", default: 1},
      {name: "completeTaskTrust", default: 1},
      {name: "competenceTrust", default: 1},
      {name: "hourFavorObligation", default: 1},
      {name: "dayFavorObligation", default: 1},
      {name: "inconvenientFavorObligation", default: 1},
      {name: "differentSkillSet", default: 1},
      {name: "numDegrees", default: 1},
    ]
    for(let i = 0; i < nullProps.length; i++) {
      this[nullProps[i]] = null;
    }
    for(let i = 0; i < numericProps.length; i++) {
      this[numericProps[i].name] = numericProps[i].default
    }
  }
}

export { Connection };
