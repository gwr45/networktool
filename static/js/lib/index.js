'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactNumericInput = require('react-numeric-input');

var _reactNumericInput2 = _interopRequireDefault(_reactNumericInput);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _Constants = require('./Constants');

var _Connection = require('./Connection');

var _Fields = require('./Fields');

var _Questionnaire = require('./Questionnaire');

var _ConnectionForm = require('./ConnectionForm');

var _ConnectionMatrix = require('./ConnectionMatrix');

var _WizardContainer = require('./WizardContainer');

var _ReviewStep = require('./ReviewStep');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_React$Component) {
  _inherits(Application, _React$Component);

  function Application() {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

    _this.state = {
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
    };
    _this.onQuestionnaireFieldChange = _this.onQuestionnaireFieldChange.bind(_this);
    _this.onAddConnection = _this.onAddConnection.bind(_this);
    _this.onRemoveConnection = _this.onRemoveConnection.bind(_this);
    _this.onConnectionFieldChange = _this.onConnectionFieldChange.bind(_this);
    _this.updateStrongMatrix = _this.updateStrongMatrix.bind(_this);
    _this.updateWeakMatrix = _this.updateWeakMatrix.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.goToStep = _this.goToStep.bind(_this);
    _this.onNext = _this.onNext.bind(_this);
    _this.onBack = _this.onBack.bind(_this);
    _this.onAddConnection();
    return _this;
  }

  _createClass(Application, [{
    key: 'goToStep',
    value: function goToStep(step) {
      this.setState({ currentStep: step });
    }
  }, {
    key: 'onNext',
    value: function onNext() {
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
  }, {
    key: 'onBack',
    value: function onBack() {
      if (this.state.currentStep > 1) {
        this.setState({ currentStep: this.state.currentStep - 1 });
      }
    }
  }, {
    key: 'onQuestionnaireFieldChange',
    value: function onQuestionnaireFieldChange(key) {
      var _this2 = this;

      /* Returns a function that accepts a 'val' and maps the key to the val in state. */
      return function (val) {
        var value = val;
        // handle special case of text input
        if (typeof val.target != "undefined") {
          value = val.target.value;
        }
        _this2.state[key] = value;
        _this2.setState(_this2.state);
      };
    }
  }, {
    key: 'onAddConnection',
    value: function onAddConnection() {

      // Add connection to connections array

      var newId = this.state.connections.length;
      this.state.connections.push(new _Connection.Connection(newId));

      /** Update connections matrix **/

      this.state.connectionStrongMatrix.push([]);
      this.state.connectionWeakMatrix.push([]);
      this.setState(this.state); // force re-rendering
    }
  }, {
    key: 'onRemoveConnection',
    value: function onRemoveConnection(connectionId) {
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
  }, {
    key: 'onConnectionFieldChange',
    value: function onConnectionFieldChange(connectionId, field, value) {
      // value is sometimes a vanilla value, sometimes a JS event
      var val = null;
      if (value.target) {
        val = value.target.value;
      } else {
        val = value;
      }
      this.state.connections[connectionId][field] = val;

      // need to update matrix if name changed
      if (field == 'connectionName' && val != '') {
        for (var i = 0; i < this.state.connectionStrongMatrix.length; i++) {
          for (var j = 0; j < this.state.connectionStrongMatrix[i].length; j++) {
            if (this.state.connectionStrongMatrix[i][j].value == connectionId) {
              this.state.connectionStrongMatrix[i][j].label = val;
            }
          }
        }
        for (var _i = 0; _i < this.state.connectionWeakMatrix.length; _i++) {
          for (var _j = 0; _j < this.state.connectionWeakMatrix[_i].length; _j++) {
            if (this.state.connectionWeakMatrix[_i][_j].value == connectionId) {
              this.state.connectionWeakMatrix[_i][_j].label = val;
            }
          }
        }
      }

      this.setState(this.state); // force rerendering
    }
  }, {
    key: 'updateStrongMatrix',
    value: function updateStrongMatrix(i, val) {
      this.state.connectionStrongMatrix[i] = val;
      var myName = this.state.connections[i].connectionName;
      // update the other connection's entry in the matrix as well, remove from weak if necessary
      for (var j = 0; j < val.length; j++) {
        var id = val[j].value;

        // remove connection from weak

        for (var k = 0; k < this.state.connectionWeakMatrix[i].length; k++) {
          if (this.state.connectionWeakMatrix[i][k].value == id) {
            this.state.connectionWeakMatrix[i].splice(k, 1);
          }
        }

        // add symmetric connection to strong

        var alreadyExists = false;
        for (var _k = 0; _k < this.state.connectionStrongMatrix[id].length; _k++) {
          if (this.state.connectionStrongMatrix[id][_k].value == i) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          this.state.connectionStrongMatrix[id].push({ value: i, label: myName });
        }

        // remove symmetric connection from weak

        for (var _k2 = 0; _k2 < this.state.connectionWeakMatrix[id].length; _k2++) {
          if (this.state.connectionWeakMatrix[id][_k2].value == i) {
            this.state.connectionWeakMatrix[id].splice(_k2, 1);
          }
        }
      }
      this.setState(this.state); // force rerendering
    }
  }, {
    key: 'updateWeakMatrix',
    value: function updateWeakMatrix(i, val) {
      this.state.connectionWeakMatrix[i] = val;
      var myName = this.state.connections[i].connectionName;
      // update the other connection's entry in the matrix as well, remove from strong if necessary
      for (var j = 0; j < val.length; j++) {

        // remove connection from strong 

        var id = val[j].value;
        for (var k = 0; k < this.state.connectionStrongMatrix[i].length; k++) {
          if (this.state.connectionStrongMatrix[i][k].value == id) {
            this.state.connectionStrongMatrix[i].splice(k, 1);
          }
        }

        // add symmetric connection to weak

        var alreadyExists = false;
        for (var _k3 = 0; _k3 < this.state.connectionWeakMatrix[id].length; _k3++) {
          if (this.state.connectionWeakMatrix[id][_k3].value == i) {
            alreadyExists = true;
          }
        }
        if (!alreadyExists) {
          this.state.connectionWeakMatrix[id].push({ value: i, label: myName });
        }

        // remove symmetric connection from strong

        for (var _k4 = 0; _k4 < this.state.connectionStrongMatrix[id].length; _k4++) {
          if (this.state.connectionStrongMatrix[id][_k4].value == i) {
            this.state.connectionStrongMatrix[id].splice(_k4, 1);
          }
        }
      }
      this.setState(this.state); // force rerendering
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      var connectionsWithName = 0;
      for (var i = 0; i < this.state.connections.length; i++) {
        if (this.state.connections[i].connectionName) {
          connectionsWithName += 1;
        }
      }
      if (connectionsWithName >= 10) {
        var statusEl = document.getElementById('status');
        var submitBtn = document.getElementById('submitButton');
        if (statusEl) statusEl.style.display = 'block';
        if (submitBtn) submitBtn.disabled = true;

        fetch('/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData: this.state })
        }).then(function (response) {
          return response.text();
        }).then(function (html) {
          document.body.innerHTML = html;
        }).catch(function (err) {
          console.error('Submission error:', err);
          if (statusEl) statusEl.textContent = 'An error occurred. Please try again.';
          if (submitBtn) submitBtn.disabled = false;
        });
      } else {
        alert("You must name at least ten connections.");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var step = this.state.currentStep;

      var stepContent = null;
      if (step === 1) {
        stepContent = _react2.default.createElement(_Questionnaire.Questionnaire, {
          onChange: this.onQuestionnaireFieldChange,
          data: this.state });
      } else if (step === 2) {
        stepContent = _react2.default.createElement(_ConnectionForm.ConnectionForm, {
          onAddConnection: this.onAddConnection,
          onRemove: this.onRemoveConnection,
          onChange: this.onConnectionFieldChange,
          connections: this.state.connections });
      } else if (step === 3) {
        stepContent = _react2.default.createElement(_ConnectionMatrix.ConnectionMatrix, {
          strongMatrix: this.state.connectionStrongMatrix,
          weakMatrix: this.state.connectionWeakMatrix,
          connections: this.state.connections,
          updateStrongMatrix: this.updateStrongMatrix,
          updateWeakMatrix: this.updateWeakMatrix
        });
      } else if (step === 4) {
        stepContent = _react2.default.createElement(_ReviewStep.ReviewStep, {
          data: this.state,
          connections: this.state.connections,
          strongMatrix: this.state.connectionStrongMatrix,
          weakMatrix: this.state.connectionWeakMatrix,
          onSubmit: this.onSubmit,
          goToStep: this.goToStep
        });
      }

      return _react2.default.createElement(
        _WizardContainer.WizardContainer,
        {
          currentStep: step,
          connections: this.state.connections,
          onNext: this.onNext,
          onBack: this.onBack,
          goToStep: this.goToStep
        },
        stepContent
      );
    }
  }]);

  return Application;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Application, null), document.getElementById("container"));