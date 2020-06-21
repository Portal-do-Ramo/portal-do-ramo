import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .loader-screen {
    height: 710px;
  }
`

export const Content = styled.div`
  background: #CECECE;
  border-radius: 10px;
  box-shadow: 0px 0px 7px #888888;
  padding: 20px;
  margin-top: 50px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;

  .checkbox {
    margin-right: 10px;
  }

  .center {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
`

export const Subtitles = styled.h2`
  color: #1D5EA8;
  font-size: 15pt;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #BEBEBE;
  margin-bottom: 15px;
  margin-top: 30px;
`
