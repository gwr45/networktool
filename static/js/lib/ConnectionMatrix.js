"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionMatrix = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Matrix cell states: 0 = none, 1 = strong, 2 = weak
var NONE = 0;
var STRONG = 1;
var WEAK = 2;

var ConnectionMatrix = function (_React$Component) {
  _inherits(ConnectionMatrix, _React$Component);

  function ConnectionMatrix() {
    _classCallCheck(this, ConnectionMatrix);

    var _this = _possibleConstructorReturn(this, (ConnectionMatrix.__proto__ || Object.getPrototypeOf(ConnectionMatrix)).call(this));

    _this.onCellClick = _this.onCellClick.bind(_this);
    return _this;
  }

  _createClass(ConnectionMatrix, [{
    key: "getCellState",
    value: function getCellState(i, j) {
      // Check strong
      for (var k = 0; k < this.props.strongMatrix[i].length; k++) {
        if (this.props.strongMatrix[i][k].value === j) return STRONG;
      }
      // Check weak
      for (var k = 0; k < this.props.weakMatrix[i].length; k++) {
        if (this.props.weakMatrix[i][k].value === j) return WEAK;
      }
      return NONE;
    }
  }, {
    key: "onCellClick",
    value: function onCellClick(i, j) {
      var self = this;
      return function (e) {
        e.preventDefault();
        var current = self.getCellState(i, j);
        var nameI = self.props.connections[i].connectionName;
        var nameJ = self.props.connections[j].connectionName;

        if (current === NONE) {
          // Add to strong for i
          var newStrong = self.props.strongMatrix[i].slice();
          newStrong.push({ value: j, label: nameJ });
          self.props.updateStrongMatrix(i, newStrong);
        } else if (current === STRONG) {
          // Remove from strong, add to weak
          var newStrong = self.props.strongMatrix[i].filter(function (x) {
            return x.value !== j;
          });
          self.props.updateStrongMatrix(i, newStrong);
          var newWeak = self.props.weakMatrix[i].slice();
          newWeak.push({ value: j, label: nameJ });
          self.props.updateWeakMatrix(i, newWeak);
        } else {
          // Remove from weak (back to none)
          var newWeak = self.props.weakMatrix[i].filter(function (x) {
            return x.value !== j;
          });
          self.props.updateWeakMatrix(i, newWeak);
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var connections = this.props.connections;
      var namedConnections = [];
      for (var i = 0; i < connections.length; i++) {
        if (connections[i].connectionName) {
          namedConnections.push({ index: i, name: connections[i].connectionName });
        }
      }

      if (namedConnections.length === 0) {
        return _react2.default.createElement(
          "div",
          { className: "wizard-step-content" },
          _react2.default.createElement(
            "h3",
            { className: "wizard-step-title" },
            "Who Knows Who?"
          ),
          _react2.default.createElement(
            "p",
            { className: "wizard-step-desc" },
            "Please add and name connections in Step 2 first."
          )
        );
      }

      var self = this;

      return _react2.default.createElement(
        "div",
        { className: "wizard-step-content" },
        _react2.default.createElement(
          "h3",
          { className: "wizard-step-title" },
          "Who Knows Who?"
        ),
        _react2.default.createElement(
          "p",
          { className: "wizard-step-desc" },
          "Click cells to indicate relationships between your connections. Connections auto-mirror: click A\u2192B and B\u2192A fills too."
        ),
        _react2.default.createElement(
          "div",
          { className: "matrix-legend" },
          _react2.default.createElement(
            "div",
            { className: "matrix-legend-item" },
            _react2.default.createElement("span", { className: "matrix-legend-swatch matrix-none" }),
            _react2.default.createElement(
              "span",
              null,
              "No connection"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "matrix-legend-item" },
            _react2.default.createElement("span", { className: "matrix-legend-swatch matrix-strong" }),
            _react2.default.createElement(
              "span",
              null,
              "Strong tie"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "matrix-legend-item" },
            _react2.default.createElement("span", { className: "matrix-legend-swatch matrix-weak" }),
            _react2.default.createElement(
              "span",
              null,
              "Weak tie"
            )
          ),
          _react2.default.createElement(
            "p",
            { className: "matrix-legend-hint" },
            "Click to cycle: None \u2192 Strong \u2192 Weak \u2192 None"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "matrix-scroll-wrapper" },
          _react2.default.createElement(
            "table",
            { className: "matrix-grid" },
            _react2.default.createElement(
              "thead",
              null,
              _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement("th", { className: "matrix-corner" }),
                namedConnections.map(function (nc) {
                  return _react2.default.createElement(
                    "th",
                    { key: 'h-' + nc.index, className: "matrix-col-header" },
                    _react2.default.createElement(
                      "span",
                      { className: "matrix-col-label" },
                      nc.name
                    )
                  );
                })
              )
            ),
            _react2.default.createElement(
              "tbody",
              null,
              namedConnections.map(function (rowNC) {
                return _react2.default.createElement(
                  "tr",
                  { key: 'r-' + rowNC.index },
                  _react2.default.createElement(
                    "td",
                    { className: "matrix-row-header" },
                    rowNC.name
                  ),
                  namedConnections.map(function (colNC) {
                    if (rowNC.index === colNC.index) {
                      return _react2.default.createElement(
                        "td",
                        { key: 'c-' + colNC.index, className: "matrix-cell matrix-self" },
                        "\u2014"
                      );
                    }
                    var state = self.getCellState(rowNC.index, colNC.index);
                    var cls = 'matrix-cell';
                    if (state === STRONG) cls += ' matrix-cell-strong';else if (state === WEAK) cls += ' matrix-cell-weak';

                    return _react2.default.createElement(
                      "td",
                      {
                        key: 'c-' + colNC.index,
                        className: cls,
                        onClick: self.onCellClick(rowNC.index, colNC.index),
                        title: rowNC.name + ' ↔ ' + colNC.name + ': ' + (state === STRONG ? 'Strong' : state === WEAK ? 'Weak' : 'None')
                      },
                      state === STRONG ? '●' : state === WEAK ? '○' : ''
                    );
                  })
                );
              })
            )
          )
        )
      );
    }
  }]);

  return ConnectionMatrix;
}(_react2.default.Component);

exports.ConnectionMatrix = ConnectionMatrix;