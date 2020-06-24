import styled from 'styled-components';

export const Screen = styled.div`
  .center div {
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const View = styled.div`
  background-color: #CECECE;
  padding: 20px;
  margin-top: 50px;
  height: 650px;
  box-shadow: 0px 0px 5px #888888;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`

export const ViewNotifications = styled.div`
  background-color: #FFF;
  padding: 5px;
  overflow-y: scroll;
  height: 515px;
  border-radius: 5px;
  border: 2px solid #E5E5E5;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }
`
