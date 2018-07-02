import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import styled from 'styled-components'

import SharedScene from '../components/shared/Scene'

const Scene = styled(SharedScene)`
  top: ${({ shown }) => shown ? 0 : -100 }%;
  opacity: ${({ shown }) => shown ? 1 : 0 };
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition:
    top 0s linear .5s,
    opacity .5s linear 0s;
`

class Splash extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  }

  componentWillUpdate(props) {
    if (props.isLoaded) {
      this.context.router.history.push("/home")
    } else {
      this.context.router.history.push("/")
    }
  }

  render() {
    return (
      <Scene shown={!this.props.isLoaded}>
        <span>読み込み中</span>
      </Scene>
    )
  }
}

const mapStateToProps = (state) => {

  const { auth, audios, entities } = state

  const isLoaded = !!(auth && entities.users && entities.users[auth.uid] && audios && Object.keys(audios).every(key => audios[key]))

  return { isLoaded }
}

export default connect(mapStateToProps, {

})(Splash)
