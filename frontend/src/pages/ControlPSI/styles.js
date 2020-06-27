import styled from 'styled-components'

export const Screen = styled.div`
    padding-bottom: 50px;

    .btn-edit {
    display: none;
  }
`

export const Content = styled.section`
    background-color: #CECECE;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #888888;
    padding: 30px;

    h3 {
        font-size: 17pt;
        font-weight: bold;
        margin-bottom: 30px;
    }

    h4 {
        font-size: 13pt;
        padding: 7px 10px;
        color: #FFF;
        background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
        border-radius: 5px;
        width: 145px;
        text-align: right;
        margin-top: 30px;
        display: flex;
        align-items: center;
    }

    label {
        font-weight: bold;
        font-size: 12pt;
    }

    span {
        font-weight: bold;
        font-size: 11pt;
        padding-top: 20px;
    }

    hr {
        margin-bottom: -10px;
    }

    .card {
        background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 15px;
        color: #FFF;

        h1 { font-size: 18pt }

        h2 {
            font-size: 15pt;
            color: #E5E5E5;
        }

        img {
            width: 100px;
            float: left;
            border-radius: 30px;
            margin-right: 30px;
        }
    }

    a:hover { text-decoration: none }

    select { width: 40% }

    .management-select { width: 100% }

    .center {
        display: flex;
        justify-content: center;
    }
`

export const Card = styled.div`
    background: #E5E5E5;
    padding: 12px;
    border-radius: 10px;
    margin-top: 10px;

    h1 {
        font-size: 13pt;
        font-weight: bold;
    }

    h2 { font-size: 9pt }

    .title-area {
        font-size: 11pt;
        font-weight: bold;
        padding-top: 10px;
    }

    .input-down { margin-top: 2px }
`

export const BTNNewInput = styled.button`
    border-radius: 25px;
    color: #1D5EA8;
    background: #FFF;
    border: none;
    width: 35px;
    height: 35px;
    font-size: 17pt;
    float: right;
    margin-right: 20px;

    :hover {
        transition: .8s;
        background: #E5E5E5;
    }
`

export const BTNDefault = styled.button`
    padding: 5px 20px;
    border-radius: 5px;
    color: #FFF;
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    border: none;
    width: 150px;
    margin-left: 10px;
    margin-top: 30px;

    :hover {
        background: #1D5EA8;
    }
`

export const BTNCircle = styled.button`
    border-radius: 25px;
    color: #FFF;
    background: ${props => props.color};
    border: none;
    width: 40px;
    height: 40px;
    font-size: 17pt;
    float: right;
    margin-left: 5px;

    :hover {
        transition: .8s;
        background: ${props => props.hoverColor};
    }
`
