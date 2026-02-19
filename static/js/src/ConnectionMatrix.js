import React from 'react';

// Matrix cell states: 0 = none, 1 = strong, 2 = weak
var NONE = 0;
var STRONG = 1;
var WEAK = 2;

class ConnectionMatrix extends React.Component {
  constructor() {
    super();
    this.onCellClick = this.onCellClick.bind(this);
  }

  getCellState(i, j) {
    // Check strong
    for (var k = 0; k < this.props.strongMatrix[i].length; k++) {
      if (this.props.strongMatrix[i][k].value === j) return STRONG;
    }
    // Check weak
    for (var k = 0; k < this.props.weakMatrix[i].length; k++) {
      if (this.props.weakMatrix[i][k].value === j) return WEAK;
    }
    return NONE;
  }

  onCellClick(i, j) {
    var self = this;
    return function (e) {
      e.preventDefault();
      var current = self.getCellState(i, j);
      var nameI = self.props.connections[i].connectionName;
      var nameJ = self.props.connections[j].connectionName;

      if (current === NONE) {
        // Add to strong for i
        var newStrong = self.props.strongMatrix[i].slice();
        newStrong.push({ value: j, label: nameJ });
        self.props.updateStrongMatrix(i, newStrong);
      } else if (current === STRONG) {
        // Remove from strong, add to weak
        var newStrong = self.props.strongMatrix[i].filter(function (x) { return x.value !== j; });
        self.props.updateStrongMatrix(i, newStrong);
        var newWeak = self.props.weakMatrix[i].slice();
        newWeak.push({ value: j, label: nameJ });
        self.props.updateWeakMatrix(i, newWeak);
      } else {
        // Remove from weak (back to none)
        var newWeak = self.props.weakMatrix[i].filter(function (x) { return x.value !== j; });
        self.props.updateWeakMatrix(i, newWeak);
      }
    };
  }

  render() {
    var connections = this.props.connections;
    var namedConnections = [];
    for (var i = 0; i < connections.length; i++) {
      if (connections[i].connectionName) {
        namedConnections.push({ index: i, name: connections[i].connectionName });
      }
    }

    if (namedConnections.length === 0) {
      return (
        <div className="wizard-step-content">
          <h3 className="wizard-step-title">Who Knows Who?</h3>
          <p className="wizard-step-desc">Please add and name connections in Step 2 first.</p>
        </div>
      );
    }

    var self = this;

    return (
      <div className="wizard-step-content">
        <h3 className="wizard-step-title">Who Knows Who?</h3>
        <p className="wizard-step-desc">Click cells to indicate relationships between your connections. Connections auto-mirror: click A→B and B→A fills too.</p>

        <div className="matrix-legend">
          <div className="matrix-legend-item">
            <span className="matrix-legend-swatch matrix-none" />
            <span>No connection</span>
          </div>
          <div className="matrix-legend-item">
            <span className="matrix-legend-swatch matrix-strong" />
            <span>Strong tie</span>
          </div>
          <div className="matrix-legend-item">
            <span className="matrix-legend-swatch matrix-weak" />
            <span>Weak tie</span>
          </div>
          <p className="matrix-legend-hint">Click to cycle: None → Strong → Weak → None</p>
        </div>

        <div className="matrix-scroll-wrapper">
          <table className="matrix-grid">
            <thead>
              <tr>
                <th className="matrix-corner" />
                {namedConnections.map(function (nc) {
                  return (
                    <th key={'h-' + nc.index} className="matrix-col-header">
                      <span className="matrix-col-label">{nc.name}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {namedConnections.map(function (rowNC) {
                return (
                  <tr key={'r-' + rowNC.index}>
                    <td className="matrix-row-header">{rowNC.name}</td>
                    {namedConnections.map(function (colNC) {
                      if (rowNC.index === colNC.index) {
                        return <td key={'c-' + colNC.index} className="matrix-cell matrix-self">—</td>;
                      }
                      var state = self.getCellState(rowNC.index, colNC.index);
                      var cls = 'matrix-cell';
                      if (state === STRONG) cls += ' matrix-cell-strong';
                      else if (state === WEAK) cls += ' matrix-cell-weak';

                      return (
                        <td
                          key={'c-' + colNC.index}
                          className={cls}
                          onClick={self.onCellClick(rowNC.index, colNC.index)}
                          title={rowNC.name + ' ↔ ' + colNC.name + ': ' + (state === STRONG ? 'Strong' : state === WEAK ? 'Weak' : 'None')}
                        >
                          {state === STRONG ? '●' : state === WEAK ? '○' : ''}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { ConnectionMatrix };
