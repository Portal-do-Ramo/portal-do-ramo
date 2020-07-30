import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .right-box-gray {
    padding: 5px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center-box {
    text-align: center;
  }

  .user-image {
    width: 140px;
    margin-top: 30px;
    border: 4px solid #FFF;
    border-radius: 70px;

    -webkit-border-radius: 70px;
    -moz-border-radius: 70px;
    -ms-border-radius: 70px;
    -o-border-radius: 70px;
  }

  .username {
    color: #FFF;
    font-weight: bold;
    margin-top: 50px;
  }

  .userinfo {
    color: #FFF;
    font-size: 17pt;
    font-weight: bold;
  }

  .btn-edit {
    display: none;
  }
`

export const ViewProjects = styled.div`
  background-color: #FFF;
  overflow-y: scroll;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;

  .center {
    text-align: center;

    h1 {
      font-size: 12pt;
      color: #393939;
      padding-top: 30px;
    }
  }

  ul {
    list-style: none;
  }
`

export const Card = styled.div`
  background-color: #E5E5E5;
  border-radius: 5px;
  padding: 10px;
  color: #353535;
  cursor: pointer;
  margin-bottom: 5px;

  -webkit-margin-bottom: 5px;
  -moz-margin-bottom: 5px;
  -ms-margin-bottom: 5px;
  -o-margin-bottom: 5px;

  :hover {
    background: #E9EDF5;
  }

  .project-name {
    font-size: 15pt;
    font-weight: bold;
  }

  .project-info {
    font-size: 12pt;
  }

  .project-subinfo {
    font-size: 11pt;
  }

  @media (max-width: 767.98px) {
    padding: 10px 5px;
  }
`
