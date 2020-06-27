import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .left-box-gray {
    padding: 5px;

    .area-tabs {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 5px;

      button {
        width: 150px;
        background-color: #1D5EA8;
        padding: 6px;
        color: #FFF;
        font-weight: bold;
        border: none;
        cursor: pointer;
        margin-left: 3px;
        margin-right: 3px;
        border-radius: 5px;

        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
      }

      button:hover {
        box-shadow: 0px 0px 7px #888;
      }
    }
  }

  .right-box-blue-gradient {
    padding: 10px;
    color: #FFF;

    .purchaseOrderData {
      padding: 5px;

      h1 {
        font-size: 15pt;
        margin-bottom: 10px;
      }

      h2 {
        font-size: 13pt;
        margin-bottom: 10px;
      }
    }

    .request-list {
      padding: 5px;
      background: #FFF;
      height: 330px;
      overflow-y: scroll;
      overflow-x: none;
      border-radius: 5px;

      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
    }

    .title {
      font-size: 15pt;
      font-weight: bold;
      margin-top: 22px;
      margin-bottom: 10px;
      margin-left: 10px;
    }

    .card-request {
      color: #333;
    }
  }

  .view-request {
    padding-right: 5px;
    height: 90%;
    overflow-y: scroll;
    overflow-x: none;
  }

  .down {
    margin-top: 10px
  }

  .card-request {
    background: #E9EDF5;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;

    h1 {
      font-size: 12pt;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 10pt;
    }

    a {
      margin-left: 20px;
      margin-top: 5px;
      color: #1D5EA8;
    }

    a:hover {
      text-decoration: none;
      color: #2B8DFC;
    }
  }

  .click {
    cursor: pointer;
  }

  .click:hover {
    box-shadow: 0px 0px 7px #888;
  }

  .btn-edit {
    display: none;
  }

  @media (max-width: 767.98px) {
    .right-box-blue-gradient {
      height: auto;
    }
  }
`
