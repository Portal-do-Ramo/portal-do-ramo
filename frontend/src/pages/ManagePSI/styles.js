import styled from 'styled-components'

export const Screen = styled.div`
  padding-bottom: 50px;

  .btn-edit {
    display: none;
  }
`

export const ViewProcess = styled.div`
  background: #FFF;
  padding: 5px;
  margin-top: 20px;
  height: 400px;
  overflow-y: scroll;
  border-radius: 5px;

  h5 {
    margin-top: 20px;
  }
`

export const Card = styled.button`
  background: ${props => props.bgcolor};
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  color: ${props => props.color};
  padding: 10px;

  h1 {
    font-size: 15pt;
    margin-top: 5px;
    margin-bottom: 15px;
    font-weight: bold;
  }

  span {
    padding: 5px 15px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 5px;
    margin: 10px 5px;
  }

  :hover {
    color: ${props => props.color};
  }
`
