import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 5px;

  .loader {
    height: 100vh;
  }

  .btn-edit {
    display: none;
  }

  @media (min-width: 319px) and (max-width: 1023.98px) {
    height: 100%;
  }
`

export const Content = styled.div`
  margin-top: 50px;
`

export const Box = styled.div`
  background-color: #E5E5E5;
  height: 320px;
  padding: 10px;
  border-radius: 10px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  ul {
    list-style: none;
  }


  .medal-box {
    width: 100%;
    background-color: #E5E5E5;
    padding: 5px;
    margin-left: 1px;
    margin-bottom: 10px;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  .medal {
    width: 20px;
    margin-right: 10px;
  }

  .user-info {
    padding: 5px;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    margin-bottom: 50px;
  }

  @media (min-width: 768px) and (max-width: 1023.98px) {
    height: 400px;
  }
`

export const BoxScroll = styled.div`
  background-color: #E5E5E5;
  height: 320px;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;

  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;

  ul {
    list-style: none;
  }

  .card {
    background: #CECECE;
    padding: 5px;
    margin-bottom: 5px;
    border: none;
    width: 100%;
    border-radius: 5px;

    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    div {
      width: 320px;
      padding: 5px;

      text-align: left;
    }

    img {
      width: 50px;
      float: left;
      margin-right: 25px;
      margin-top: 3px;
    }

    .text {
      color: #000;
    }
  }

  .card:hover {
    transition: .6s;
    background: #E9EDF5;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    margin-bottom: 50px;
  }

  @media (min-width: 768px) and (max-width: 1023.98px) {
    height: 400px;
  }
`

export const Title = styled.h1`
  border-radius: 5px;
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px 5px 15px;
  margin-left: 30px;
  margin-top: -5px;
  font-size: 20px;
  color: #FFF;
  box-shadow: 0px 0px 7px #888888;
`
