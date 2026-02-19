'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Questionnaire = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fields = require('./Fields');

var _Constants = require('./Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Questionnaire = function (_React$Component) {
  _inherits(Questionnaire, _React$Component);

  function Questionnaire() {
    _classCallCheck(this, Questionnaire);

    return _possibleConstructorReturn(this, (Questionnaire.__proto__ || Object.getPrototypeOf(Questionnaire)).call(this));
  }

  _createClass(Questionnaire, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'wizard-step-content' },
        _react2.default.createElement(
          'h3',
          { className: 'wizard-step-title' },
          'About You'
        ),
        _react2.default.createElement(
          'p',
          { className: 'wizard-step-desc' },
          'Tell us about yourself and how you perceive your network.'
        ),
        _react2.default.createElement(
          'div',
          { className: 'card' },
          _react2.default.createElement(
            'div',
            { className: 'card-header' },
            _react2.default.createElement(
              'h3',
              { style: { margin: 0, border: 'none', padding: 0, fontSize: '1.125rem' } },
              'Personal Information'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'field-grid' },
            _react2.default.createElement(
              'div',
              { className: 'field-item field-item-wide' },
              _react2.default.createElement(
                'label',
                null,
                'What is your name?'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.TEXT, value: this.props.data.name, name: 'name', onChange: this.props.onChange })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item' },
              _react2.default.createElement(
                'label',
                null,
                'Age (years)'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.NUMERIC, min: 0, max: 100, value: this.props.data.age, name: 'age', onChange: this.props.onChange })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item' },
              _react2.default.createElement(
                'label',
                null,
                'Gender'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SELECT, name: 'gender', onChange: this.props.onChange, value: this.props.data.gender,
                options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item' },
              _react2.default.createElement(
                'label',
                null,
                'Years of work experience'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.NUMERIC, name: 'workExperience', min: 0, max: 50, value: this.props.data.workExperience, onChange: this.props.onChange })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item' },
              _react2.default.createElement(
                'label',
                null,
                'Countries lived in'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.NUMERIC, name: 'countriesLived', min: 0, max: 20, value: this.props.data.countriesLived, onChange: this.props.onChange })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'card', style: { marginTop: '24px' } },
          _react2.default.createElement(
            'div',
            { className: 'card-header' },
            _react2.default.createElement(
              'h3',
              { style: { margin: 0, border: 'none', padding: 0, fontSize: '1.125rem' } },
              'Network Perceptions'
            )
          ),
          _react2.default.createElement(
            'p',
            { style: { color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '20px' } },
            'Rate each on a scale of 1 (Not at all) to 5 (To a great extent)'
          ),
          _react2.default.createElement(
            'div',
            { className: 'field-grid field-grid-sliders' },
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'How diverse is your network?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'Consider variety in backgrounds, industries, and perspectives'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'networkDiversity', onChange: this.props.onChange, value: this.props.data.networkDiversity })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'How obligated do you feel to your network?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'How much you feel you owe to your contacts'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'networkObligation', onChange: this.props.onChange, value: this.props.data.networkObligation })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'Access to elite contacts?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'High-status individuals in positions of influence'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'eliteNetwork', onChange: this.props.onChange, value: this.props.data.eliteNetwork })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'Rely on network for technical advice?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'Technical guidance about a business idea'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'technicalNetwork', onChange: this.props.onChange, value: this.props.data.technicalNetwork })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'Rely on network for venture guidance?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'Guidance on operating a new venture'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'guidanceNetwork', onChange: this.props.onChange, value: this.props.data.guidanceNetwork })
            ),
            _react2.default.createElement(
              'div',
              { className: 'field-item slider-field' },
              _react2.default.createElement(
                'label',
                null,
                'Rely on network for financial resources?'
              ),
              _react2.default.createElement(
                'p',
                { className: 'field-hint' },
                'Financial support to start a new venture'
              ),
              _react2.default.createElement(_Fields.Field, { type: _Constants.ComponentType.SLIDER, name: 'financialNetwork', onChange: this.props.onChange, value: this.props.data.financialNetwork })
            )
          )
        )
      );
    }
  }]);

  return Questionnaire;
}(_react2.default.Component);

exports.Questionnaire = Questionnaire;