import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .left-box-gray {
    padding: 5px;

    .view-little-cow {
      height: 100%;
      overflow-y: scroll;
      padding-right: 5px;
    }
  }

  .right-box-blue-gradient {
    padding: 40px;

    h1, h2 {
      color: #FFF;
    }

    h1 {
      text-align: center;
      font-size: 20pt;
      font-weight: bold;
      margin-bottom: 40px;
      color: #FFF
    }

    h2 {
      font-size: 15pt;
      font-weight: bold;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 15pt;
      color: #E5E5E5;
    }

    h4 {
      font-size: 12pt;
      color: #E5E5E5;
    }

    h5 {
      padding: 7px 10px;
      margin-bottom:  5px;
      background: #FFF;
      font-size: 11pt;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .view-donates {
      background: #E5E5E5;
      width: 100%;
      height: 200px;
      padding: 5px;
      overflow-y: scroll;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }
  }

  .area-loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-edit {
    display: none;
  }
`

export const Card = styled.div`
  background-color: #F5F5F5;
  border-radius: 5px;
  padding: 10px;
  color: #353535;
  cursor: pointer;
  width: 100%;
  margin-bottom: 6px;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  :hover {
    background: #E9EDF5;
  }

  .littlecow-name {
    font-size: 14pt;
    font-weight: bold;
  }

  .littlecow-info {
    font-size: 11pt;
  }

  .littlecow-subinfo {
    font-size: 10pt;
  }

  @media (max-width: 767.98px) {
    padding: 10px 5px;
  }
`
