let ComponentType = {
  NUMERIC: 1,
  SELECT: 2,
  SLIDER: 3,
  TEXT: 4,
  CHECKBOX: 5,
  MULTI_SELECT: 6
}

let Resource = {
  FINANCIAL: 1,
  OPPORTUNITIES: 2,
  EXECUTION: 3,
  FRIENDSHIP: 4
}

let Strength = {
  VERY_STRONG: 4,
  STRONG: 3,
  MODERATE: 2,
  WEAK: 1,
  NONE: 0
}

let Context = {
  ANOTHER_ORG: 1,
  ORG_ANOTHER_DEPT: 2,
  DEPT: 3
}

let Rank = {
  HIGHER: 1,
  SAME: 2,
  LOWER: 3
}

let Frequency = {
  WEEKLY: 1,
  MONTHLY: 2,
  YEARLY: 3,
  LESS_THAN_YEARLY: 4
}

export { ComponentType, Resource, Strength, Context, Rank, Frequency };
