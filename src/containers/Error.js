import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import * as actions from '../actions'

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
`

class Error extends Component {

  static propTypes = {
    error: PropTypes.object,
    onReset: PropTypes.func.isRequired,
  }

  render() {
    const { error } = this.props
    if (!error) return null

    return (
      <Wrap>{error.message}</Wrap>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error
})

export default connect(mapStateToProps, {
  onReset: actions.resetError
})(Error)
