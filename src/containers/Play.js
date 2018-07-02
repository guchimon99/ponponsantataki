import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'

import SharedScene from '../components/shared/Scene'

import Header from '../components/PlayHeader'
import Stage from '../components/Stage'
import Result from '../components/Result'
import { STATUS_HIT } from '../libraries/stage';

const Scene = styled(SharedScene)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #FAFAFA;
`

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StageWrap = styled.div`
  width: calc(100vmin - 4rem);
  height: calc(100vmin - 4rem);
`

class Play extends Component {

  static propTypes = {
    game: PropTypes.any,
    user: PropTypes.object.isRequired,
    gyaAudio: PropTypes.any.isRequired,
  }

  componentWillMount() {
    this.props.start()
  }

  componentWillUpdate(nextProps) {

    const { game, user, gyaAudio, updateScore } = this.props

    if (!game) return

    if (nextProps.game.isOver){
      if (user.score < nextProps.game.score) updateScore(user.uid, nextProps.game.score)
      return
    }

    const { stage } = game
    const nextStage = nextProps.game.stage

    nextStage.some((cell, i) => {
      if (cell === STATUS_HIT && cell !== stage[i]) {
        if (user.setting.soundEffects) gyaAudio.play()
        return true
      } else {
        return false
      }
    })
  }

  componentWillUnmount() {
    this.props.finish()
  }

  render() {
    const { game, whack } = this.props

    if ( !game ) return <Scene />

    return (
      <Scene>
        <Header restTime={game.restTime} score={game.score} />
        <Body>
          <StageWrap>
            <Stage stage={game.stage} onWhack={(index) => whack(index)} />
          </StageWrap>
        </Body>
        <Result shown={game.isOver} score={game.score} />
      </Scene>
    )
  }
}

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.entities.users[state.auth.uid],
  gyaAudio: state.audios.gya,
})

export default connect(mapStateToProps, {
  start: actions.startGame,
  finish: actions.finishGame,
  whack: actions.whack,
  updateScore: actions.updateScore
})(Play)
