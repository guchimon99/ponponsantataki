import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  padding: 0.8rem 0.5rem 0.5rem;
  background: #FFF;
  border-bottom: solid 0.2rem #DDD;
  height: 4rem;
`

const Label = styled.div`
  width: 100%;
  font-size: 0.8rem;
  height: 1rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
  color: #666;
`

const Col = styled.div`
  width: 50%;
  padding: 0 0.25rem
  max-width: 320px;
  display: flex;
  flex-wrap: wrap;
`

const Progress = styled.div`
  height: 1.6rem;
  width: 100%;
  padding: 0.2rem 0;
`

const ProgressBar = styled.div`
  height: 100%;
  border-radius: 0.1rem;
  width: ${({size}) => size}%;
  background: ${({size}) => {
    if (size > 40) {
      return "green"
    } else if (size > 20) {
      return "yellow"
    } else {
      return "red"
    }
  }};
`

const Value = styled.div`
  flex-grow: 1;
  text-align: right;
  line-height: 1.6rem;
  font-size: 1.2rem;
  padding: 0 0.2rem;
`

const Unit = styled.div`
  text-align: left;
  line-height: 1.6rem;
  font-size: 0.8rem;
  padding: 0 0.2rem;
`

const DEFAULT_FINISH_TIME = 5000

const PlayHeader = ({ restTime, score}) => (
  <Wrap>
    <Col>
      <Label>残り時間</Label>
      <Progress>
          <ProgressBar size={Math.max(0, Math.min(100, restTime / DEFAULT_FINISH_TIME * 100))} />
        </Progress>
    </Col>
    <Col>
      <Label>スコア</Label>
      <Value>{ score }</Value>
      <Unit>ギャー</Unit>
    </Col>
  </Wrap>
)

PlayHeader.propTypes = {
  restTime: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}

export default PlayHeader
