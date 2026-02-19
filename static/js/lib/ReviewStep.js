'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReviewStep = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReviewStep = function (_React$Component) {
    _inherits(ReviewStep, _React$Component);

    function ReviewStep() {
        _classCallCheck(this, ReviewStep);

        return _possibleConstructorReturn(this, (ReviewStep.__proto__ || Object.getPrototypeOf(ReviewStep)).call(this));
    }

    _createClass(ReviewStep, [{
        key: 'render',
        value: function render() {
            var data = this.props.data;
            var connections = this.props.connections;
            var strongMatrix = this.props.strongMatrix;
            var weakMatrix = this.props.weakMatrix;
            var goToStep = this.props.goToStep;

            // Count named connections
            var namedCount = 0;
            var connectionNames = [];
            for (var i = 0; i < connections.length; i++) {
                if (connections[i].connectionName) {
                    namedCount++;
                    connectionNames.push(connections[i].connectionName);
                }
            }

            // Count matrix ties
            var strongCount = 0;
            var weakCount = 0;
            var seen = {};
            for (var i = 0; i < strongMatrix.length; i++) {
                for (var j = 0; j < strongMatrix[i].length; j++) {
                    var pair = Math.min(i, strongMatrix[i][j].value) + '-' + Math.max(i, strongMatrix[i][j].value);
                    if (!seen[pair]) {
                        strongCount++;
                        seen[pair] = true;
                    }
                }
            }
            for (var i = 0; i < weakMatrix.length; i++) {
                for (var j = 0; j < weakMatrix[i].length; j++) {
                    var pair = Math.min(i, weakMatrix[i][j].value) + '-' + Math.max(i, weakMatrix[i][j].value);
                    if (!seen[pair]) {
                        weakCount++;
                        seen[pair] = true;
                    }
                }
            }

            var genderLabel = data.gender ? data.gender.label || data.gender : 'Not specified';

            return _react2.default.createElement(
                'div',
                { className: 'review-step' },
                _react2.default.createElement(
                    'h3',
                    { className: 'wizard-step-title' },
                    'Review & Submit'
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'wizard-step-desc' },
                    'Review your entries before submitting. Click "Edit" to jump back to any section.'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'review-section' },
                    _react2.default.createElement(
                        'div',
                        { className: 'review-section-header' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            '\uD83D\uDC64 About You'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-ghost btn-sm', type: 'button', onClick: function onClick() {
                                    goToStep(1);
                                } },
                            'Edit'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'review-grid' },
                        _react2.default.createElement(
                            'div',
                            { className: 'review-item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-label' },
                                'Name'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-value' },
                                data.name || '—'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-label' },
                                'Age'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-value' },
                                data.age
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-label' },
                                'Gender'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-value' },
                                genderLabel
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-label' },
                                'Work Experience'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-value' },
                                data.workExperience,
                                ' years'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-label' },
                                'Countries Lived In'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-value' },
                                data.countriesLived
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'review-sliders' },
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Network Diversity'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.networkDiversity / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.networkDiversity,
                                    '/5'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Network Obligation'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.networkObligation / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.networkObligation,
                                    '/5'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Elite Network'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.eliteNetwork / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.eliteNetwork,
                                    '/5'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Technical Network'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.technicalNetwork / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.technicalNetwork,
                                    '/5'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Guidance Network'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.guidanceNetwork / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.guidanceNetwork,
                                    '/5'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-slider-item' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Financial Network'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'review-bar' },
                                _react2.default.createElement('div', { className: 'review-bar-fill', style: { width: data.financialNetwork / 5 * 100 + '%' } }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    data.financialNetwork,
                                    '/5'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'review-section' },
                    _react2.default.createElement(
                        'div',
                        { className: 'review-section-header' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            '\uD83D\uDD17 Your Connections'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-ghost btn-sm', type: 'button', onClick: function onClick() {
                                    goToStep(2);
                                } },
                            'Edit'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'review-connections-summary' },
                        _react2.default.createElement(
                            'div',
                            { className: 'review-stat' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-number' },
                                namedCount
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-label' },
                                'Named Connections'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-stat' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-number' },
                                connections.length
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-label' },
                                'Total Slots'
                            )
                        )
                    ),
                    namedCount < 10 && _react2.default.createElement(
                        'div',
                        { className: 'review-warning' },
                        '\u26A0\uFE0F You need at least 10 named connections to submit. Currently: ',
                        namedCount
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'review-names-list' },
                        connectionNames.map(function (name, i) {
                            return _react2.default.createElement(
                                'span',
                                { key: i, className: 'review-name-tag' },
                                name
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'review-section' },
                    _react2.default.createElement(
                        'div',
                        { className: 'review-section-header' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            '\uD83D\uDD78 Network Connections'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-ghost btn-sm', type: 'button', onClick: function onClick() {
                                    goToStep(3);
                                } },
                            'Edit'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'review-connections-summary' },
                        _react2.default.createElement(
                            'div',
                            { className: 'review-stat' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-number review-stat-strong' },
                                strongCount
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-label' },
                                'Strong Ties'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'review-stat' },
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-number review-stat-weak' },
                                weakCount
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'review-stat-label' },
                                'Weak Ties'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'review-submit-area' },
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'btn btn-primary btn-lg wizard-submit-btn',
                            onClick: this.props.onSubmit,
                            type: 'button',
                            id: 'submitButton',
                            disabled: namedCount < 10
                        },
                        'Submit Network Analysis'
                    ),
                    namedCount < 10 && _react2.default.createElement(
                        'p',
                        { className: 'review-submit-hint' },
                        'Add at least ',
                        10 - namedCount,
                        ' more named connections to enable submission.'
                    )
                ),
                _react2.default.createElement(
                    'p',
                    { style: { display: 'none' }, id: 'status' },
                    'Please wait...'
                )
            );
        }
    }]);

    return ReviewStep;
}(_react2.default.Component);

exports.ReviewStep = ReviewStep;