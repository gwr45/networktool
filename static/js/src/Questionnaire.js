import React from 'react';
import { Field, Question } from './Fields';
import { ComponentType } from './Constants';

class Questionnaire extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="wizard-step-content">
        <h3 className="wizard-step-title">About You</h3>
        <p className="wizard-step-desc">Tell us about yourself and how you perceive your network.</p>

        <div className="card">
          <div className="card-header"><h3 style={{ margin: 0, border: 'none', padding: 0, fontSize: '1.125rem' }}>Personal Information</h3></div>
          <div className="field-grid">
            <div className="field-item field-item-wide">
              <label>What is your name?</label>
              <Field type={ComponentType.TEXT} value={this.props.data.name} name="name" onChange={this.props.onChange} />
            </div>
            <div className="field-item">
              <label>Age (years)</label>
              <Field type={ComponentType.NUMERIC} min={0} max={100} value={this.props.data.age} name="age" onChange={this.props.onChange} />
            </div>
            <div className="field-item">
              <label>Gender</label>
              <Field type={ComponentType.SELECT} name="gender" onChange={this.props.onChange} value={this.props.data.gender}
                options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
            </div>
            <div className="field-item">
              <label>Years of work experience</label>
              <Field type={ComponentType.NUMERIC} name="workExperience" min={0} max={50} value={this.props.data.workExperience} onChange={this.props.onChange} />
            </div>
            <div className="field-item">
              <label>Countries lived in</label>
              <Field type={ComponentType.NUMERIC} name="countriesLived" min={0} max={20} value={this.props.data.countriesLived} onChange={this.props.onChange} />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <div className="card-header"><h3 style={{ margin: 0, border: 'none', padding: 0, fontSize: '1.125rem' }}>Network Perceptions</h3></div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '20px' }}>
            Rate each on a scale of 1 (Not at all) to 5 (To a great extent)
          </p>
          <div className="field-grid field-grid-sliders">
            <div className="field-item slider-field">
              <label>How diverse is your network?</label>
              <p className="field-hint">Consider variety in backgrounds, industries, and perspectives</p>
              <Field type={ComponentType.SLIDER} name="networkDiversity" onChange={this.props.onChange} value={this.props.data.networkDiversity} />
            </div>
            <div className="field-item slider-field">
              <label>How obligated do you feel to your network?</label>
              <p className="field-hint">How much you feel you owe to your contacts</p>
              <Field type={ComponentType.SLIDER} name="networkObligation" onChange={this.props.onChange} value={this.props.data.networkObligation} />
            </div>
            <div className="field-item slider-field">
              <label>Access to elite contacts?</label>
              <p className="field-hint">High-status individuals in positions of influence</p>
              <Field type={ComponentType.SLIDER} name="eliteNetwork" onChange={this.props.onChange} value={this.props.data.eliteNetwork} />
            </div>
            <div className="field-item slider-field">
              <label>Rely on network for technical advice?</label>
              <p className="field-hint">Technical guidance about a business idea</p>
              <Field type={ComponentType.SLIDER} name="technicalNetwork" onChange={this.props.onChange} value={this.props.data.technicalNetwork} />
            </div>
            <div className="field-item slider-field">
              <label>Rely on network for venture guidance?</label>
              <p className="field-hint">Guidance on operating a new venture</p>
              <Field type={ComponentType.SLIDER} name="guidanceNetwork" onChange={this.props.onChange} value={this.props.data.guidanceNetwork} />
            </div>
            <div className="field-item slider-field">
              <label>Rely on network for financial resources?</label>
              <p className="field-hint">Financial support to start a new venture</p>
              <Field type={ComponentType.SLIDER} name="financialNetwork" onChange={this.props.onChange} value={this.props.data.financialNetwork} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Questionnaire };
