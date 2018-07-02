import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route } from 'react-router-dom'

import * as actions from '../actions'

import Home from './Home'
import Splash from './Splash'
import Play from './Play'
import Error from './Error'
import Ranking from './Ranking'
import requireAuth from '../components/auth/requireAuth'

import gyaAudio from '../audios/gya.wav'

class Root extends Component {

  static propTypes = {
    fetchAuth: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    fetchAudio: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchAuth()
    this.props.fetchUsers()
    this.props.fetchAudio({
      name: 'gya',
      source: gyaAudio
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/home" component={requireAuth(Home)} />
          <Route path="/play" component={requireAuth(Play)} />
          <Route path="/ranking" component={requireAuth(Ranking)} />
          <Error />
          <Splash />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, {
  fetchAuth: actions.fetchAuth,
  fetchUsers: actions.fetchUsers,
  fetchAudio: actions.fetchAudio,
})(Root)
