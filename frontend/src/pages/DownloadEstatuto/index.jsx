import React from 'react';
import api from '../../services/api';

import { Screen } from './styles';

export default function DownloadEstatuto () {
  document.title = 'Download do estatuto';
  const access_token = "Bearer".concat(sessionStorage.getItem("access_token"));

  let count = 0;

  if(count === 0) {
    downloadFile()
    count = count + 1;
  }

  function downloadFile() {
    api.get(`/api/arquivos/download-estatuto`, { headers: { Authorization: access_token },  responseType: 'blob' })
    .then(response => {
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'estatuto.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(() => window.location.href = '/error')
  }

  return (
    <Screen>
      <h1>Se o download não ocorrer, clique abaixo!</h1>
      <br /><br />
      <button className="btn-send" onClick={() => downloadFile()}>Download</button>
    </Screen>
  )
}
