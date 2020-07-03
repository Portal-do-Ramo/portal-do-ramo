import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }

  .loader-area {
    margin-top: 10px;
    height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active-projects {
    margin-top: 50px;
  }

  .finalized-projects {
    margin-top: 60px;
  }

  .status {
    font-size: 17pt;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: 20px;
  }

  .card {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    padding: 10px;
    width: 100%;
    height: 150px;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    box-shadow: 0px 0px 7px #888;
    text-align: center;
  }

  .card:hover {
    box-shadow: 0px 0px 10px #777;
    cursor: pointer;
  }

  .project-title {
    color: #FFF;
    font-size: 16pt;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 10px;
  }

  .project-subtitle {
    color: #E5E5E5;
    font-size: 13pt;
    font-weight: bold;
  }

  span {
    color: #E5E5E5;
    font-size: 11pt;
    font-weight: bold;
  }

  a:hover {
    text-decoration: none;
  }
`
