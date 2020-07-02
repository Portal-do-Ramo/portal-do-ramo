import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .loader-area {
    margin-top: 10px;
    height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left-box-gray {
    text-align: center;

    img {
      width: 150px;
      margin-bottom: 40px;
      margin-top: 30px;
    }

    h1 {
      color: #1D5EA8;
      font-size: 20pt;
      font-weight: bold;
    }

    h2 {
      color: #1D5EA8;
      font-size: 17pt;
      margin-top: 30px;
    }

    h3 {
      color: #1D5EA8;
      font-size: 15pt;
      margin-top: 20px;
    }
  }

  .title-box-right {
    color: #FFF;
    font-size: 18pt;
    font-weight: bold;
    margin-left: 10px;
  }

  .view-members {
    background: rgba(255,255,255,.1);
    padding: 0px 10px 10px 10px;
    height: 40%;
    overflow-y: scroll;
    margin-bottom: 20px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .member-icon {
    width: 44px;
    margin-right: 10px;
    margin-top: 10px;
    border: 2px solid #FFF;
    border-radius: 22px;

    -webkit-border-radius: 22px;
    -moz-border-radius: 22px;
    -ms-border-radius: 22px;
    -o-border-radius: 22px;
  }

  .member-icon:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .box-area {
    background: rgba(255,255,255, .1);
    padding: 7px;
    color: #FFF;
    font-size: 13pt;
    margin-top: 10px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }
`
