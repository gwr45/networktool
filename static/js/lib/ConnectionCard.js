'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectionCard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fields = require('./Fields');

var _Constants = require('./Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectionCard = function (_React$Component) {
    _inherits(ConnectionCard, _React$Component);

    function ConnectionCard() {
        _classCallCheck(this, ConnectionCard);

        var _this = _possibleConstructorReturn(this, (ConnectionCard.__proto__ || Object.getPrototypeOf(ConnectionCard)).call(this));

        _this.state = { collapsed: true };
        _this.toggle = _this.toggle.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(ConnectionCard, [{
        key: 'toggle',
        value: function toggle() {
            this.setState({ collapsed: !this.state.collapsed });
        }
    }, {
        key: 'onChange',
        value: function onChange(name) {
            var self = this;
            return function (val) {
                self.props.onChange(self.props.connectionId, name, val);
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var conn = this.props.connection;
            var id = this.props.connectionId;
            var displayName = conn.connectionName || '(unnamed)';
            var collapsed = this.state.collapsed;

            return _react2.default.createElement(
                'div',
                { className: 'connection-card' },
                _react2.default.createElement(
                    'div',
                    { className: 'connection-card-header', onClick: this.toggle },
                    _react2.default.createElement(
                        'div',
                        { className: 'connection-card-title' },
                        _react2.default.createElement(
                            'span',
                            { className: 'connection-number' },
                            '#',
                            id + 1
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'connection-name-display' },
                            displayName
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'connection-card-actions' },
                        this.props.onRemove && _react2.default.createElement(
                            'button',
                            {
                                className: 'btn btn-ghost btn-sm connection-remove-btn',
                                onClick: function (e) {
                                    e.stopPropagation();this.props.onRemove(id);
                                }.bind(this),
                                type: 'button',
                                title: 'Remove connection'
                            },
                            '\u2715'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'connection-card-chevron' + (collapsed ? '' : ' open') },
                            '\u25BC'
                        )
                    )
                ),
                !collapsed && _react2.default.createElement(
                    'div',
                    { className: 'connection-card-body' },
                    _react2.default.createElement(
                        'div',
                        { className: 'field-section' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'field-section-title' },
                            'Basic Info'
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
                                    'Name'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.TEXT, value: conn.connectionName, name: 'connectionName' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Resource Type'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SELECT, value: conn.resources, name: 'resources',
                                    options: [{ value: _Constants.Resource.FINANCIAL, label: 'Economic/Financial' }, { value: _Constants.Resource.OPPORTUNITIES, label: 'Entrepreneurial Opportunities' }, { value: _Constants.Resource.EXECUTION, label: 'Task Execution Help' }, { value: _Constants.Resource.FRIENDSHIP, label: 'Friendship & Support' }] })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Closeness'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SELECT, value: conn.closeness, name: 'closeness',
                                    options: [{ value: _Constants.Strength.VERY_STRONG, label: 'Very Strong' }, { value: _Constants.Strength.STRONG, label: 'Strong' }, { value: _Constants.Strength.MODERATE, label: 'Moderate' }, { value: _Constants.Strength.WEAK, label: 'Weak' }] })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Organizational Context'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SELECT, value: conn.context, name: 'context',
                                    options: [{ value: _Constants.Context.ANOTHER_ORG, label: 'Another organization' }, { value: _Constants.Context.ORG_ANOTHER_DEPT, label: 'My org, different dept.' }, { value: _Constants.Context.DEPT, label: 'My department' }] })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Rank Relative to You'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SELECT, value: conn.rank, name: 'rank',
                                    options: [{ value: _Constants.Rank.HIGHER, label: 'Higher rank' }, { value: _Constants.Rank.SAME, label: 'About the same' }, { value: _Constants.Rank.LOWER, label: 'Lower rank' }] })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Interaction Frequency'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SELECT, value: conn.frequency, name: 'frequency',
                                    options: [{ value: _Constants.Frequency.WEEKLY, label: 'Every week' }, { value: _Constants.Frequency.MONTHLY, label: 'Every month' }, { value: _Constants.Frequency.YEARLY, label: 'Every year' }, { value: _Constants.Frequency.LESS_THAN_YEARLY, label: 'Less than yearly' }] })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'field-section' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'field-section-title' },
                            'Demographics'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'field-grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item field-item-checkbox' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Different Gender'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.CHECKBOX, value: conn.diffGender, name: 'diffGender' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item field-item-checkbox' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Different Race'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.CHECKBOX, value: conn.diffRace, name: 'diffRace' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Age (years)'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.NUMERIC, value: conn.connectionAge, name: 'connectionAge' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Relationship Duration (years)'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.NUMERIC, value: conn.relationshipDuration, name: 'relationshipDuration' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'field-section' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'field-section-title' },
                            'Trust & Comfort'
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
                                    'Comfortable sharing personal difficulties'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.difficultyComfort, name: 'difficultyComfort' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Comfortable sharing hopes and dreams'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.hopesComfort, name: 'hopesComfort' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Trust to complete agreed tasks'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.completeTaskTrust, name: 'completeTaskTrust' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Trust in knowledge and competence'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.competenceTrust, name: 'competenceTrust' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'field-section' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'field-section-title' },
                            'Obligation'
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
                                    'Obliged for: 1-hour favor in a busy week'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.hourFavorObligation, name: 'hourFavorObligation' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Obliged for: 1-day favor in a busy week'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.dayFavorObligation, name: 'dayFavorObligation' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Obliged for: favor that inconveniences others'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.inconvenientFavorObligation, name: 'inconvenientFavorObligation' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'field-section' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'field-section-title' },
                            'Background'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'field-grid' },
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item field-item-checkbox' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Related to You'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.CHECKBOX, value: conn.related, name: 'related' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item slider-field' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Different Skill Set'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.SLIDER, value: conn.differentSkillSet, name: 'differentSkillSet' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item field-item-checkbox' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Different Nationality'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.CHECKBOX, value: conn.differentNationality, name: 'differentNationality' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Experience (years)'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.NUMERIC, value: conn.experienceYears, name: 'experienceYears' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Countries Lived In'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.NUMERIC, value: conn.countriesLived, name: 'countriesLived' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item field-item-checkbox' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Different University'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.CHECKBOX, value: conn.differentUniversity, name: 'differentUniversity' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'field-item' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'Number of Degrees'
                                ),
                                _react2.default.createElement(_Fields.Field, { onChange: this.onChange, type: _Constants.ComponentType.NUMERIC, value: conn.numDegrees, name: 'numDegrees' })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ConnectionCard;
}(_react2.default.Component);

exports.ConnectionCard = ConnectionCard;