import styled from 'styled-components';

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

export const RightBox = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px;
  margin-top: 50px;
  height: 550px;
  box-shadow: 0px 0px 7px #888888;
  display: flex;
  justify-content: center;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  .center {
    text-align: center;
  }

  img {
    width: 100px;
    border-radius: 60px;
    margin-top: 15px;
    margin-bottom: 5px;

    -webkit-border-radius: 60px;
    -moz-border-radius: 60px;
    -ms-border-radius: 60px;
    -o-border-radius: 60px;
  }

  h1, h2, h3 {
    color: #FFF;
  }

  h1 {
    margin-top: -15px;
    font-size: 18pt;
  }

  #noSelected {
    margin-top: 30px;
  }

  h3 {
    font-size: 12pt;
    margin-bottom: 30px;
  }

  .qty {
    h2 {
      margin-bottom: 40px;
    }

    td {
      padding: 10px 20px;
      text-align: left;
      background: #FFF;
      border: 2px solid #E5E5E5;
    }

    margin-bottom: 30px;
  }

  a {
    color: #FFF;
  }

  a:hover {
    text-decoration: none;
    color: #CECECE;
    transition: 0.8s;
  }

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1.qty {
    background: transparent;
    height: 90px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #FFF;
    border-radius: 45px;

    -webkit-border-radius: 45px;
    -moz-border-radius: 45px;
    -ms-border-radius: 45px;
    -o-border-radius: 45px;
  }
`

export const ViewResults = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 25px;
  height: 430px;
  overflow-y: scroll;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }
`

export const TitleBox = styled.h1`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px 5px 15px;
  margin-left: 50px;
  margin-top: -28px;
  font-size: 20px;
  color: #FFF;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
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
    border-radius: 30px;
    margin-top: -2px;
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

export const ApplyAbsence = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px;
  margin-top: 50px;
  box-shadow: 0px 0px 7px #888888;
  display: flex;
  justify-content: center;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    color: #FFF;
    font-size: 15pt;
    margin-top: 10px;
    float: left;
  }

  form {
    width: 100%;
    padding: 10px;

    input, select, button {
      margin-top: 10px;
      border-radius: 8px;
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 20px;
      margin-bottom: 20px;
    }

    label {
      color: #FFF;
      font-size: 13pt;
      margin-bottom: -10px;
    }
  }

  small {
    color: #FFF;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 10pt;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    padding: 10px;
    border-radius: 0px;

    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    -ms-border-radius: 0px;
    -o-border-radius: 0px;
  }
`
