/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'

import Column from './Column'

class Grid extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  state = {
    columns: Children.toArray(this.props.children).filter(x => x.type === Column)
  }

  render() {
    const { columns } = this.state
    console.log(columns)
    return (
      <div>
        {columns}
      </div>
    )
  }
}

export default Grid
