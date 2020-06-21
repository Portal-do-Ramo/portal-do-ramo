import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-alert {
    display: flex;
    justify-content: center;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 5;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  color: #FFF;
  margin-top: 20px;

  .feedback-box {
    background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
    width: 650px;
    padding: 50px;
    box-shadow: 0px 0px 7px #888888;
    border-radius: 10px;
    margin-top: 30px;
  }

  .rating-box {
    display: flex;
    align-items: center;

    select {
      background-color: #1D5EA8;
      border: 2px solid #FFF;
      border-radius: 5px;
      color: #FFF;
    }
  }

  label {
    font-size: 10pt;
    margin-top: 10px;
    margin-left: 10px;
  }

  textarea {
    min-height: 150px;
    max-height: 200px;
  }


  h2 {
    font-size: 15pt;
    margin-left: 10px;
  }

  button {
    float: right;
    margin-top: 25px;
    margin-left: 10px;
  }

  @media (min-width: 320px) and (max-width: 374.98px) {
    .feedback-box {
      padding: 30px;
    }

    h2 {
      font-size: 13pt;
    }
  }
`

export const Title = styled.h1`
  color: #FFF;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 40px;

  @media (min-width: 320px) and (max-width: 374.98px) {
    margin-top: 0px;
  }
`
