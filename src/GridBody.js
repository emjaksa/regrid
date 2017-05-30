/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'

import s from './Grid.scss'
import GridRow from './GridRow'

class GridBody extends Component {
  static propTypes = {
    rowCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    getRecord: PropTypes.func.isRequired,
    setHasScrollbar: PropTypes.func.isRequired,
    children: childPropTypes,
  }

  state = {
    scrollTop: 0
  }

  handleScroll = (e) => {
    this.setState({
      scrollTop: e.target.scrollTop,
    })
  }

  hasScrollbar = false

  componentDidMount() {
    const { setHasScrollbar, rowCount, rowHeight } = this.props
    const targetRect = this.scrollElement.getBoundingClientRect()
    const totalHeight = rowCount * rowHeight
    const scrollHeight = targetRect.height

    if (totalHeight > scrollHeight) {
      this.hasScrollbar = true
      setHasScrollbar(true)
    }

    this.setState({
      scrollHeight
    })
  }

  componentDidUpdate() {
    const { setHasScrollbar, rowCount, rowHeight } = this.props
    const totalHeight = rowCount * rowHeight
    const { scrollHeight } = this.state

    if ((totalHeight > scrollHeight) !== this.hasScrollbar) {
      setHasScrollbar(totalHeight > scrollHeight)
    }
  }

  render() {
    const { scrollTop, scrollHeight } = this.state
    const { rowCount, rowHeight, getRecord, children } = this.props
    const totalHeight = rowCount * rowHeight

    const items = []

    const scrollBottom = scrollHeight + scrollTop

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 5)
    const endIndex = Math.min(rowCount, Math.ceil(scrollBottom / rowHeight) + 5)

    //console.log(startIndex);
    let index = startIndex
    while (index < endIndex) {
      const record = getRecord(index)
      items.push(
        <GridRow
          key={index}
          record={record}
          rowIndex={index}
        >{children}</GridRow>
      )
      index++
    }

    return (
      <div
        className={s.body}
        ref={(e) => {
          this.scrollElement = e
        }}
        tabIndex={2}
        style={{ height: 300, overflow: 'auto' }}
        onScroll={this.handleScroll}
      >
        <div style={{ height: totalHeight }}>
          <div style={{ transform: `translateY(${startIndex * rowHeight}px)` }}>
            {items}
          </div>
        </div>
      </div>
    )
  }
}

export default GridBody
