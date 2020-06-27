import styled from 'styled-components';

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }
`

export const Content = styled.div`
  background-color: #cecece;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  padding: 20px;
  margin-top: 50px;
  box-shadow: 0px 0px 7px #888888;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
    margin-bottom: 20px;
  }

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
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  ul {
    list-style: none;
  }
`

export const Card = styled.div`
  background-color: ${props => props.bgColor};
  border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 5px;
  color: #353535;

  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  .tag-situation {
    background: rgba(0,0,0,0.2);
    color: #353535;
    padding: 5.5px 10px;
    margin-left: 5px;
    border-radius: 50px;
    height: 20px;

    a {
      text-decoration: none;
      color: #353535;
    }

    a:hover {
      transition: .8s;
      color: #000;
    }

    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    -o-border-radius: 50px;
    -ms-border-radius: 50px;
  }

  .audience-date-time {
    font-size: 10pt;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: -5px;
    margin-left: 10px;
  }

  @media (max-width: 767.98px) {
    .tag-situation {
      display: none;
      font-size: 10pt;
    }

    padding: 10px 5px;
  }
`

export const Tag = styled.span`
  background-color: rgba(0,0,0,.2);
  color: #353535;
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 50px;
  margin-bottom: 10px;
  height: 20px;

  a {
    text-decoration: none;
    color: #353535;
  }

  a:hover {
    transition: .8s;
    color: #000;
  }

  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;

  @media (max-width: 767.98px) {
    font-size: 9pt;
    padding: 5px;
  }
`

export const Reason = styled.textarea`
  color: ${props => props.color};
  border: 2px solid rgba(0,0,0,.2);
  background-color: transparent;
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
  -o-border-radius: 5px;
  -ms-border-radius: 5px;

  @media (min-width: 319px) and (max-width: 767.98px) {
    width: 90%;
    font-size: 9pt;
  }
`

export const BTNAudience = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 50px;
  outline: none;
  border: none;
  background: ${props => props.bgColor};

  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;

  :hover {
    box-shadow: 0px 0px 7px #CECECE;
    transition: .8s;
  }

  @media (max-width: 767.98px) {
    font-size: 9pt;
  }

  :disabled {
    cursor: default;
    color: #CECECE;

    :hover {
      background: #FFF;
    }
  }
`

export const BTNTAB = styled.button`
  background: ${props => props.bgColor};
  margin-top: 20px;
  padding: 10px 20px;
  width: 120px;
  outline: none;
  border: none;
  margin-right: 10px;
  color: ${props => props.color};
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  :hover {
    background: ${props => props.bgColorHover}
  }

  @media (max-width: 767.98px) {
    margin-top: 40px;
    padding: 5px 10px;
  }
`

