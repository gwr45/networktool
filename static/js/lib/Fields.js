'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Question = exports.Field = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactNumericInput = require('react-numeric-input');

var _reactNumericInput2 = _interopRequireDefault(_reactNumericInput);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _Constants = require('./Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_React$Component) {
  _inherits(Field, _React$Component);

  /** Fields represent an input element. **/
  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));
  }

  _createClass(Field, [{
    key: 'render',
    value: function render() {
      if (this.props.type == _Constants.ComponentType.TEXT) {
        return _react2.default.createElement('input', { type: 'text', onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.RADIO) {
        return _react2.default.createElement('input', { type: 'radio', name: this.props.name, value: this.props.value, onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.CHECKBOX) {
        return _react2.default.createElement('input', { type: 'checkbox', onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.NUMERIC) {
        return _react2.default.createElement(_reactNumericInput2.default, {
          name: this.props.name,
          value: this.props.value,
          min: this.props.min,
          max: this.props.max,
          step: 1,
          onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.SELECT) {
        return _react2.default.createElement(_reactSelect2.default, {
          name: this.props.name,
          options: this.props.options,
          value: this.props.value,
          onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.MULTI_SELECT) {
        return _react2.default.createElement(_reactSelect2.default, {
          multi: true,
          name: this.props.name,
          options: this.props.options,
          value: this.props.value,
          onChange: this.props.onChange(this.props.name) });
      } else if (this.props.type == _Constants.ComponentType.SLIDER) {
        return _react2.default.createElement(_rcSlider2.default, {
          name: this.props.name,
          min: 1,
          max: 5,
          marks: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5'
          },
          value: this.props.value,
          onChange: this.props.onChange(this.props.name) });
      } else {
        return null;
      }
    }
  }]);

  return Field;
}(_react2.default.Component);

var Question = function (_React$Component2) {
  _inherits(Question, _React$Component2);

  function Question() {
    _classCallCheck(this, Question);

    return _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this));
  }

  _createClass(Question, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'question-row' },
        _react2.default.createElement(
          'label',
          { className: 'question-label' },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'question-input' },
          _react2.default.createElement(Field, {
            type: this.props.type,
            name: this.props.name,
            options: this.props.options || [],
            onChange: this.props.onChange,
            min: this.props.min,
            max: this.props.max,
            value: this.props.value })
        )
      );
    }
  }]);

  return Question;
}(_react2.default.Component);

exports.Field = Field;
exports.Question = Question;