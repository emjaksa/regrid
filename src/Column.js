/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import s from './Grid.scss'

class Column extends Component {
  static propTypes = {
    dataKey: PropTypes.string.isRequired,
    header: PropTypes.string,
    children: PropTypes.func,
    width: PropTypes.number,
    flexGrow: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['inherit', 'initial'])
    ]),
    flexShrink: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['inherit', 'initial'])
    ]),
    flexBasis: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['inherit', 'initial', 'auto'])
    ])
  }

  static defaultProps = {
    flexGrow: 1
  }

  static contextTypes = {
    isHeader: PropTypes.bool,
    rowHeight: PropTypes.number,
    rowIndex: PropTypes.number,
    record: PropTypes.object,
  }

  state = {
    width: this.props.width
  }

  componentWillReceiveProps(nextProps) {
    const { width: nextWidth } = nextProps
    const { width } = this.props
    if (nextProps !== width) {
      this.setState({
        width: nextWidth
      })
    }
  }

  render() {
    const { isHeader, record, rowHeight } = this.context
    const { header, dataKey, flexGrow, flexShrink, flexBasis } = this.props
    const { width } = this.state
    const style = {
      lineHeight: `${rowHeight}px`,
      flexGrow: width ? 0 : flexGrow,
      flexShrink,
      flexBasis: width ? width : flexBasis,
      width,
    }

    return (
      <div
        className={s.column}
        ref={node => {
          this.column = node
        }}
        tabIndex={isHeader ? 1 : 0}
        style={style}
      >
        <span className={s.columnInner}>
          {isHeader && header}
          {!isHeader && record && record[dataKey]}
        </span>
      </div>
    )
  }
}

export default Column
