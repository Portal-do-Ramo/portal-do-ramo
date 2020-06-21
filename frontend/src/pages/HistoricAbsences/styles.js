import styled from 'styled-components';

export const Screen = styled.div`
  .left-box-blue-gradient {
    table {
      background: transparent;
      width: 100%;

      td {
        padding: 10px 20px;
        color: #FFF;
        font-size: 14pt;
      }

      td.line-down {
        border-bottom: 2px solid #FFF;
      }

      td.qty {
        text-align: center;
      }

      td.project {
        font-size: 11pt;
        color: #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
      }
    }
  }
`

export const ViewAbsences = styled.div`
  background-color: #FFF;
  overflow-y: scroll;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;

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
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 5px;
  color: #353535;

  textarea {
    width: 94%;
    min-height: 35px;
    max-height: auto;
    padding: 5px 10px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: -5px;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
    background-color: transparent;
  }
`
