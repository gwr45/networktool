import React from 'react';
import { ConnectionCard } from './ConnectionCard';

class ConnectionForm extends React.Component {
  constructor() {
    super();
    this.onAddConnection = this.onAddConnection.bind(this);
  }

  onAddConnection(e) {
    e.preventDefault();
    this.props.onAddConnection();
  }

  render() {
    var connections = this.props.connections;
    var namedCount = 0;
    for (var i = 0; i < connections.length; i++) {
      if (connections[i].connectionName) {
        namedCount++;
      }
    }

    var cards = [];
    for (var i = 0; i < connections.length; i++) {
      cards.push(
        <ConnectionCard
          key={i}
          connectionId={i}
          connection={connections[i]}
          onChange={this.props.onChange}
          onRemove={connections.length > 1 ? this.props.onRemove : null}
        />
      );
    }

    return (
      <div className="wizard-step-content">
        <h3 className="wizard-step-title">Add Your Connections</h3>
        <p className="wizard-step-desc">Add at least 10 people from your professional network. Click each card to expand and fill in details.</p>

        <div className="connections-toolbar">
          <div className="connections-progress">
            <span className="connections-count">{namedCount}</span> of <span className="connections-target">10</span> connections named
            <div className="connections-progress-bar">
              <div className="connections-progress-fill" style={{ width: Math.min(namedCount / 10 * 100, 100) + '%' }} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.onAddConnection} type="button">
            + Add Connection
          </button>
        </div>

        <div className="connections-list">
          {cards}
        </div>

        <div className="connections-add-bottom">
          <button className="btn btn-secondary" onClick={this.onAddConnection} type="button">
            + Add Another Connection
          </button>
        </div>
      </div>
    );
  }
}

export { ConnectionForm };
