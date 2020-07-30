import styled from 'styled-components';

export const Screen = styled.div`
  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .loader-area {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-edit {
    display: none;
  }
`

export const Content = styled.div`
  padding-top: 50px;
  padding-bottom: 11px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  box-shadow: 0px 0px 7px #888888;

  p {
    color: #858585;
    text-align: center;
  }

  .row {
    padding-bottom: 20px;
  }

  .center {
    text-align: center;

    .btn {
      width: 150px;
    }
  }

  button {
    margin-bottom: 30px;
  }

  .loader-area {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const Subtitles = styled.h2`
  color: #1D5EA8;
  font-size: 15pt;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 15px;
  margin-top: 30px;
`
