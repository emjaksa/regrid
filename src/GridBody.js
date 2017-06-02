/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'
import _ from 'lodash'

import s from './Grid.scss'
import GridRow from './GridRow'

class GridBody extends Component {
  static propTypes = {
    rowCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    getRecord: PropTypes.func.isRequired,
    setGridState: PropTypes.func.isRequired,
    children: childPropTypes,
  }

  state = {
    scrollTop: 0
  }

  handleVirtualScroll = _.throttle((e) => {
    this.setState({
      scrollTop: e.target.scrollTop,
    })
  }, 250)

  onScroll = e => {
    const { onScroll } = this.props
    onScroll(e)
    this.setState({
      scrollTop: e.target.scrollTop,
    })
    /*    e.persist()
     this.handleVirtualScroll(e)*/
  }

  componentDidMount() {
    const { setGridState, rowCount, rowHeight } = this.props
    setTimeout(() => {
      const targetRect = this.scrollElement.getBoundingClientRect()
      const totalHeight = rowCount * rowHeight
      const scrollHeight = targetRect.height

      this.setState({ scrollHeight, componentDidMount: true }, () => {
        setGridState({
          hasScrollbar: totalHeight > scrollHeight && scrollHeight > rowHeight
        })
      })
    }, 0)
  }

  getRendedRows = (startIndex, endIndex) => {
    const { getRecord, children } = this.props
    const items = []
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
    return items
  }

  render() {
    const { scrollTop, componentDidMount, scrollHeight } = this.state
    const { rowCount, rowHeight } = this.props
    const totalHeight = rowCount * rowHeight

    let items = []
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 5)
    // console.log(componentDidMount, scrollHeight)
    if (scrollHeight && scrollHeight > rowHeight) {
      const scrollBottom = scrollHeight + scrollTop
      const endIndex = Math.min(rowCount, Math.ceil(scrollBottom / rowHeight) + 5)
      items = this.getRendedRows(startIndex, endIndex)
    } else if (componentDidMount && !scrollHeight || componentDidMount && scrollHeight < rowHeight) {
      items = this.getRendedRows(0, rowCount)
    }

    return (
      <div
        className={s.body}
        ref={(e) => {
          this.scrollElement = e
        }}
        style={{ overflow: 'auto', flex: scrollHeight < rowHeight ? 'none' : null }}
        onScroll={this.onScroll}
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
