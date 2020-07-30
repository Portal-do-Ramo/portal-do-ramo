import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .info {
    text-align: center;

    img {
      width: 150px;
      margin-bottom: 40px;
    }

    h1 {
      color: #1D5EA8;
      font-size: 20pt;
      font-weight: bold;
    }

    h2 {
      color: #1D5EA8;
      font-size: 17pt;
      font-weight: bold;
      margin-top: 30px;
    }

    h3 {
      color: #1D5EA8;
      font-size: 15pt;
      margin-top: 20px;
    }

    span {
      margin-top: -10px;
    }
  }

  .right-box-blue-gradient {
    padding: 5px;
  }

  .loader-area {
    margin-top: 10px;
    height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-edit {
    display: none;
  }
`

export const ViewProjects = styled.div`
  background-color: rgba(0,0,0,0.1);
  overflow-y: scroll;
  height: 100%;
  padding: 5px;
  padding-bottom: 0px;
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
  background-color: rgba(255,255,255,.1);
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
    background: rgba(255,255,255,.2);
  }

  .project-name {
    font-size: 15pt;
    font-weight: bold;
    color: #FFF;
  }

  .project-info {
    font-size: 12pt;
    color: #E5E5E5;
  }

  .project-subinfo {
    font-size: 11pt;
    color: #E5E5E5;
  }

  @media (max-width: 767.98px) {
    padding: 10px 5px;
  }
`
