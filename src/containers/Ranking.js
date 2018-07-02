import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Scene from '../components/shared/Scene'

class Ranking extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    setting: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Scene>
        Play
      </Scene>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users
})

export default connect(mapStateToProps, {

})(Ranking)
