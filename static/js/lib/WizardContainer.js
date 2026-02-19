'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WizardContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STEPS = [{ num: 1, label: 'About You', icon: '👤' }, { num: 2, label: 'Connections', icon: '🔗' }, { num: 3, label: 'Who Knows Who', icon: '🕸' }, { num: 4, label: 'Review & Submit', icon: '✅' }];

var WizardContainer = function (_React$Component) {
    _inherits(WizardContainer, _React$Component);

    function WizardContainer() {
        _classCallCheck(this, WizardContainer);

        return _possibleConstructorReturn(this, (WizardContainer.__proto__ || Object.getPrototypeOf(WizardContainer)).call(this));
    }

    _createClass(WizardContainer, [{
        key: 'render',
        value: function render() {
            var currentStep = this.props.currentStep;
            var namedCount = 0;
            for (var i = 0; i < this.props.connections.length; i++) {
                if (this.props.connections[i].connectionName) {
                    namedCount++;
                }
            }

            return _react2.default.createElement(
                'div',
                { className: 'wizard' },
                _react2.default.createElement(
                    'div',
                    { className: 'wizard-progress' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wizard-progress-bar' },
                        _react2.default.createElement('div', {
                            className: 'wizard-progress-fill',
                            style: { width: (currentStep - 1) / 3 * 100 + '%' }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'wizard-steps-indicator' },
                        STEPS.map(function (step) {
                            var cls = 'wizard-step-dot';
                            if (step.num < currentStep) cls += ' completed';else if (step.num === currentStep) cls += ' active';
                            return _react2.default.createElement(
                                'div',
                                { key: step.num, className: cls },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'dot-circle' },
                                    step.num < currentStep ? '✓' : step.num
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'dot-label' },
                                    step.label
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wizard-content' },
                    this.props.children
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'wizard-nav' },
                    currentStep > 1 && _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-secondary wizard-btn-back',
                            onClick: this.props.onBack,
                            type: 'button'
                        },
                        '\u2190 Back'
                    ),
                    _react2.default.createElement('div', { className: 'wizard-nav-spacer' }),
                    currentStep < 4 && _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-primary wizard-btn-next',
                            onClick: this.props.onNext,
                            type: 'button'
                        },
                        currentStep === 3 ? 'Review →' : 'Next →'
                    )
                )
            );
        }
    }]);

    return WizardContainer;
}(_react2.default.Component);

exports.WizardContainer = WizardContainer;