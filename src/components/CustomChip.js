import React, { Component } from 'react';

export default class CustomChip extends Component {

  static defaultProps = {
    selected: false,
    onRemove: () => {},
    index: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  render() {
    const { selected, children, index, onRemove } = this.props;

    const styles = {
      selected: {
        background: '#666',
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        height: 25,
        boxSizing: 'border-box',
        color: '#fff',
        fontWeight: 'normal',
        background: '#172B4D',
        margin: '2.5px 2.5px 2.5px 0px',
        borderRadius: 3,
        cursor: 'default',
        borderColor: '#172B4D'
      },
      text: {
        fontSize: 15,
        boxSizing: 'border-box',
        padding: '5px',
        position: 'relative',
        top: '-2px'
      },
      remove: {
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: 14,
        width: 18,
        height: 18,
        color: '#fff'
      }
    };
    return (
      <div style={selected ? { ...styles.container, ...styles.selected } : styles.container}>
        <div style={styles.text}>{children}</div>
        <div role="button" tabIndex="0" style={styles.remove} onClick={() => onRemove(index)}>&times;</div>
      </div>
    );
  }
}