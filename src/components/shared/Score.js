import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
`

const Label = styled.div`
  text-align: center;
  margin-bottom: 0.4rem;
  width: 100%;
  font-size: 1.4rem;
  color: #666;
`

const Value = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: right;
`

const Unit = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const Score = ({ label, score }) => (
  <Wrap>
    <Label>{ label }</Label>
    <Value>{ score }</Value>
    <Unit><span>ギャー</span></Unit>
  </Wrap>
)

Score.propTypes = {
  label: PropTypes.string,
  score: PropTypes.number.isRequired,
}

export default Score
