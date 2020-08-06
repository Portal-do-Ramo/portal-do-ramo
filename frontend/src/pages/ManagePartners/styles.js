import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .partner-info{

  }


  .limitador-da-imagem{
    max-width:200px;
    min-width:200px;
  }

  .imagem-do-parceiro {
    max-width:300px;
    max-height:150px;
    margin: 5% auto;
    margin-top:0px;
  }

  .btn-edit {
    display: none;
  }

  .right-box-blue-gradient {
    .center {
      text-align: center;
    }

    color: #FFF;


  h1 {
    font-size: 18pt;
    margin: 20px;
  }

  h3 {
    font-size: 12pt;
    margin-bottom: 10px;
  }

  .div-ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    list-style: none;
    text-align: center;

    textarea{
      max-height:80px;
      min-height:80px;
      overflow-y:scroll;
      overflow-x:hidden;
      width:100%;
      background-color:transparent;
      color:white;
      border:none;
      outline:none;
      -ms-overflow-style: none;
      scrollbar-width: none;
      text-align: center ;
      padding: 10px;
      margin-bottom:5px;
      cursor: pointer;
    }

    textarea::-webkit-scrollbar {
  display: none;
}

    a {
      color: #FFF;
      text-decoration: none;
      font-size: 12pt;
    }

    li {
      background-color: rgba(0,0,0,0.1);
      margin-bottom: 5px;
      width: 300px;
      padding: 0px 0px;
      cursor: pointer;
      border: 2px solid transparent;
      border-radius: 5px;
      font-size:smaller;

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

  .medal {
    height:auto;
    width: 30px;
    margin-left:15px;
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
  export const PartnerInfo = styled.div`
    ul {
    }

    li {
     width:auto;
    }

  `
