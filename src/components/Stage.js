import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PonPonSan from './PonPonSan'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  border-style: solid;
  border-color: #DDD;
  border-width: 0.2rem 0.2rem 0.8rem 0.2rem;
  border-radius: 0.2rem;
  background: #FFF;
`

const Cell = styled.div`
  width: ${({ size }) => 100 / size}%;
  height: ${({ size }) => 100 / size}%;
  flex-grow: 0;
`

const Stage = ({stage, onWhack}) => {
  const size = Math.floor(Math.sqrt(stage.length))
  return (
    <Wrap>
      {stage.map((cell,i) => (
        <Cell key={i} size={size}>
          <PonPonSan
            status={cell}
            onClick={() => onWhack(i)} />
        </Cell>
      ))}
    </Wrap>
  )
}

Stage.propTypes = {
  stage: PropTypes.arrayOf(PropTypes.string),
  onWhack: PropTypes.func.isRequired
}

export default Stage
