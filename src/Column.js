/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Column extends Component {
  static propTypes = {
    dataIndex: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    children: PropTypes.func
  }

  render() {
    return <div>Hello</div>
  }
}

export default Column
