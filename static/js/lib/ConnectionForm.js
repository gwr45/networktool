'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ConnectionCard = require('./ConnectionCard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectionForm = function (_React$Component) {
  _inherits(ConnectionForm, _React$Component);

  function ConnectionForm() {
    _classCallCheck(this, ConnectionForm);

    var _this = _possibleConstructorReturn(this, (ConnectionForm.__proto__ || Object.getPrototypeOf(ConnectionForm)).call(this));

    _this.onAddConnection = _this.onAddConnection.bind(_this);
    return _this;
  }

  _createClass(ConnectionForm, [{
    key: 'onAddConnection',
    value: function onAddConnection(e) {
      e.preventDefault();
      this.props.onAddConnection();
    }
  }, {
    key: 'render',
    value: function render() {
      var connections = this.props.connections;
      var namedCount = 0;
      for (var i = 0; i < connections.length; i++) {
        if (connections[i].connectionName) {
          namedCount++;
        }
      }

      var cards = [];
      for (var i = 0; i < connections.length; i++) {
        cards.push(_react2.default.createElement(_ConnectionCard.ConnectionCard, {
          key: i,
          connectionId: i,
          connection: connections[i],
          onChange: this.props.onChange,
          onRemove: connections.length > 1 ? this.props.onRemove : null
        }));
      }

      return _react2.default.createElement(
        'div',
        { className: 'wizard-step-content' },
        _react2.default.createElement(
          'h3',
          { className: 'wizard-step-title' },
          'Add Your Connections'
        ),
        _react2.default.createElement(
          'p',
          { className: 'wizard-step-desc' },
          'Add at least 10 people from your professional network. Click each card to expand and fill in details.'
        ),
        _react2.default.createElement(
          'div',
          { className: 'connections-toolbar' },
          _react2.default.createElement(
            'div',
            { className: 'connections-progress' },
            _react2.default.createElement(
              'span',
              { className: 'connections-count' },
              namedCount
            ),
            ' of ',
            _react2.default.createElement(
              'span',
              { className: 'connections-target' },
              '10'
            ),
            ' connections named',
            _react2.default.createElement(
              'div',
              { className: 'connections-progress-bar' },
              _react2.default.createElement('div', { className: 'connections-progress-fill', style: { width: Math.min(namedCount / 10 * 100, 100) + '%' } })
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', onClick: this.onAddConnection, type: 'button' },
            '+ Add Connection'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'connections-list' },
          cards
        ),
        _react2.default.createElement(
          'div',
          { className: 'connections-add-bottom' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-secondary', onClick: this.onAddConnection, type: 'button' },
            '+ Add Another Connection'
          )
        )
      );
    }
  }]);

  return ConnectionForm;
}(_react2.default.Component);

exports.ConnectionForm = ConnectionForm;