import styled from 'styled-components';

export const Menu = styled.div`
  .logo-menu {
    width: 260px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-ramo {
    width: 150px;
  }

  .logo-portal {
    width: 190px;
  }

  @media only screen and (max-width: 767.98px) {
    .logo-menu {
      height: 100px;
    }

    .logo-ramo {
      display: none;
    }

    .logo-portal {
      display: none;
    }
  }

  #check {
    display: none;
  }

  #icon {
    cursor: pointer;
    padding: 10px;
    position: fixed;
    z-index: 2;
    border-radius: 30px;
    background-color: #1D5EA8;
    box-shadow: 0 1px 5px rgba(0,0,0,.4);
    top: 10px;
    left: 10px;
  }

  .sidebar {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    height: 100vh;
    width: 260px;
    position: fixed;
    transition: all .2s linear;
    left: -260px;
    z-index: 1;
  }

  nav {
    width: 260px;
    position: absolute;
    top: 60px;
  }

  #check:checked ~ .sidebar{
    transform: translateX(260px);
  }

  ul {
    margin-top: -20px;
    margin-bottom: 110px;
    list-style: none;
    text-align: center;
    width: 260px;
  }

  @media (min-width: 319px) and (max-width: 767.98px) {
    ul {
      margin-top: -140px;
    }
  }
`

export const MenuOption = styled.li`
  width: 220px;

  a {
    color: #E5E5E5;
    background-color: rgba(0,0,0,0.1);
    border-radius: 5px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 11pt;
    margin: 8px;
    margin-left: 30px;
    width: 200px;

    .Icon {
      float: left;
      margin-top: 4px;
      width: 20px;
    }

    .Arrow {
      float: right;
      margin-top: 4px;
    }
  }

  a:hover {
    background: rgba(0,0,0,0.2);
    transition: 0.8s;
  }

  .dropdown-menu {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    margin-left: 10px;
    color: white;

    .menu-dropdown-option {
      margin-left: 7px;
      background-color: #1D5EA8;
      padding: 10px;
      width: 94%;
      border: none;
      color: #FFF;
      border-radius: 5px;
      margin-bottom: 7px;
      font-size: 11pt;
    }

    .menu-dropdown-option:hover {
      background: rgba(0,0,0,0.2);
      transition: .8s;
    }

    .menu-dropdown-option:disabled {
      background: rgba(255,255,255,0.2);
      cursor: default;
    }
  }
`

export const Search = styled.form`
  margin-top: 80px;
  margin-bottom: 60px;
  background: #E5E5E5;
  border-radius: 5px;
  width: 200px;
  margin-left: 30px;

  #input-search {
    width: 145px;
    background: #E5E5E5;
    border: none;
    border-radius: 5px 10px;
  }

  #btn-search {
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
    margin-bottom: 30px;
  }
`
