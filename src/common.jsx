import React from 'react';

export const ProgressBar = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired
  },

  render() {
    const {value, max} = this.props;
    const pct = value / max * 100;

    return (
      <div className="progress progress-striped active success" style={{margin: 20}}>
        <div className="bar" style={{width: pct + "%"}}></div>
      </div>
    );
  }
});

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

export const KeyHandler = React.createClass({
  propTypes: {
    onKeyHandler: React.PropTypes.func.isRequired
  },

  handleKey(e) {
    this.props.onKeyHandler(e);
  },

  componentDidMount() {
    document.body.addEventListener("keypress", this.handleKey);
  },

  componentWillUnmount() {
    document.body.removeEventListener("keypress", this.handleKey);
  },

  render() {
    return <noscript />
  }
});
