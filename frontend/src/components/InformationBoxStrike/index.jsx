import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from './styles';

export default function InformationBoxStrike() {
  const qtd_strikes = useSelector(state => state.data[11]);

  return (
    <Box>
      Strike
      <h3>{qtd_strikes}</h3>
    </Box>
  );
}
