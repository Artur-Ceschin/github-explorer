import { createGlobalStyle } from 'styled-components'

import githubBackground from '../assets/githubBackground.svg'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    body{
        background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button{
        font: 16px;
        font-family: 'Roboto', sans-serif;
    }

    #root{
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    button{
        cursor: pointer;
    }

`