/* eslint-disable */
import PropTypes from 'prop-types'
import Column from './Column'

export const childPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.instanceOf(Column)),
  PropTypes.instanceOf(Column)
]).isRequired
