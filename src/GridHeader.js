/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'
import ScrollbarSize from 'react-scrollbar-size'

import s from './Grid.scss'

class GridHeader extends Component {
  static propTypes = {
    children: childPropTypes,
    hasScrollbar: PropTypes.bool
  }

  static defaultProps = {
    hasScrollbar: false
  }

  static childContextTypes = {
    isHeader: PropTypes.bool
  }

  getChildContext() {
    return {
      isHeader: true
    }
  }

  state = {
    scrollbarWidth: null
  }

  scrollbarSizeLoad = (measurements) => {
    this.setState({
      scrollbarWidth: measurements.scrollbarWidth
    })
  }

  scrollbarSizeChange = (measurements) => {
    this.setState({
      scrollbarWidth: measurements.scrollbarWidth
    })
  }

  render() {
    const { children, hasScrollbar, translateX } = this.props
    const { scrollbarWidth } = this.state
    return (
      <div
        className={s.header}
        style={{ paddingRight: hasScrollbar ? scrollbarWidth : null }}
      >
        <ScrollbarSize
          onLoad={this.scrollbarSizeLoad}
          onChange={this.scrollbarSizeChange}
        />
        <div
          className={s.headerWrapper}
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default GridHeader
