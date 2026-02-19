import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import Slider from 'rc-slider';

import { ComponentType, Resource, Strength, Context, Rank, Frequency } from './Constants';
import { Connection } from './Connection';
import { Field, Question } from './Fields';
import { Questionnaire } from './Questionnaire';
import { ConnectionForm } from './ConnectionForm';
import { ConnectionMatrix } from './ConnectionMatrix';
import { WizardContainer } from './WizardContainer';
import { ReviewStep } from './ReviewStep';

class Application extends React.Component {
  constructor() {
    super()
    this.state = {
      currentStep: 1,
      name: null,
      age: 30,
      gender: null,
      workExperience: 10,
      countriesLived: 2,
      networkDiversity: 1.0,
      networkObligation: 1.0,
      eliteNetwork: 1.0,
      technicalNetwork: 1.0,
      guidanceNetwork: 1.0,
      financialNetwork: 1.0,
      connections: [], // connections are indexed by their ID
      connectionStrongMatrix: [], // list of list of connection indices (strong) 
      connectionWeakMatrix: [] // list of list of connection indices (weak)
    }
    this.onQuestionnaireFieldChange = this.onQuestionnaireFieldChange.bind(this)
    this.onAddConnection = this.onAddConnection.bind(this)
    this.onRemoveConnection = this.onRemoveConnection.bind(this)
    this.onConnectionFieldChange = this.onConnectionFieldChange.bind(this)
    this.updateStrongMatrix = this.updateStrongMatrix.bind(this)
    this.updateWeakMatrix = this.updateWeakMatrix.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.goToStep = this.goToStep.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onAddConnection()
  }

  goToStep(step) {
    this.setState({ currentStep: step });
  }

  onNext() {
    var step = this.state.currentStep;
    if (step === 1) {
      // Validate name
      if (!this.state.name || this.state.name.trim() === '') {
        alert('Please enter your name before continuing.');
        return;
      }
    }
    if (step < 4) {
      this.setState({ currentStep: step + 1 });
    }
  }

  onBack() {
    if (this.state.currentStep > 1) {
      this.setState({ currentStep: this.state.currentStep - 1 });
    }
  }

  onQuestionnaireFieldChange(key) {
    /* Returns a function that accepts a 'val' and maps the key to the val in state. */
    return val => {
      let value = val;
      // handle special case of text input
      if (typeof val.target != "undefined") {
        value = val.target.value;
      }
      this.state[key] = value;
      this.setState(this.state)
    }
  }

  onAddConnection() {

    // Add connection to connections array

    let newId = this.state.connections.length;
    this.state.connections.push(new Connection(newId));

    /** Update connections matrix **/

    this.state.connectionStrongMatrix.push([])
    this.state.connectionWeakMatrix.push([])
    this.setState(this.state); // force re-rendering
  }

  onRemoveConnection(connectionId) {
    if (this.state.connections.length <= 1) return;

    // Remove connected entries from matrices
    var newConnections = [];
    var newStrong = [];
    var newWeak = [];

    for (var i = 0; i < this.state.connections.length; i++) {
      if (i === connectionId) continue;
      newConnections.push(this.state.connections[i]);

      // Filter out references to the removed connection and remap indices
      var sRow = [];
      for (var j = 0; j < this.state.connectionStrongMatrix[i].length; j++) {
        var entry = this.state.connectionStrongMatrix[i][j];
        if (entry.value !== connectionId) {
          sRow.push({
            value: entry.value > connectionId ? entry.value - 1 : entry.value,
            label: entry.label
          });
        }
      }
      newStrong.push(sRow);

      var wRow = [];
      for (var j = 0; j < this.state.connectionWeakMatrix[i].length; j++) {
        var entry = this.state.connectionWeakMatrix[i][j];
        if (entry.value !== connectionId) {
          wRow.push({
            value: entry.value > connectionId ? entry.value - 1 : entry.value,
            label: entry.label
          });
        }
      }
      newWeak.push(wRow);
    }

    this.setState({
      connections: newConnections,
      connectionStrongMatrix: newStrong,
      connectionWeakMatrix: newWeak
    });
  }

  onConnectionFieldChange(connectionId, field, value) {
    // value is sometimes a vanilla value, sometimes a JS event
    let val = null;
    if (value.target) {
      val = value.target.value;
    }
    else {
      val = value;
    }
    this.state.connections[connectionId][field] = val;

    // need to update matrix if name changed
    if (field == 'connectionName' && val != '') {
      for (let i = 0; i < this.state.connectionStrongMatrix.length; i++) {
        for (let j = 0; j < this.state.connectionStrongMatrix[i].length; j++) {
          if (this.state.connectionStrongMatrix[i][j].value == connectionId) {
            this.state.connectionStrongMatrix[i][j].label = val;
          }
        }
      }
      for (let i = 0; i < this.state.connectionWeakMatrix.length; i++) {
        for (let j = 0; j < this.state.connectionWeakMatrix[i].length; j++) {
          if (this.state.connectionWeakMatrix[i][j].value == connectionId) {
            this.state.connectionWeakMatrix[i][j].label = val;
          }
        }
      }
    }

    this.setState(this.state); // force rerendering
  }

