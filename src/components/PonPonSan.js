import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  STATUS_HIDDEN,
  STATUS_FAKE,
  STATUS_SHOWN,
  STATUS_HIT
} from '../libraries/stage'

import ImageFake from '../img/ponponsan-fake.png'
import ImageHidden from '../img/ponponsan-hidden.png'
import ImageShown from '../img/ponponsan-shown.png'
import ImageHit from '../img/ponponsan-hit.png'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: ${({face}) => {
    switch(face) {
      case STATUS_HIDDEN: return `url("${ImageHidden}")`
      case STATUS_FAKE: return `url("${ImageFake}")`
      case STATUS_SHOWN: return `url("${ImageShown}")`
      case STATUS_HIT: return `url("${ImageHit}")`
      default: return "none"
    }
  }};
  opacity: ${({shown}) => shown ? 1 : 0};
`

const PonPonSan = ({ status, onClick }) => (
  <Wrap onClick={onClick} status={status}>
    <Image shown={status === STATUS_HIDDEN} face={STATUS_HIDDEN} />
    <Image shown={status === STATUS_FAKE} face={STATUS_FAKE} />
    <Image shown={status === STATUS_SHOWN} face={STATUS_SHOWN} />
    <Image shown={status === STATUS_HIT} face={STATUS_HIT} />
  </Wrap>
)

PonPonSan.prototype = {
 onClick: PropTypes.func.isRequired,
 status: PropTypes.string.isRequried,
}

export default PonPonSan
