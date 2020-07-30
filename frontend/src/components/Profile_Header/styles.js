import styled from 'styled-components';

export const HeaderBox = styled.header`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  box-shadow: 0px 0px 7px #888888;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media only screen and (max-width: 500px) {
    padding: 10px;
    box-shadow: none;
  }
`

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 120px;
    border-radius: 60px;
  }

  @media only screen and (max-width: 500px) {
    img {
      width: 70px;
    }
  }
`

export const Info = styled.div`
  width: 100vh;
  display: flex;
  align-items: center;

  h2, h3 {
    color: #FFF;
  }

  @media only screen and (max-width: 500px) {
    h2 {
      font-size: 20px;
      text-align: center;
    }

    h3 {
      font-size: 15px;
      text-align: center;
    }
  }
`
