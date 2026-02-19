import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import Slider from 'rc-slider';

import { ComponentType } from './Constants';

class Field extends React.Component {
  /** Fields represent an input element. **/
  constructor() {
    super();
  }

  render() {
    if (this.props.type == ComponentType.TEXT) {
      return (<input type="text" onChange={this.props.onChange(this.props.name)} />)
    }
    else if (this.props.type == ComponentType.RADIO) {
      return (<input type="radio" name={this.props.name} value={this.props.value} onChange={this.props.onChange(this.props.name)} />)
    }
    else if (this.props.type == ComponentType.CHECKBOX) {
      return (<input type="checkbox" onChange={this.props.onChange(this.props.name)} />)
    }
    else if (this.props.type == ComponentType.NUMERIC) {
      return (
        <NumericInput
          name={this.props.name}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={1}
          onChange={this.props.onChange(this.props.name)} />
      )
    }
    else if (this.props.type == ComponentType.SELECT) {
      return (
        <Select
          name={this.props.name}
          options={this.props.options}
          value={this.props.value}
          onChange={this.props.onChange(this.props.name)} />
      )
    }
    else if (this.props.type == ComponentType.MULTI_SELECT) {
      return (
        <Select
          multi
          name={this.props.name}
          options={this.props.options}
          value={this.props.value}
          onChange={this.props.onChange(this.props.name)} />
      )
    }
    else if (this.props.type == ComponentType.SLIDER) {
      return (
        <Slider
          name={this.props.name}
          min={1}
          max={5}
          marks={{
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5'
          }}
          value={this.props.value}
          onChange={this.props.onChange(this.props.name)} />
      )
    }
    else {
      return null
    }
  }
}

class Question extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="question-row">
        <label className="question-label">{this.props.label}</label>
        <div className="question-input">
          <Field
            type={this.props.type}
            name={this.props.name}
            options={this.props.options || []}
            onChange={this.props.onChange}
            min={this.props.min}
            max={this.props.max}
            value={this.props.value} />
        </div>
      </div>
    )
  }
}

export { Field, Question };
