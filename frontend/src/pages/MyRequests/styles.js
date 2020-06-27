import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .left-box-gray {
    padding: 5px;
  }

  .view-requests {
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    background-color: #FFF;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .area-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .right-box-blue-gradient {
    padding: 15px;

    .title-box {
      color: #FFF;
      font-weight: bold;
      font-size: 20pt;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 30px;
    }

    .data-box {
      color: #E5E5E5;
      font-size: 15pt;
    }

    .subtitle {
      color: #E5E5E5;
      font-size: 15pt;
      margin-top: 50px;
      margin-bottom: 10px;
    }

    .view-products {
      background-color: #FFF;
      padding: 5px;
      height: 230px;
      margin-top: 30px;
      overflow-y: scroll;
      overflow-x: hidden;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    textarea {
      width: 100%;
      height: 120px;
      border: none;
      outline: none;
      min-height: 200px;
      max-height: 200px;
      overflow-y: scroll;
      padding: 5px;
      background-color: #E9EDF5;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .product-name {
      font-size: 15pt;
      color: #1D5EA8;
      font-weight: bold;
    }

    .product-data {
      font-size: 12pt;
      color: #1D5EA8;
    }
  }

  @media (max-width: 359.98px) {
    .right-box-blue-gradient {
      height: 570px;
    }
  }
`

export const Card = styled.div`
  background-color: #E9EDF5;
  width: 100%;
  cursor: pointer;
  padding: 10px;
  color: #1D5EA8;
  margin-bottom: 5px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    font-size: 14pt;
  }

  h2 {
    font-size: 12pt;
  }

  h3 {
    font-size: 11pt;
  }

  :hover {
    background-color: #E5E5E5;
  }
`
