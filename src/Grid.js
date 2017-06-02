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
    height: PropTypes.number,
    width: PropTypes.number,
    id: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    rowHeight: 30,
    data: []
  }

  static childContextTypes = {
    rowHeight: PropTypes.number,
    columnWidths: PropTypes.object,
    setColumnWidth: PropTypes.func,
    id: PropTypes.string
  }

  state = {
    hasScrollbar: false,
    columnWidths: {},
    translateX: 0
  }

  getChildContext() {
    const { rowHeight, id } = this.props
    const { columnWidths } = this.state
    return {
      id,
      rowHeight,
      columnWidths,
      setColumnWidth: this.setColumnWidth
    }
  }

  setColumnWidth = (key, width) => {
    const { columnWidths } = this.state
    this.setState({
      columnWidths: {
        ...columnWidths,
        [key]: width
      }
    })
  }

  setHasScrollbar = hasScrollbar => {
    this.setState({
      hasScrollbar
    })
  }

  setScrollHeight = (height) => {
    let scrollHeight = height
    if (height === 0) {
      const { rowHeight } = this.props
      scrollHeight = rowHeight
    }
    this.setState({ scrollHeight })
  }

  setGridState = (state, cb) => {
    this.setState(state, cb)
  }

  getRecord = index => {
    const { data } = this.props
    return data[index]
  }

  onScroll = (e) => {
    this.setState({ translateX: e.target.scrollLeft })
  }

  render() {
    const { children, data, rowCount: rowCountProp, rowHeight, height, width } = this.props
    const { hasScrollbar, columnWidths, scrollHeight, translateX } = this.state
    const rowCount = rowCountProp || data.length
    const newChildren = Children.map(children, child => React.cloneElement(child, {
      width: columnWidths[child.props.dataKey] ? columnWidths[child.props.dataKey] : child.props.width
    }))
    const style = {
      height,
      width,
      minWidth: width
    }
    return (
      <div className={s.grid} style={style}>
        <GridHeader translateX={translateX} hasScrollbar={hasScrollbar}>{newChildren}</GridHeader>
        <GridBody
          onScroll={this.onScroll}
          setGridState={this.setGridState}
          rowCount={rowCount}
          rowHeight={rowHeight}
          scrollHeight={scrollHeight}
          getRecord={this.getRecord}
        >{newChildren}</GridBody>
      </div>
    )
  }
}

export default Grid
