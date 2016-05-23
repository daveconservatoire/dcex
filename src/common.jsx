import React from 'react';

export const RadioState = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    target: React.PropTypes.object
  },

  updateState() {
    const ns = {};
    ns[this.props.name] = this.props.value;
    this.props.target.setState(ns);
  },

  render() {
    const p = this.props;
    const targetValue = p.target.state[p.name];

    return <input type="radio" name={p.name} value={p.value} onChange={this.updateState} checked={targetValue == p.value} />;
  }
});
