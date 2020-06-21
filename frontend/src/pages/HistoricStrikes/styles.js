import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .area-loader {
    width: 100%;
    height: 600px;
  }
`

export const Content = styled.div`
  background-color: #CECECE;
  padding: 20px;
  margin-top: 50px;
  box-shadow: 0px 0px 7px #888888;
  border-radius: 5px;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  @media (max-width: 767.98px) {
    padding: 10px;
  }
`

export const ViewStrikes = styled.div`
  background-color: #FFF;
  overflow-y: scroll;
  height: 500px;
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
  background-color: ${props => props.bgColor};
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 5px;
  color: #353535;

  @media (max-width: 767.98px) {
    padding: 10px 5px;
  }
`

export const Tag = styled.span`
  background-color: ${props => props.bgColor};
  border: 2px solid ${props => props.bgColor};
  color: ${props => props.color};
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 50px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;

  @media (max-width: 767.98px) {
    font-size: 9pt;
    padding: 5px;
  }
`

export const Reason = styled.textarea`
  color: ${props => props.color};
  width: 97%;
  min-height: 50px;
  max-height: auto;
  padding: 5px 10px;
  margin-left: 15px;
  margin-top: 15px;
  margin-bottom: -5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  background-color: transparent;
  border: 2px solid ${props => props.borderColor};

  @media (max-width: 410.98px) {
    width: 89%;
  }

  @media (min-width: 411px) and (max-width: 767.98px) {
    width: 91%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 95%;
  }
`
