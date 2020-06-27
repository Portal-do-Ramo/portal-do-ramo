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
    margin-top: -28px;
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

  .right-box-blue-gradient {
    .center {
      text-align: center;
    }

    color: #FFF;

    img {
      width: 80px;
      margin-top: 15px;
      margin-bottom: 15px;
      border-radius: 60px;

      -webkit-border-radius: 60px;
      -moz-border-radius: 60px;
      -ms-border-radius: 60px;
      -o-border-radius: 60px;
    }

    h1 {
      font-size: 18pt;
    }

    h3 {
      font-size: 12pt;
      margin-bottom: 30px;
    }

    .div-ul {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ul {
      list-style: none;
      text-align: center;

      a {
        color: #FFF;
        text-decoration: none;
        font-size: 12pt;
      }

      li {
        background-color: rgba(0,0,0,0.1);
        margin-bottom: 10px;
        width: 250px;
        padding: 5px 0px;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      li:hover {
        border-bottom: 2px solid #FFF;
        transition: .8s;
      }
    }

    .center-flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .box-download {
    margin-top: 40px;

    .center-download {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-download {
      background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
      padding: 10px 20px;
      margin-right: 10px;
      border-radius: 5px;
      margin-top: 20px;
      border: none;
      color: #FFF;
      font-size: 12pt;
      width: 225px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;

      :hover {
        background: #1D5EA8;
      }

      img {
        width: 18px;
        margin-right: 15px;
      }
    }
  }
`

export const Search = styled.form`
  background: #FFF;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 30px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  #user-search {
    width: 89%;
    background: #FFF;
    border: none;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }

  #btn-user-search {
    border-radius: none;
    border: none;
    outline: none;

    img {
      width: 20px;
      display: inline;
    }
  }

  #btn-search:active {
    background: #CECECE;
  }

  #btn-search:hover {
    background: none;
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    #user-search {
      width: 82%;
    }
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    #user-search {
      width: 83%;
    }
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    #user-search {
      width: 85%;
    }
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    #user-search {
      width: 85%;
    }
  }

  @media (min-width: 767px) and (max-width: 1023.98px) {
    #user-search {
      width: 82%;
    }
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    #user-search {
      width: 82%;
    }
  }
`

export const ViewResults = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 25px;
  height: 425px;
  overflow-y: scroll;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  ul {
    list-style: none;
  }

  @media (min-width: 319px) and (max-width: 359.98px) {
    height: 410px;
  }

  @media (min-width: 360px) and (max-width: 374.98px) {
    height: 410px;
  }

  @media (min-width: 375px) and (max-width: 410.98px) {
    height: 410px;
  }

  @media (min-width: 411px) and (max-width: 575.98px) {
    height: 410px;
  }
`

export const TitleBox = styled.h1`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  padding: 5px 15px;
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
