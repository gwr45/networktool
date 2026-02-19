'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeader4 = exports.TableHeader3 = exports.TableHeader2 = exports.TableHeader1 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableHeader1 = function (_React$Component) {
  _inherits(TableHeader1, _React$Component);

  function TableHeader1() {
    _classCallCheck(this, TableHeader1);

    return _possibleConstructorReturn(this, (TableHeader1.__proto__ || Object.getPrototypeOf(TableHeader1)).call(this));
  }

  _createClass(TableHeader1, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Connection Name'
        ),
        _react2.default.createElement(
          'th',
          null,
          'What type of resource do you primarily receive from this relationship?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How close is this relationship?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'From what context do you know this person?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How does this individual\'s position compare to your own?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How frequently do you interact with this individual?'
        )
      );
      /*'*/
    }
  }]);

  return TableHeader1;
}(_react2.default.Component);

var TableHeader2 = function (_React$Component2) {
  _inherits(TableHeader2, _React$Component2);

  function TableHeader2() {
    _classCallCheck(this, TableHeader2);

    return _possibleConstructorReturn(this, (TableHeader2.__proto__ || Object.getPrototypeOf(TableHeader2)).call(this));
  }

  _createClass(TableHeader2, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Connection Name'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Check this box if this person is a different gender than you.'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Check this box if this person is a different race than you.'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How old is the person? (Best guess in years)'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How many years have you had this relationship?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'I feel comfortable: sharing my personal problems and difficulties with this person.'
        ),
        _react2.default.createElement(
          'th',
          null,
          '...sharing my hopes and dreams with this person.'
        )
      );
    }
  }]);

  return TableHeader2;
}(_react2.default.Component);

var TableHeader3 = function (_React$Component3) {
  _inherits(TableHeader3, _React$Component3);

  function TableHeader3() {
    _classCallCheck(this, TableHeader3);

    return _possibleConstructorReturn(this, (TableHeader3.__proto__ || Object.getPrototypeOf(TableHeader3)).call(this));
  }

  _createClass(TableHeader3, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Connection Name'
        ),
        _react2.default.createElement(
          'th',
          null,
          'I trust this person: to complete a task that he/she has agreed to do for me.'
        ),
        _react2.default.createElement(
          'th',
          null,
          '...to have the knowledge and competence for getting tasks done.'
        ),
        _react2.default.createElement(
          'th',
          null,
          '(Scale of 1-5) I feel obliged if this person asks a favor that: requires 1 hour of my time in a busy week.'
        ),
        _react2.default.createElement(
          'th',
          null,
          '...requires 1 day of my time in a busy week.'
        ),
        _react2.default.createElement(
          'th',
          null,
          '...requires me to inconvenience others.'
        )
      );
    }
  }]);

  return TableHeader3;
}(_react2.default.Component);

var TableHeader4 = function (_React$Component4) {
  _inherits(TableHeader4, _React$Component4);

  function TableHeader4() {
    _classCallCheck(this, TableHeader4);

    return _possibleConstructorReturn(this, (TableHeader4.__proto__ || Object.getPrototypeOf(TableHeader4)).call(this));
  }

  _createClass(TableHeader4, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Connection Name'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Is this person related to you?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'To what extent does this person have a different skill set than yours?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Is this person a different nationality than you?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How many years of experience does this person have (make a guess)?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How many countries has this person lived in (make a guess)?'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Check this box if this person attended a different university than you.'
        ),
        _react2.default.createElement(
          'th',
          null,
          'How many degrees does this person have?'
        )
      );
    }
  }]);

  return TableHeader4;
}(_react2.default.Component);

exports.TableHeader1 = TableHeader1;
exports.TableHeader2 = TableHeader2;
exports.TableHeader3 = TableHeader3;
exports.TableHeader4 = TableHeader4;