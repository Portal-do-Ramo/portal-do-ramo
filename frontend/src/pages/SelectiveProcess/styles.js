import styled from 'styled-components'

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }
`

export const LeftBox = styled.div`
  background: #CECECE;
  border-radius: 5px;
  padding: 20px;
  margin-top: 50px;
  height: 550px;
  box-shadow: 5px 5px 10px #888888;
  text-align: center;
`

export const RightBox = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  border-radius: 5px;
  padding: 20px;
  margin-top: 50px;
  height: 550px;
  box-shadow: 5px 5px 10px #888888;
  text-align: center;
  color: #FFF;

  .title {
    padding: 10px;
    font-size: 30px;
    background: #E5E5E5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: #1D5EA8;
    font-weight: bold;
  }

  h2 {
    background-color: rgba(0,0,0,0.2);
    padding: 10px;
    font-size: 10pt;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: -8px;
    margin-bottom: 20px;
  }

  .view {
    overflow-y: scroll;
    height: 78%;
    padding-right: 20px;

    h3 {
        background-color: rgba(0,0,0,0.2);
        padding: 10px;
        font-size: 14pt;
        font-weight: bold;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin-top: 15px;
    }

    .vacancy {
        background-color: rgba(0,0,0,0.1);
        padding: 10px;
        margin-top: -8px;
        font-size: 11pt;
    }
  }

`

export const ViewProcess = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 20px;
  height: 400px;
  overflow-y: scroll;
  border-radius: 5px;

  h5 {
    margin-top: 20px;
  }
`

export const Card = styled.button`
  background: ${props => props.bgcolor};
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  color: ${props => props.color};
  padding: 10px;

  h1 {
    font-size: 15pt;
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  span {
    padding: 5px 15px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
    margin: 10px 5px;
  }

  :hover {
    color: ${props => props.color};
  }
`
