import React from 'react';

var STEPS = [
    { num: 1, label: 'About You', icon: '👤' },
    { num: 2, label: 'Connections', icon: '🔗' },
    { num: 3, label: 'Who Knows Who', icon: '🕸' },
    { num: 4, label: 'Review & Submit', icon: '✅' }
];

class WizardContainer extends React.Component {
    constructor() {
        super();
    }

    render() {
        var currentStep = this.props.currentStep;
        var namedCount = 0;
        for (var i = 0; i < this.props.connections.length; i++) {
            if (this.props.connections[i].connectionName) {
                namedCount++;
            }
        }

        return (
            <div className="wizard">
                <div className="wizard-progress">
                    <div className="wizard-progress-bar">
                        <div
                            className="wizard-progress-fill"
                            style={{ width: ((currentStep - 1) / 3 * 100) + '%' }}
                        />
                    </div>
                    <div className="wizard-steps-indicator">
                        {STEPS.map(function (step) {
                            var cls = 'wizard-step-dot';
                            if (step.num < currentStep) cls += ' completed';
                            else if (step.num === currentStep) cls += ' active';
                            return (
                                <div key={step.num} className={cls}>
                                    <div className="dot-circle">
                                        {step.num < currentStep ? '✓' : step.num}
                                    </div>
                                    <span className="dot-label">{step.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="wizard-content">
                    {this.props.children}
                </div>

                <div className="wizard-nav">
                    {currentStep > 1 && (
                        <button
                            className="btn btn-secondary wizard-btn-back"
                            onClick={this.props.onBack}
                            type="button"
                        >
                            ← Back
                        </button>
                    )}
                    <div className="wizard-nav-spacer" />
                    {currentStep < 4 && (
                        <button
                            className="btn btn-primary wizard-btn-next"
                            onClick={this.props.onNext}
                            type="button"
                        >
                            {currentStep === 3 ? 'Review →' : 'Next →'}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export { WizardContainer };
