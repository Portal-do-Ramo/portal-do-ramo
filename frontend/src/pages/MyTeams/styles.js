import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .alert {
    font-size: 12pt;
    color: #000;
    margin-top: 30px;
    font-weight: bold;
  }

  a:hover {
    text-decoration: none;
  }
`

export const Card = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  margin-top: 40px;
  height: 500px;
  box-shadow: 0px 0px 7px #888;
  border-radius: 5px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  :hover {
    transition: .3s;
    box-shadow: 0px 0px 7px #555;
  }

  .logo-area {
    background: linear-gradient(130deg, #E9EDF5 0%, #FFF 97.23%);
    height: 350px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    img {
      width: 200px;
    }
  }

  .team-name {
    color: #FFF;
    font-size: 20pt;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: .02cm;
  }

  .area-info {
    width: 100%;
    height: 120px;
    padding: 0px 20px 20px 20px;
  }

  .team-info {
    font-size: 13pt;
    color: #FFF;
  }
`