  updateStrongMatrix(i, val) {
    this.state.connectionStrongMatrix[i] = val;
    let myName = this.state.connections[i].connectionName;
    // update the other connection's entry in the matrix as well, remove from weak if necessary
    for (let j = 0; j < val.length; j++) {
      let id = val[j].value;

      // remove connection from weak

      for (let k = 0; k < this.state.connectionWeakMatrix[i].length; k++) {
        if (this.state.connectionWeakMatrix[i][k].value == id) {
          this.state.connectionWeakMatrix[i].splice(k, 1);
        }
      }

      // add symmetric connection to strong

      let alreadyExists = false;
      for (let k = 0; k < this.state.connectionStrongMatrix[id].length; k++) {
        if (this.state.connectionStrongMatrix[id][k].value == i) {
          alreadyExists = true;
        }
      }
      if (!alreadyExists) {
        this.state.connectionStrongMatrix[id].push({ value: i, label: myName });
      }

      // remove symmetric connection from weak

      for (let k = 0; k < this.state.connectionWeakMatrix[id].length; k++) {
        if (this.state.connectionWeakMatrix[id][k].value == i) {
          this.state.connectionWeakMatrix[id].splice(k, 1);
        }
      }
    }
    this.setState(this.state); // force rerendering
  }

  updateWeakMatrix(i, val) {
    this.state.connectionWeakMatrix[i] = val;
    let myName = this.state.connections[i].connectionName;
    // update the other connection's entry in the matrix as well, remove from strong if necessary
    for (let j = 0; j < val.length; j++) {

      // remove connection from strong 

      let id = val[j].value;
      for (let k = 0; k < this.state.connectionStrongMatrix[i].length; k++) {
        if (this.state.connectionStrongMatrix[i][k].value == id) {
          this.state.connectionStrongMatrix[i].splice(k, 1);
        }
      }

      // add symmetric connection to weak

      let alreadyExists = false;
      for (let k = 0; k < this.state.connectionWeakMatrix[id].length; k++) {
        if (this.state.connectionWeakMatrix[id][k].value == i) {
          alreadyExists = true;
        }
      }
      if (!alreadyExists) {
        this.state.connectionWeakMatrix[id].push({ value: i, label: myName });
      }

      // remove symmetric connection from strong

      for (let k = 0; k < this.state.connectionStrongMatrix[id].length; k++) {
        if (this.state.connectionStrongMatrix[id][k].value == i) {
          this.state.connectionStrongMatrix[id].splice(k, 1);
        }
      }

    }
    this.setState(this.state); // force rerendering
  }

  onSubmit() {
    let connectionsWithName = 0;
    for (let i = 0; i < this.state.connections.length; i++) {
      if (this.state.connections[i].connectionName) {
        connectionsWithName += 1;
      }
    }
    if (connectionsWithName >= 10) {
      const statusEl = document.getElementById('status');
      const submitBtn = document.getElementById('submitButton');
      if (statusEl) statusEl.style.display = 'block';
      if (submitBtn) submitBtn.disabled = true;

      fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: this.state })
      })
        .then(response => response.text())
        .then(html => {
          document.body.innerHTML = html;
        })
        .catch(err => {
          console.error('Submission error:', err);
          if (statusEl) statusEl.textContent = 'An error occurred. Please try again.';
          if (submitBtn) submitBtn.disabled = false;
        });
    }
    else {
      alert("You must name at least ten connections.");
    }
  }

  render() {
    var step = this.state.currentStep;

    var stepContent = null;
    if (step === 1) {
      stepContent = (
        <Questionnaire
          onChange={this.onQuestionnaireFieldChange}
          data={this.state} />
      );
    } else if (step === 2) {
      stepContent = (
        <ConnectionForm
          onAddConnection={this.onAddConnection}
          onRemove={this.onRemoveConnection}
          onChange={this.onConnectionFieldChange}
          connections={this.state.connections} />
      );
    } else if (step === 3) {
      stepContent = (
        <ConnectionMatrix
          strongMatrix={this.state.connectionStrongMatrix}
          weakMatrix={this.state.connectionWeakMatrix}
          connections={this.state.connections}
          updateStrongMatrix={this.updateStrongMatrix}
          updateWeakMatrix={this.updateWeakMatrix}
        />
      );
    } else if (step === 4) {
      stepContent = (
        <ReviewStep
          data={this.state}
          connections={this.state.connections}
          strongMatrix={this.state.connectionStrongMatrix}
          weakMatrix={this.state.connectionWeakMatrix}
          onSubmit={this.onSubmit}
          goToStep={this.goToStep}
        />
      );
    }

    return (
      <WizardContainer
        currentStep={step}
        connections={this.state.connections}
        onNext={this.onNext}
        onBack={this.onBack}
        goToStep={this.goToStep}
      >
        {stepContent}
      </WizardContainer>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById("container")
)
