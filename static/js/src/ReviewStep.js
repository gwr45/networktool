import React from 'react';

class ReviewStep extends React.Component {
    constructor() {
        super();
    }

    render() {
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

        var genderLabel = data.gender ? (data.gender.label || data.gender) : 'Not specified';

        return (
            <div className="review-step">
                <h3 className="wizard-step-title">Review & Submit</h3>
                <p className="wizard-step-desc">Review your entries before submitting. Click "Edit" to jump back to any section.</p>

                {/* About You */}
                <div className="review-section">
                    <div className="review-section-header">
                        <h4>👤 About You</h4>
                        <button className="btn btn-ghost btn-sm" type="button" onClick={function () { goToStep(1); }}>Edit</button>
                    </div>
                    <div className="review-grid">
                        <div className="review-item">
                            <span className="review-label">Name</span>
                            <span className="review-value">{data.name || '—'}</span>
                        </div>
                        <div className="review-item">
                            <span className="review-label">Age</span>
                            <span className="review-value">{data.age}</span>
                        </div>
                        <div className="review-item">
                            <span className="review-label">Gender</span>
                            <span className="review-value">{genderLabel}</span>
                        </div>
                        <div className="review-item">
                            <span className="review-label">Work Experience</span>
                            <span className="review-value">{data.workExperience} years</span>
                        </div>
                        <div className="review-item">
                            <span className="review-label">Countries Lived In</span>
                            <span className="review-value">{data.countriesLived}</span>
                        </div>
                    </div>
                    <div className="review-sliders">
                        <div className="review-slider-item">
                            <span>Network Diversity</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.networkDiversity / 5 * 100) + '%' }} /><span>{data.networkDiversity}/5</span></div>
                        </div>
                        <div className="review-slider-item">
                            <span>Network Obligation</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.networkObligation / 5 * 100) + '%' }} /><span>{data.networkObligation}/5</span></div>
                        </div>
                        <div className="review-slider-item">
                            <span>Elite Network</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.eliteNetwork / 5 * 100) + '%' }} /><span>{data.eliteNetwork}/5</span></div>
                        </div>
                        <div className="review-slider-item">
                            <span>Technical Network</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.technicalNetwork / 5 * 100) + '%' }} /><span>{data.technicalNetwork}/5</span></div>
                        </div>
                        <div className="review-slider-item">
                            <span>Guidance Network</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.guidanceNetwork / 5 * 100) + '%' }} /><span>{data.guidanceNetwork}/5</span></div>
                        </div>
                        <div className="review-slider-item">
                            <span>Financial Network</span>
                            <div className="review-bar"><div className="review-bar-fill" style={{ width: (data.financialNetwork / 5 * 100) + '%' }} /><span>{data.financialNetwork}/5</span></div>
                        </div>
                    </div>
                </div>

                {/* Connections */}
                <div className="review-section">
                    <div className="review-section-header">
                        <h4>🔗 Your Connections</h4>
                        <button className="btn btn-ghost btn-sm" type="button" onClick={function () { goToStep(2); }}>Edit</button>
                    </div>
                    <div className="review-connections-summary">
                        <div className="review-stat">
                            <span className="review-stat-number">{namedCount}</span>
                            <span className="review-stat-label">Named Connections</span>
                        </div>
                        <div className="review-stat">
                            <span className="review-stat-number">{connections.length}</span>
                            <span className="review-stat-label">Total Slots</span>
                        </div>
                    </div>
                    {namedCount < 10 && (
                        <div className="review-warning">
                            ⚠️ You need at least 10 named connections to submit. Currently: {namedCount}
                        </div>
                    )}
                    <div className="review-names-list">
                        {connectionNames.map(function (name, i) {
                            return <span key={i} className="review-name-tag">{name}</span>;
                        })}
                    </div>
                </div>

                {/* Matrix */}
                <div className="review-section">
                    <div className="review-section-header">
                        <h4>🕸 Network Connections</h4>
                        <button className="btn btn-ghost btn-sm" type="button" onClick={function () { goToStep(3); }}>Edit</button>
                    </div>
                    <div className="review-connections-summary">
                        <div className="review-stat">
                            <span className="review-stat-number review-stat-strong">{strongCount}</span>
                            <span className="review-stat-label">Strong Ties</span>
                        </div>
                        <div className="review-stat">
                            <span className="review-stat-number review-stat-weak">{weakCount}</span>
                            <span className="review-stat-label">Weak Ties</span>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="review-submit-area">
                    <button
                        className="btn btn-primary btn-lg wizard-submit-btn"
                        onClick={this.props.onSubmit}
                        type="button"
                        id="submitButton"
                        disabled={namedCount < 10}
                    >
                        Submit Network Analysis
                    </button>
                    {namedCount < 10 && (
                        <p className="review-submit-hint">Add at least {10 - namedCount} more named connections to enable submission.</p>
                    )}
                </div>
                <p style={{ display: 'none' }} id="status">Please wait...</p>
            </div>
        );
    }
}

export { ReviewStep };
