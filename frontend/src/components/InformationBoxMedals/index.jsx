import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from './styles';

import active from './images/active.png';
import payingMember from './images/paying.png';

export default function InformationBoxAbsences(){
  const isActive = useSelector(state => state.data[3]);
  const isPayingMember = useSelector(state => state.data[9]);

  return (
    <Box>
      <div className="row">
        {(isActive) ? <img src={active} className="medal" title="Usuário ativo" alt="Usuário ativo"/> : ''}
        {(isPayingMember) ? <img src={payingMember} className="medal" title="Membro pagante" alt="Membro pagante"/> : ''}
      </div>
    </Box>
  );
}
