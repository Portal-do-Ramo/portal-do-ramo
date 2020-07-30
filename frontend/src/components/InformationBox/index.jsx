import React from 'react';

import InformationBoxPersonal from '../InformationBoxPersonal';
import InformationBoxMedals from '../InformationBoxMedals';
import InformationBoxStrike from '../InformationBoxStrike';
import InformationBoxAbsences from '../InformationBoxAbsences';

import { Box, Titulo } from './styles';

const InformationBox = () => (
  <section>
    <Box>
      <div className="row">
        <Titulo>
          Informações Pessoais
        </Titulo>
      </div>

      <InformationBoxPersonal className="personalInformations" />
      <InformationBoxMedals />
      <InformationBoxStrike />
      <InformationBoxAbsences />
    </Box>
  </section>
);

export default InformationBox;
