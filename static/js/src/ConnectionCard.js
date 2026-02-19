import React from 'react';
import { Field } from './Fields';
import { ComponentType, Resource, Strength, Context, Rank, Frequency } from './Constants';

class ConnectionCard extends React.Component {
    constructor() {
        super();
        this.state = { collapsed: true };
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggle() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    onChange(name) {
        var self = this;
        return function (val) {
            self.props.onChange(self.props.connectionId, name, val);
        };
    }

    render() {
        var conn = this.props.connection;
        var id = this.props.connectionId;
        var displayName = conn.connectionName || '(unnamed)';
        var collapsed = this.state.collapsed;

        return (
            <div className="connection-card">
                <div className="connection-card-header" onClick={this.toggle}>
                    <div className="connection-card-title">
                        <span className="connection-number">#{id + 1}</span>
                        <span className="connection-name-display">{displayName}</span>
                    </div>
                    <div className="connection-card-actions">
                        {this.props.onRemove && (
                            <button
                                className="btn btn-ghost btn-sm connection-remove-btn"
                                onClick={function (e) { e.stopPropagation(); this.props.onRemove(id); }.bind(this)}
                                type="button"
                                title="Remove connection"
                            >✕</button>
                        )}
                        <span className={'connection-card-chevron' + (collapsed ? '' : ' open')}>▼</span>
                    </div>
                </div>

                {!collapsed && (
                    <div className="connection-card-body">
                        {/* ── Basic Info ───────────────────── */}
                        <div className="field-section">
                            <h4 className="field-section-title">Basic Info</h4>
                            <div className="field-grid">
                                <div className="field-item field-item-wide">
                                    <label>Name</label>
                                    <Field onChange={this.onChange} type={ComponentType.TEXT} value={conn.connectionName} name="connectionName" />
                                </div>
                                <div className="field-item">
                                    <label>Resource Type</label>
                                    <Field onChange={this.onChange} type={ComponentType.SELECT} value={conn.resources} name="resources"
                                        options={[
                                            { value: Resource.FINANCIAL, label: 'Economic/Financial' },
                                            { value: Resource.OPPORTUNITIES, label: 'Entrepreneurial Opportunities' },
                                            { value: Resource.EXECUTION, label: 'Task Execution Help' },
                                            { value: Resource.FRIENDSHIP, label: 'Friendship & Support' }
                                        ]} />
                                </div>
                                <div className="field-item">
                                    <label>Closeness</label>
                                    <Field onChange={this.onChange} type={ComponentType.SELECT} value={conn.closeness} name="closeness"
                                        options={[
                                            { value: Strength.VERY_STRONG, label: 'Very Strong' },
                                            { value: Strength.STRONG, label: 'Strong' },
                                            { value: Strength.MODERATE, label: 'Moderate' },
                                            { value: Strength.WEAK, label: 'Weak' }
                                        ]} />
                                </div>
                                <div className="field-item">
                                    <label>Organizational Context</label>
                                    <Field onChange={this.onChange} type={ComponentType.SELECT} value={conn.context} name="context"
                                        options={[
                                            { value: Context.ANOTHER_ORG, label: 'Another organization' },
                                            { value: Context.ORG_ANOTHER_DEPT, label: 'My org, different dept.' },
                                            { value: Context.DEPT, label: 'My department' }
                                        ]} />
                                </div>
                                <div className="field-item">
                                    <label>Rank Relative to You</label>
                                    <Field onChange={this.onChange} type={ComponentType.SELECT} value={conn.rank} name="rank"
                                        options={[
                                            { value: Rank.HIGHER, label: 'Higher rank' },
                                            { value: Rank.SAME, label: 'About the same' },
                                            { value: Rank.LOWER, label: 'Lower rank' }
                                        ]} />
                                </div>
                                <div className="field-item">
                                    <label>Interaction Frequency</label>
                                    <Field onChange={this.onChange} type={ComponentType.SELECT} value={conn.frequency} name="frequency"
                                        options={[
                                            { value: Frequency.WEEKLY, label: 'Every week' },
                                            { value: Frequency.MONTHLY, label: 'Every month' },
                                            { value: Frequency.YEARLY, label: 'Every year' },
                                            { value: Frequency.LESS_THAN_YEARLY, label: 'Less than yearly' }
                                        ]} />
                                </div>
                            </div>
                        </div>

                        {/* ── Demographics ─────────────────── */}
                        <div className="field-section">
                            <h4 className="field-section-title">Demographics</h4>
                            <div className="field-grid">
                                <div className="field-item field-item-checkbox">
                                    <label>Different Gender</label>
                                    <Field onChange={this.onChange} type={ComponentType.CHECKBOX} value={conn.diffGender} name="diffGender" />
                                </div>
                                <div className="field-item field-item-checkbox">
                                    <label>Different Race</label>
                                    <Field onChange={this.onChange} type={ComponentType.CHECKBOX} value={conn.diffRace} name="diffRace" />
                                </div>
                                <div className="field-item">
                                    <label>Age (years)</label>
                                    <Field onChange={this.onChange} type={ComponentType.NUMERIC} value={conn.connectionAge} name="connectionAge" />
                                </div>
                                <div className="field-item">
                                    <label>Relationship Duration (years)</label>
                                    <Field onChange={this.onChange} type={ComponentType.NUMERIC} value={conn.relationshipDuration} name="relationshipDuration" />
                                </div>
                            </div>
                        </div>

                        {/* ── Trust & Comfort ──────────────── */}
                        <div className="field-section">
                            <h4 className="field-section-title">Trust & Comfort</h4>
                            <div className="field-grid field-grid-sliders">
                                <div className="field-item slider-field">
                                    <label>Comfortable sharing personal difficulties</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.difficultyComfort} name="difficultyComfort" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Comfortable sharing hopes and dreams</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.hopesComfort} name="hopesComfort" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Trust to complete agreed tasks</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.completeTaskTrust} name="completeTaskTrust" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Trust in knowledge and competence</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.competenceTrust} name="competenceTrust" />
                                </div>
                            </div>
                        </div>

                        {/* ── Obligation ──────────────────── */}
                        <div className="field-section">
                            <h4 className="field-section-title">Obligation</h4>
                            <div className="field-grid field-grid-sliders">
                                <div className="field-item slider-field">
                                    <label>Obliged for: 1-hour favor in a busy week</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.hourFavorObligation} name="hourFavorObligation" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Obliged for: 1-day favor in a busy week</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.dayFavorObligation} name="dayFavorObligation" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Obliged for: favor that inconveniences others</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.inconvenientFavorObligation} name="inconvenientFavorObligation" />
                                </div>
                            </div>
                        </div>

                        {/* ── Background ─────────────────── */}
                        <div className="field-section">
                            <h4 className="field-section-title">Background</h4>
                            <div className="field-grid">
                                <div className="field-item field-item-checkbox">
                                    <label>Related to You</label>
                                    <Field onChange={this.onChange} type={ComponentType.CHECKBOX} value={conn.related} name="related" />
                                </div>
                                <div className="field-item slider-field">
                                    <label>Different Skill Set</label>
                                    <Field onChange={this.onChange} type={ComponentType.SLIDER} value={conn.differentSkillSet} name="differentSkillSet" />
                                </div>
                                <div className="field-item field-item-checkbox">
                                    <label>Different Nationality</label>
                                    <Field onChange={this.onChange} type={ComponentType.CHECKBOX} value={conn.differentNationality} name="differentNationality" />
                                </div>
                                <div className="field-item">
                                    <label>Experience (years)</label>
                                    <Field onChange={this.onChange} type={ComponentType.NUMERIC} value={conn.experienceYears} name="experienceYears" />
                                </div>
                                <div className="field-item">
                                    <label>Countries Lived In</label>
                                    <Field onChange={this.onChange} type={ComponentType.NUMERIC} value={conn.countriesLived} name="countriesLived" />
                                </div>
                                <div className="field-item field-item-checkbox">
                                    <label>Different University</label>
                                    <Field onChange={this.onChange} type={ComponentType.CHECKBOX} value={conn.differentUniversity} name="differentUniversity" />
                                </div>
                                <div className="field-item">
                                    <label>Number of Degrees</label>
                                    <Field onChange={this.onChange} type={ComponentType.NUMERIC} value={conn.numDegrees} name="numDegrees" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export { ConnectionCard };
