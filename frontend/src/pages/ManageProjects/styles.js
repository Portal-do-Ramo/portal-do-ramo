import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .btn-add {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 34px;
    margin-left: 10px;
    margin-top: -15px;
    font-size: 25px;
    color: #FFF;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .btn-add:hover {
    text-decoration: none;
    color: #E5E5E5;
  }

  .left-box-gray {
    padding: 5px;
    padding-left: 0px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;

    h1, h3 {
      color: #FFF;
    }

    .title-project {
      font-size: 30pt;
      margin-top: 20px;
      font-weight: bold;
    }

    h3 {
      font-size: 15pt;
    }

    .qty-members {
      color: #FFF;
      font-size: 15pt;
      padding: 5px 10px;
      font-weight: bold;
      margin-top: 30px;
      margin-bottom: 30px;
      border-radius: 5px;

      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .center-box {
      display: table-cell;
      text-align: center;
    }

    a {
      background: transparent;
      border: 2px solid #FFF;
      padding: 5px 10px;
      color: #FFF;
      border-radius: 5px;

      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    a:hover {
      text-decoration: none;
      box-shadow: 0px 0px 7px #888;
    }
  }

  .center-flex {
    display: flex;
    justify-content: center;

    h1 {
      font-size: 16pt;
      color: #FFF;
    }
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    height: 100%;

    .center .title-project {
      font-size: 18pt;
    }

    .center h3 {
      font-size: 14pt;
    }
  }
`

export const ViewResults = styled.div`
  background: transparent;
  padding: 5px;
  margin-top: 0px;
  height: 95%;
  overflow-y: scroll;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }

  .teamName {
    font-size: 17pt;
    font-weight: bold;
    margin-left: 20px;
    color: #1D5EA8;
  }

  .flex-center {
    width: 100%;
    height: 460px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    height: 500px;
  }
`

export const TitleBox = styled.h1`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px;
  margin-left: 50px;
  margin-top: -15px;
  font-size: 20px;
  color: #FFF;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`

export const CardTeam = styled.div`
  background-color: transparent;
  width: 100%;
  padding: 10px 5px 0px 5px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;
  height: auto;
  text-align: left;
  border-top: 1px solid #BEBEBE;
`

export const Card = styled.button`
  background-color: #F5F5F5;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 5px;
  color: #1D5EA8;
  border: none;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  img {
    width: 50px;
    float: left;
    margin-top: -2px;
    border-radius: 30px;

    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -ms-border-radius: 30px;
    -o-border-radius: 30px;
  }

  :focus {
    background-color: #E9EDF5;
    border: none;
    outline: none;
  }

  :hover {
    background-color: #E9EDF5;
  }
`
