import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .right-box-gray {
    padding: 5px;
  }

  select {
    margin-bottom: 10px;
  }

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

  @media (max-width: 767.98px) {
    .left-box-blue-gradient {
      height: auto;
    }
  }
`

export const ViewAbsences = styled.div`
  background-color: transparent;
  overflow-y: scroll;
  height: 90%;
  width: 100%;
  padding: 5px;
  padding-left: 0px;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }

  h5 {
    font-size: 12pt;
    color: #393939;
    padding-top: 30px;
    text-align: center;
  }
`

export const Card = styled.div`
  background-color: #E5E5E5;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 5px;
  color: #353535;

  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  textarea {
    width: 94%;
    min-height: 35px;
    max-height: auto;
    padding: 5px 10px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: -5px;
    background-color: transparent;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
  }

  @media (min-width: 319px) and (max-width: 374.98px) {
    textarea {
      width: 90%;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    textarea {
      width: 91%;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    textarea {
      width: 92%;
    }
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    textarea {
      width: 91%;
    }
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    textarea {
      width: 93%;
    }
  }
`
