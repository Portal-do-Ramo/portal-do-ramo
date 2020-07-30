import styled from 'styled-components';

export const Screen = styled.div`
  .center div {
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-edit {
    display: none;
  }
`

export const View = styled.div`
  background-color: #CECECE;
  padding: 10px;
  margin-top: 50px;
  height: 650px;
  box-shadow: 0px 0px 5px #888888;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  h1 {
    font-size: 22pt;
    font-weight: bold;
    color: #1D5EA8;
    padding-top: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
  }
`

export const ViewResults = styled.div`
  background-color: #FFF;
  padding: 5px;
  overflow-y: scroll;
  height: 88%;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }

  .card {
    background-color: #F5F5F5;
    padding: 10px 20px;
    margin-bottom: 5px;
    color: #1D5EA8;
    height: 80px;
    border: none;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    img {
      width: 60px;
      float: left;
      margin-right: 30px;
      border-radius: 30px;

      -moz-border-radius: 30px;
      -webkit-border-radius: 30px;
      -ms-border-radius: 30px;
      -o-border-radius: 30px;
    }

    .user-info {
      font-size: 12pt;
    }

    span {
      font-size: 14px;
    }
  }

  .card:hover {
    background-color: #E9EDF5;
    transition: 0.8s;
  }

  a:hover {
    text-decoration: none;
  }
`
