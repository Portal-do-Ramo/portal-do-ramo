import styled from 'styled-components'

export const Box = styled.div`
  background: linear-gradient(130deg, #1D5EA8 0%, #2B8DFC 97.23%);
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  margin-bottom: 5px;
  color: #FFF;

  h3 {
    float: right;
    color: #FFF;
    font-size: 12pt;
    margin-top: 3px;
  }

  @media (min-width: 320px) and (max-width: 410.98px) {
    font-size: 10pt;
    padding: 5px 10px 5px 10px;
  }

  @media (min-width: 1024px) and (max-width: 1155px) {
    font-size: 10pt;
  }
`
