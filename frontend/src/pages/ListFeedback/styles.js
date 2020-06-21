import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;
`

export const Content = styled.div`
  background-color: #cecece;
  padding: 20px;
  margin-top: 50px;
  box-shadow: 0px 0px 7px #888888;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`

export const ViewFeedbacks = styled.div`
  background-color: #FFF;
  overflow-y: scroll;
  height: 500px;
  padding: 5px;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .center {
    text-align: center;

    h1 {
      font-size: 12pt;
      color: #393939;
      padding-top: 30px;
    }
  }

  ul {
    list-style: none;
  }
`

export const Card = styled.div`
  background-color: #E5E5E5;
  padding: 15px 10px;
  margin-bottom: 5px;
  color: #353535;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .card-item-title {
    font-size: 12pt;
    color: #000;
    margin-left: 20px;
    margin-top: 10px;
    font-weight: bold;
  }

  textarea {
    width: 97%;
    background-color: transparent;
    margin-left: 15px;
    margin-bottom: -5px;
    border: none;
    outline: none;
  }

  textarea.card-subject-textarea {
    min-height: 50px;
    max-height: 50px;
    margin-top: 5px;
  }

  textarea.card-message-textarea {
    min-height: 50px;
    max-height: auto;
    margin-top: 5px;
  }

`
