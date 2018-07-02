import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import SharedScene from './shared/Scene'
import Score from './shared/Score'
import { LinkButton as Button } from './shared/Button'

const Scene = styled(SharedScene)`
  top: ${({ shown }) => shown ? 0 : -100 }%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: top .2s linear 0s;
  padding: 1rem;
  background-color: #FAFAFA;
`

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Foot = styled.div`
  padding: 1rem;
`

const Credit = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  text-align: center;
`

export default class Result extends Component {
  render(){
    const { score, shown } = this.props
    return (
      <Scene shown={shown}>
        <Title>結果発表</Title>
        <Body>
          <Score label="スコア" score={score} />
        </Body>
        <Foot>
          <Button to="/home">もう一度</Button>
          <Credit>音声提供: <a href="http://www.vita-chi.net/">びたちー素材感</a></Credit>
        </Foot>
      </Scene>
    )
  }
}

Result.propTypes = {
  shown: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
}
