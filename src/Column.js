/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import s from './Grid.scss'

class Column extends PureComponent {
  static propTypes = {
    dataKey: PropTypes.string.isRequired,
    header: PropTypes.string,
    children: PropTypes.func,
    width: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    resizable: PropTypes.bool,
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
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 50,
    resizable: true
  }

  static contextTypes = {
    isHeader: PropTypes.bool,
    rowHeight: PropTypes.number,
    rowIndex: PropTypes.number,
    record: PropTypes.object,
    setColumnWidth: PropTypes.func
  }

  state = {
    width: this.props.width,
    borderRightWidth: 1
  }

  resizeHandleWidth = 6

  componentDidMount() {
    const { isHeader } = this.context
    if (isHeader) {
      setTimeout(() => {
        const computedStyle = window.getComputedStyle(this.column)
        const borderRightWidth = computedStyle.getPropertyValue('border-right-width')
        this.setState({
          borderRightWidth
        })
      }, 0)
    }
  }

  render() {
    const { borderRightWidth } = this.state
    const { isHeader, record, rowHeight } = this.context
    const { header, dataKey, flexGrow, flexShrink, flexBasis, width, minWidth, maxWidth, resizable } = this.props
    const isResizable = resizable && isHeader
    const style = {
      lineHeight: `${rowHeight}px`,
      flexGrow: flexGrow,
      flexShrink,
      flexBasis: flexBasis,
      minWidth: width ? width : minWidth,
      maxWidth: width ? width : maxWidth
    }

    // console.log('Column Render')
    return (
      <div
        className={s.column}
        ref={node => {
          this.column = node
        }}
        style={style}
      >
        {isResizable && (
          <div
            ref={element => {
              this.handle = element
            }}
            style={{ width: this.resizeHandleWidth, minWidth: borderRightWidth, left: '100%' }}
            className={s.resizeHandle}
          />
        )}
        <div className={s.cell}>
          <div className={s.columnInner}>
            {isHeader && header}
            {!isHeader && record && record[dataKey]}
          </div>
        </div>
      </div>
    )
  }
}

export default Column
