import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actions from '../actions'

import SharedScene from '../components/shared/Scene'
import Score from '../components/shared/Score'
import { LinkButton as Button} from '../components/shared/Button'

import LogoImage from '../img/logo.png'
import SoundOnImage from '../img/sound-on.png'
import SoundOffImage from '../img/sound-off.png'

const Scene = styled(SharedScene)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: #FAFAFA;
`

const Logo = styled.img.attrs({
  src: LogoImage,
  alt: "ぽんぽんたたき",
})`
  height: auto;
  width: 80vmin;
  max-width: 20rem;
  align-self: center;
`

const AudioButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-image: url("${({value}) => value ? SoundOnImage : SoundOffImage }");
  background-color: transparent;
  background-size: contain;
  border: none;
  align-self: flex-end;
  padding: 0;
`

const ScoreWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`

class Home extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    updateSetting: PropTypes.func.isRequired,
  }

  toggleSE() {
    const { user } = this.props
    const setting = _.merge({}, user.setting, {
      soundEffects: !user.setting.soundEffects
    })
    this.props.updateSetting(user.uid, setting)
  }

  render() {
    const { user } = this.props
    const { setting } = user
    return (
      <Scene>
        <AudioButton value={setting.soundEffects} onClick={() => this.toggleSE()} />
        <Logo />
        <ScoreWrap>
          <Score label={"最高スコア"} score={user.score} />
        </ScoreWrap>
        <Button to="/play">はじめる</Button>
      </Scene>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.entities.users[state.auth.uid]
})

export default connect(mapStateToProps, {
  updateSetting: actions.updateSetting
})(Home)
