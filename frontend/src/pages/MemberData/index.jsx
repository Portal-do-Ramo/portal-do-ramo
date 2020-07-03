import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Header from '../../components/Home_Header';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, Subtitles } from './styles';

export default function MemberData() {
  document.title = 'Gerenciar dados';
  const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
  const matricula = window.location.search.slice(1);
  const hierarquia = (useSelector(state => state.data[4]));

  const [hierarchies, setHierarchies] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dataMember, setDataMember] = useState();

  const [cpf, setCPF] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Administração');
  const [selectedHierarchy, setSelectedHierarchy] = useState('Membro');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [bloodType, setBloodType] = useState('A+');
  const [contactPhone, setContactPhone] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAssessor, setIsAssessor] = useState(false);
  const [isMarketing, setIsMarketing] = useState(false);
  const [isPagante, setIsPagante] = useState(false);
  const [base64, setBase64] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const [alert, setAlert] = useState('');

  if (
    hierarquia !== 'Diretor de Gestão de Pessoas' &&
    hierarquia !== 'Presidente' &&
    hierarquia !== 'Vice-Presidente'
  ) {
    window.location.href = '/noaccess'
  }

  setTimeout(() => {
    if (alert !== '') {
      setAlert('')
    }
  }, 4000);

  if (matricula === '') {
    window.location.href = '/error';
  }

  useEffect(() => {
    api.get('/api/cursos', {headers: { Authorization: access_token }})
    .then(response => setCourses(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get('/api/hierarquias', {headers: { Authorization: access_token }})
    .then(response => setHierarchies(response.data))
    .catch(() => window.location.href = '/error')
  }, [])


  useEffect(() => {
    api.get(`/api/usuarios/perfil-completo/${matricula}`, {headers: { Authorization: access_token }})
    .then(response => {
      setDataMember(response.data)
      setCPF(response.data.cpf)
      setContactPhone(response.data.info_contato.telefone)
      setPrimaryPhone(response.data.celular)
      setSecondaryPhone(response.data.telefone_secundario)
      setBloodType(response.data.tipo_sanguineo)
      setSelectedHierarchy(response.data.hierarquia)
      setSelectedCourse(response.data.curso)
      setIsLoaded(true)
      setIsAssessor(response.data.assessor_flag)
      setIsMarketing(response.data.marketing_flag)
      setIsPagante(response.data.pagante)
    })
    .catch(() =>  window.location.href = '/error')
  }, [])


  function setDataProfile() {
    const data_nascimento = document.getElementById('dtnasc_usuario').value.split('-');
    const data_nascimento_padrao = data_nascimento[2] + '/' + data_nascimento[1] + '/' + data_nascimento[0];

    const data_fim_membresia = document.getElementById('data_fim_membresia').value.split('-');
    const data_fim_membresia_padrao = data_fim_membresia[2] + '/' + data_fim_membresia[1] + '/' + data_fim_membresia[0];

    const hierarquia_nome = document.getElementById('hierarchy').value;
    let hierarquia_id = 0;

    for(let index in hierarchies) {
      if(hierarchies[index].nome === hierarquia_nome) {
        hierarquia_id = hierarchies[index].id
      }
    }

    const curso_nome = document.getElementById('courses').value;
    let curso_id = 0;

    for(let index in courses) {
      if(courses[index].nome === curso_nome) {
        curso_id = courses[index].id
      }
    }

    const numero_ieee = document.getElementById('numero_ieee').value;
    if (isPagante) {
      if (numero_ieee === '') {
        setAlert(`<div class="alert alert-danger" role="alert">Número do IEEE obrigatório!</div>`)
        return
      }

      if (data_fim_membresia.length !== 3) {
        setAlert(`<div class="alert alert-danger" role="alert">Data de fim da membresia obrigatório!</div>`)
        return
      }
    }

    api.put(`api/usuarios/atualizar-totalmente/${matricula}`, {
      matricula_usuario: document.getElementById('matricula_usuario').value,
      rg_usuario: document.getElementById('rg_usuario').value,
      orgao_emissor: document.getElementById('orgao_emissor').value,
      cpf_usuario: document.getElementById('cpf_usuario').value,
      nome_completo: document.getElementById('nome_usuario').value,
      hierarquia_usuario: hierarquia_id,
      data_nascimento: data_nascimento_padrao,
      curso_usuario: curso_id,
      email_usuario: document.getElementById('email_usuario').value,
      telefone_principal: document.getElementById('telefone_principal_usuario').value,
      telefone_secundario: document.getElementById('telefone_secundario_usuario').value,
      numero_ieee: numero_ieee,
      data_fim_membresia: data_fim_membresia_padrao,
      cadastro_robocore: document.getElementById('robocore_usuario').value,
      assessor: isAssessor,
      marketing: isMarketing,
      pagante: isPagante,
      tipo_sanguineo: document.getElementById('tipo_sanguineo').value,
      medicamentos_utiliza: document.getElementById('medicamentos_utilizados').value,
      medicamentos_alergico: document.getElementById('medicamentos_alergicos').value,
      alimentos_alergico: document.getElementById('alimento_alergico').value,
      condicao_especial: document.getElementById('condicoes_especiais').value,
      nome_contato_emergencia: document.getElementById('nome_contato').value,
      grau_parentesco_contato: document.getElementById('grau_contato').value,
      telefone_contato_emergencia: document.getElementById('telefone_contato').value,
    }, {
      headers: { Authorization: access_token }
    })
    .then(() => setAlert('<div class="alert alert-success" role="alert">Dados atualizados com sucesso!</div>'))
    .catch(error => {
      switch(error.response.data) {
        case 500:
          window.location.href = '/error';
          break;
        default:
          for(let erro in error.response.data.errors) {
            setAlert(`<div class="alert alert-danger" role="alert">${error.response.data.errors[erro]}</div>`)
          }
          break;
      }
    })
  }


  function setStateOfButton() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      setIsEnabled(true)
    }
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  function convertToBase64() {
    var files = document.getElementById('url-img').files;
    if (files.length > 0) {
      getBase64(files[0])
    }
  }


  function sendNewPicture() {
    if (base64 === '') {
      setAlert('<div class="alert alert-danger" role="alert"><strong>Carregue uma foto!</strong></div>')
      return
    }

    api.patch(`/api/usuarios/foto-perfil/${matricula}`, {
      foto: base64
    }, { headers: { Authorization: access_token }})
    .then(() => setAlert('<div class="alert alert-success" role="alert"><strong>Foto de perfil atualizada com sucesso!</strong></div>'))
    .catch(() => setAlert('<div class="alert alert-danger" role="alert"><strong>Não foi possível criar a equipe.</strong> Se o problema persistir, favor contate a diretoria.</div>'))
  }


  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })


  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <div className="container">
        <div className="center-alert">
          <div className="area-alert" id="alert" />
        </div>
        <Header />

        {(isLoaded) ?
          <Content>
            <Title title='Dados Pessoais' />

              <Subtitles>Foto de Perfil</Subtitles>
              <div className="row area-picture">
                <div className="col-md-6">
                  <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                  <button className="btn-send-picture" onClick={() => {
                    setStateOfButton()
                    convertToBase64()
                  }} disabled={isEnabled}>
                    {(isEnabled) ? 'Carregado' : 'Carregar'}
                  </button>
                </div>
                <div className="col-md-4" />
                <div className="col-md-2">
                  <button className="btn-send" onClick={() => sendNewPicture()}>
                    Salvar
                  </button>
                </div>
              </div>
              <Subtitles>Dados Pessoais</Subtitles>
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="matricula_usuario">Matrícula *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="matricula_usuario"
                      id="matricula_usuario"
                      maxLength="12"
                      autoComplete="off"
                      defaultValue={(dataMember) ? dataMember.matricula : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Matrícula do CEFET-RJ</small>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="rg_usuario">RG *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="rg_usuario"
                      id="rg_usuario"
                      autoComplete="off"
                      defaultValue={(dataMember) ? dataMember.rg : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Identidade</small>
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="orgao_emissor">Orgão Emissor *</label>
                  <input
                    className="form-control"
                    type="text"
                    name="orgao_emissor"
                    id="orgao_emissor"
                    autoComplete="off"
                    defaultValue={(dataMember) ? dataMember.orgao_emissor : ''}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="cpf_usuario">CPF *</label>
                    <InputMask
                      type="text"
                      className="form-control"
                      name="cpf_usuario"
                      id="cpf_usuario"
                      defaultValue={cpf}
                      onChange={e => setCPF(e.target.value)}
                      mask="999.999.999-99"
                      maskChar=" "
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="nome_usuario">Nome *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome_usuario"
                      id="nome_usuario"
                      maxLength="90"
                      autoComplete="off"
                      defaultValue={(dataMember) ? dataMember.nome_completo : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Nome completo</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="hierarchy">Hierarquia *</label>
                  <select id="hierarchy" className="form-control" value={selectedHierarchy} onChange={e => setSelectedHierarchy(e.target.value)}>
                    {hierarchies.map(hierarchy => (
                      <option value={hierarchy.nome} key={hierarchy.id}>{hierarchy.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dtnasc_usuario">Data de Nascimento *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dtnasc_usuario"
                      id="dtnasc_usuario"
                      autoComplete="off"
                      defaultValue={(dataMember) ? dataMember.data_nascimento : ''}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="courses">Curso *</label>
                  <select id="courses" className="form-control" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                    {courses.map(course => (
                      <option value={course.nome} key={course.id}>{course.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="email_usuario">E-mail *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email_usuario"
                      id="email_usuario"
                      defaultValue={(dataMember) ? dataMember.email : ''}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="telefone_principal_usuario">Celular *</label>
                    <InputMask
                      type="tel"
                      className="form-control"
                      name="telefone_principal_usuario"
                      id="telefone_principal_usuario"
                      value={primaryPhone}
                      onChange={e => setPrimaryPhone(e.target.value)}
                      mask="(99) 99999-9999"
                      maskChar=" "
                      required
                    />
                    <small id="helpId" className="form-text text-muted">DDD + Número</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="telefone_secundario_usuario">Telefone Secundário</label>
                    <InputMask
                      type="tel"
                      className="form-control"
                      name="telefone_secundario_usuario"
                      id="telefone_secundario_usuario"
                      value={secondaryPhone}
                      onChange={e => setSecondaryPhone(e.target.value)}
                      mask="(99) 9999-9999"
                      maskChar=" "
                    />
                    <small id="helpId" className="form-text text-muted">DDD + Número</small>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="numero_ieee">N° IEEE</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numero_ieee"
                      id="numero_ieee"
                      defaultValue={(dataMember) ? dataMember.numero_ieee : ''}
                    />
                    <small id="helpId" className="form-text text-muted">Obrigatório caso pagante</small>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="data_fim_membresia">Vencimento da membresia</label>
                    <input
                      type="date"
                      className="form-control"
                      name="data_fim_membresia"
                      id="data_fim_membresia"
                      defaultValue={(dataMember) ? dataMember.data_fim_membresia : ''}
                    />
                    <small id="helpId" className="form-text text-muted">Obrigatório caso pagante</small>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="robocore_usuario">Usuário na Robocore</label>
                    <input
                      type="text"
                      className="form-control"
                      name="robocore_usuario"
                      id="robocore_usuario"
                      defaultValue={(dataMember) ? dataMember.cadastro_robocore : ''}
                    />
                    <small id="helpId" className="form-text text-muted">E-mail cadastrado s/ o @ em diante</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="checkbox"
                      name="item"
                      id="isAssessor"
                      className="checkbox"
                      checked={isAssessor}
                      onClick={() => setIsAssessor(!isAssessor)}
                    />
                    <label htmlFor="isAssessor">Assessor</label>
                    <small id="helpId" className="form-text text-muted">É um membro assessor?</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="checkbox"
                      name="item"
                      id="isMarketing"
                      className="checkbox"
                      checked={isMarketing}
                      onClick={() => setIsMarketing(!isMarketing)}
                    />
                    <label htmlFor="isMarketing">Marketing</label>
                    <small id="helpId" className="form-text text-muted">É um membro de marketing?</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="checkbox"
                      name="item"
                      id="isPagante"
                      className="checkbox"
                      checked={isPagante}
                      onClick={() => setIsPagante(!isPagante)}
                    />
                    <label htmlFor="isPagante">Pagante</label>
                    <small id="helpId" className="form-text text-muted">É um membro pagante?</small>
                  </div>
                </div>
              </div>

              <Subtitles>Dados Médicos</Subtitles>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="tipo_sanguineo">Tipo Sanguíneo *</label>
                    <select className="form-control" name="tipo_sanguineo" id="tipo_sanguineo" value={bloodType} onChange={e => setBloodType(e.target.value)}>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="medicamentos_utilizados">Medicamentos Utilizados *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="medicamentos_utilizados"
                      id="medicamentos_utilizados"
                      defaultValue={(dataMember) ? dataMember.medicamentos_utiliza : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Medicamentos que utiliza com frequência</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="medicamentos_alergicos">Medicamentos Alérgicos *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="medicamentos_alergicos"
                      id="medicamentos_alergicos"
                      defaultValue={(dataMember) ? dataMember.medicamentos_alergico : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Medicamentos que é alérgico</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="alimento_alergico">Alimento Alérgico *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="alimento_alergico"
                      id="alimento_alergico"
                      defaultValue={(dataMember) ? dataMember.alimentos_alergico : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Alimentos que possui alergia</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="condicoes_especiais">Condições Especiais *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="condicoes_especiais"
                      id="condicoes_especiais"
                      defaultValue={(dataMember) ? dataMember.condicoes_especiais : ''}
                      required
                    />
                  </div>
                </div>
              </div>

              <Subtitles>Dados para Contato</Subtitles>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="nome_contato">Nome do Contato *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome_contato"
                      id="nome_contato"
                      defaultValue={(dataMember) ? dataMember.info_contato.nome : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Nome da pessoa de emergência</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="grau_contato">Grau de Parentesco *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="grau_contato"
                      id="grau_contato"
                      defaultValue={(dataMember) ? dataMember.info_contato.grau_parentesco : ''}
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Grau do parentesco da pessoa de emergência</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="telefone_contato">Telefone para Contato *</label>
                    <InputMask
                      type="tel"
                      className="form-control"
                      name="telefone_contato"
                      id="telefone_contato"
                      defaultValue={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      mask="(99) 99999-9999"
                      maskChar=" "
                      required
                    />
                    <small id="helpId" className="form-text text-muted">Telefone da pessoa de emergência</small>
                  </div>
                </div>
              </div>

              <div className="center">
                <button className="btn-send" onClick={() => setDataProfile()}>Salvar</button>
              </div>
          </Content>
        : <div className="loader-screen"><Loader /></div>}
      </div>
    </Screen>
  )
}
