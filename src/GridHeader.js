/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { childPropTypes } from './GridPropTypes'
import scrollbarSize from 'scrollbar-size'

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

  componentDidMount() {
    this.setState({
      scrollbarWidth: scrollbarSize()
    })
  }

  render() {
    const { children, hasScrollbar } = this.props
    const { scrollbarWidth } = this.state
    return (
      <div
        className={s.header}
        style={{ paddingRight: hasScrollbar ? scrollbarWidth : null }}
      >
        <div className={s.headerWrapper}>
          {children}
        </div>
      </div>
    )
  }
}

export default GridHeader
