import React from 'react';

import { HeaderBox, Avatar, Info } from './styles';

export default function Profile_Header (props) {
  const name = props.name;
  const url_picture = props.url_picture;
  const hierarchy = props.hierarchy;

  return (
    <>
      <HeaderBox>
        <div className="row">
          <Avatar className="col-md-2">
            <img src={url_picture} className="img-thumbnail" alt="avatar"/>
          </Avatar>

          <Info className="col-md-8">
            <div>
              <h2>{name.split(' ')[0].concat(' ' + name.split(' ')[1])}</h2>
              <h3>{hierarchy}</h3>
            </div>
          </Info>
        </div>
      </HeaderBox>
    </>
  )
}
