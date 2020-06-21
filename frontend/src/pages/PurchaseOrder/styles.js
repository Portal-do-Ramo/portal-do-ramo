import styled from 'styled-components'

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
  }
`

export const Content = styled.div`
  background: #CECECE;
  padding: 15px;
  margin-top: 50px;
  box-shadow: 0px 0px 7px #888;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  p, label {
    font-weight: bold;
    font-size: 12pt;
  }

  label {
    margin-top: 10px;
  }

  .btn-send {
    margin-top: 30px;
  }

  .header {
    margin-bottom: 20px;
  }

  .center {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const CardItem = styled.div`
  background: #E5E5E5;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  header {
    h2 {
      font-size: 14pt;
      font-weight: bold;
      color: #1D5EA8;
    }

    .btn-delete {
      width: 35px;
      height: 35px;
      background: #AA0000;
      color: #FFF;
      border: none;
      margin-right: 10px;
      font-weight: bold;
      font-size: 15pt;
      border-radius: 20px;

      -moz-border-radius: 20px;
      -webkit-border-radius: 20px;
      -o-border-radius: 20px;
      -ms-border-radius: 20px;
    }

    .btn-delete:hover {
      box-shadow: 0px 0px 7px #888;
    }
  }

  label {
    font-size: 10pt;
    margin-top: 10px;
  }
`
