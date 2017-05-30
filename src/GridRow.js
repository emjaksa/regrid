/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'

import s from './Grid.scss'

class GridRow extends Component {
  static propTypes = {
    rowIndex: PropTypes.number.isRequired,
    record: PropTypes.object.isRequired,
    children: childPropTypes
  }

  static childContextTypes = {
    record: PropTypes.object.isRequired,
    rowIndex: PropTypes.number.isRequired,
  }

  getChildContext() {
    const { rowIndex, record } = this.props
    return {
      rowIndex,
      record
    }
  }

  render() {
    const { children } = this.props
    return (
      <div
        className={s.row}
      >
        {children}
      </div>
    )
  }
}

export default GridRow
