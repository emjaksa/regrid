/* eslint-disable */
import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'

import s from './Grid.scss'
import GridHeader from './GridHeader'
import GridBody from './GridBody'

class Grid extends Component {

  static propTypes = {
    children: childPropTypes,
    rowCount: PropTypes.number,
    rowHeight: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    rowHeight: 30,
    data: []
  }

  static childContextTypes = {
    rowHeight: PropTypes.number.isRequired,
  }

  state = {
    hasScrollbar: false
  }

  getChildContext() {
    const { rowHeight } = this.props
    return {
      rowHeight
    }
  }

  setHasScrollbar = hasScrollbar => {
    this.setState({
      hasScrollbar
    })
  }

  getRecord = index => {
    const { data } = this.props
    return data[index]
  }

  render() {
    const { children, data, rowCount: rowCountProp, rowHeight } = this.props
    const { hasScrollbar } = this.state
    const rowCount = rowCountProp || data.length
    return (
      <div className={s.grid}>
        <GridHeader hasScrollbar={hasScrollbar}>{children}</GridHeader>
        <GridBody
          setHasScrollbar={this.setHasScrollbar}
          rowCount={rowCount}
          rowHeight={rowHeight}
          getRecord={this.getRecord}
        >{children}</GridBody>
      </div>
    )
  }
}

export default Grid
