"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ComponentType = {
  NUMERIC: 1,
  SELECT: 2,
  SLIDER: 3,
  TEXT: 4,
  CHECKBOX: 5,
  MULTI_SELECT: 6
};

var Resource = {
  FINANCIAL: 1,
  OPPORTUNITIES: 2,
  EXECUTION: 3,
  FRIENDSHIP: 4
};

var Strength = {
  VERY_STRONG: 4,
  STRONG: 3,
  MODERATE: 2,
  WEAK: 1,
  NONE: 0
};

var Context = {
  ANOTHER_ORG: 1,
  ORG_ANOTHER_DEPT: 2,
  DEPT: 3
};

var Rank = {
  HIGHER: 1,
  SAME: 2,
  LOWER: 3
};

var Frequency = {
  WEEKLY: 1,
  MONTHLY: 2,
  YEARLY: 3,
  LESS_THAN_YEARLY: 4
};

exports.ComponentType = ComponentType;
exports.Resource = Resource;
exports.Strength = Strength;
exports.Context = Context;
exports.Rank = Rank;
exports.Frequency = Frequency;