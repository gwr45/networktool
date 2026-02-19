"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Connection = function Connection() {
  _classCallCheck(this, Connection);

  var nullProps = ["resources", "connectionName", "closeness", "context", "rank", "frequency", "diffGender", "diffRace", "related", "differentNationality", "differentUniversity"];
  var numericProps = [{ name: "connectionAge", default: 30 }, { name: "relationshipDuration", default: 5 }, { name: "experienceYears", default: 5 }, { name: "countriesLived", default: 2 }, { name: "difficultyComfort", default: 1 }, { name: "hopesComfort", default: 1 }, { name: "completeTaskTrust", default: 1 }, { name: "competenceTrust", default: 1 }, { name: "hourFavorObligation", default: 1 }, { name: "dayFavorObligation", default: 1 }, { name: "inconvenientFavorObligation", default: 1 }, { name: "differentSkillSet", default: 1 }, { name: "numDegrees", default: 1 }];
  for (var i = 0; i < nullProps.length; i++) {
    this[nullProps[i]] = null;
  }
  for (var _i = 0; _i < numericProps.length; _i++) {
    this[numericProps[_i].name] = numericProps[_i].default;
  }
};

exports.Connection = Connection;