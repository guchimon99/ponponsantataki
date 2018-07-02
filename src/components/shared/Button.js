import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const button = css`
  display: block;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.4rem;
  text-align: center;
  border: none;
  color: #FFFFFF;
  background: #007BC7;
  border-radius: 2rem;
`

export const LinkButton = styled(Link)`
  ${button}
  text-decoration: none;
`

const Button = styled.button.attrs({
  type: "button"
})`
  ${button}
`

export default Button
