import { injectGlobal } from  'styled-components'

injectGlobal`
  body {
    font-size: 16px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  button {
    font-size: 1rem;
    *:focus {
      outline: none;
    }
  }

  * {
    /* outline:red solid 1px; */
    box-sizing: border-box;
  }

  #root {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
