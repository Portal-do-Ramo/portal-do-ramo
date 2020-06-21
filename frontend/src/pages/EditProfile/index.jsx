import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';
import api from '../../services/api';

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu';
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu';
import Title from '../../components/Title';
import Loader from '../../components/LoaderSpinner';

import { Screen, Content, Subtitles } from './styles';

function setUserData(user){
  return { type: 'SET_USER_DATA', user }
}

function EditProfile () {
  document.title = 'Editar perfil';
  const access_token = 'Bearer'.concat(sessionStorage.getItem('access_token'));

  const [dataMember, setDataMember] = useState();
  const [alert, setAlert] = useState('');

  const [contactPhone, setContactPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [bloodType, setBloodType] = useState('A+');

  const dispatch = useDispatch();

  const matricula = useSelector(state => state.data[0]);
  const nome = useSelector(state => state.data[1]);
  const ativo = useSelector(state => state.data[3]);
  const hierarquia = useSelector(state => state.data[4]);
  const data_nascimento = useSelector(state => state.data[5]);
  const idade = useSelector(state => state.data[6]);
  const curso = useSelector(state => state.data[7]);
  const pagante = useSelector(state => state.data[9]);
  const situacao = useSelector(state => state.data[10]);
  const quantidade_strikes = useSelector(state => state.data[11]);
  const quantidade_faltas_rg = useSelector(state => state.data[12]);
  const quantidade_faltas_equipe = useSelector(state => state.data[13]);
  const quantidade_faltas_exposup = useSelector(state => state.data[14]);
  const foto_url = useSelector(state => state.data[15]);
  const gerenciar_membros = useSelector(state => state.data[16]);
  const criar_membros = useSelector(state => state.data[17]);
  const gerenciar_strikes = useSelector(state => state.data[18]);
  const gerenciar_faltas = useSelector(state => state.data[19]);

  useEffect(() => {
    api.get('/api/usuarios/editar-meu-perfil', {headers: { Authorization: access_token }})
    .then(response => {
      setDataMember(response.data);
      setContactPhone(response.data.info_contato.telefone);
      setSecondaryPhone(response.data.telefone_secundario);
      setBloodType(response.data.tipo_sanguineo);
    })
    .catch(() => window.location.href = '/error')
  }, [])

  useEffect(() => {
    document.getElementById('alert').innerHTML = alert;
  })

  function setDataProfile(e){
    e.preventDefault();

    api.put(`/api/usuarios/${matricula}`, {
      email_usuario: document.getElementById('email_usuario').value,
      telefone_principal: document.getElementById('telefone_principal_usuario').value,
      telefone_secundario: document.getElementById('telefone_secundario_usuario').value,
      tipo_sanguineo: document.getElementById('tipo_sanguineo').value,
      medicamentos_utiliza: document.getElementById('medicamentos_utilizados').value,
      medicamentos_alergico: document.getElementById('medicamentos_alergicos').value,
      condicao_especial: document.getElementById('condicoes_especiais').value,
      alimentos_alergico: document.getElementById('alimento_alergico').value,
      nome_contato_emergencia: document.getElementById('nome_contato').value,
      grau_parentesco_contato: document.getElementById('grau_contato').value,
      telefone_contato_emergencia: document.getElementById('telefone_contato').value,
    }, {
      headers: { Authorization: access_token }
    })
    .then(() => {
      const user = {
        matricula: matricula,
        nome: nome,
        email: document.getElementById('email_usuario').value,
        ativo: ativo,
        hierarquia: hierarquia,
        data_nascimento: data_nascimento,
        idade: idade,
        curso: curso,
        telefone_principal: document.getElementById('telefone_principal_usuario').value,
        pagante: pagante,
        situacao: situacao,
        quantidade_strikes: quantidade_strikes,
        quantidade_faltas_rg: quantidade_faltas_rg,
        quantidade_faltas_equipe: quantidade_faltas_equipe,
        quantidade_faltas_exposup: quantidade_faltas_equipe,
        foto_url: foto_url,
        gerenciar_membros: gerenciar_membros,
        criar_membros: criar_membros,
        gerenciar_strikes: gerenciar_strikes,
        gerenciar_faltas: gerenciar_faltas
      }
      dispatch(setUserData(user))
      setAlert('<div class="alert alert-success" role="alert">Dados atualizados com sucesso!</div>');
    })
    .catch(error => {
      console.log(error.response)
      setAlert('<div class="alert alert-danger" role="alert">Não foi possível alterar os dados! <strong>Confira os dados informados</strong> e/ou tente novamente mais tarde!</div>');
    })
  }

  return (
    <Screen>
      <Top_Left_Side_Menu />
      <Bottom_Right_Side_Menu />

      <Content className="container">
        <Title title="Editar perfil" />
        <p>Para atualizar alguma informação bloqueada, você deve entrar em contato com a <strong>diretoria</strong> solicitando a alteração da informação.</p>
        <div id="alert" />
        <form onSubmit={setDataProfile}>
          <Subtitles>Dados Pessoais</Subtitles>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="matricula_usuario">Matrícula</label>
                <input
                  type="text"
                  className="form-control"
                  name="matricula_usuario"
                  id="matricula_usuario"
                  aria-describedby="matricula usuario"
                  readOnly
                  defaultValue={useSelector(state => state.data[0])}
                />
                <small id="helpId" className="form-text text-muted">Matrícula do CEFET-RJ</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="rg_usuario">RG</label>
                <input
                  type="text"
                  className="form-control"
                  name="rg_usuario"
                  id="rg_usuario"
                  readOnly
                  defaultValue={(dataMember) ? dataMember.rg : ''}
                />
                <small id="helpId" className="form-text text-muted">Identidade</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="cpf_usuario">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  name="cpf_usuario"
                  id="cpf_usuario"
                  readOnly
                  defaultValue={(dataMember) ? dataMember.cpf : ''}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="nome_usuario">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome_usuario"
                  id="nome_usuario"
                  aria-describedby=""
                  readOnly
                  defaultValue={useSelector(state => state.data[1])}
                />
                <small id="helpId" className="form-text text-muted">Nome completo</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="hierarquia_usuario">Hierarquia</label>
                <input
                  type="text"
                  className="form-control"
                  name="hierarquia_usuario"
                  id="hierarquia_usuario"
                  readOnly
                  defaultValue={useSelector(state => state.data[4])}
                />
                <small id="helpId" className="form-text text-muted">Sua maior hierarquia no Ramo Estudantil</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="dtnasc_usuario">Data de Nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  name="dtnasc_usuario"
                  id="dtnasc_usuario"
                  readOnly
                  defaultValue={useSelector(state => state.data[5])}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label htmlFor="curso_usuario">Curso</label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="curso_usuario"
                  id="curso_usuario"
                  readOnly
                  defaultValue={useSelector(state => state.data[7])}
                />
                <small id="helpId" className="form-text text-muted">Curso do CEFET-RJ</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="email_usuario">E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  name="email_usuario"
                  id="email_usuario"
                  defaultValue={useSelector(state => state.data[2])}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="telefone_principal_usuario">Telefone Principal</label>
                <InputMask
                  type="tel"
                  className="form-control"
                  name="telefone_principal_usuario"
                  id="telefone_principal_usuario"
                  defaultValue={useSelector(state => state.data[8])}
                  mask="(99) 99999-9999"
                  maskChar=" "
                  required
                />
                <small id="helpId" className="form-text text-muted">DDD + Número</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
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
                <small id="helpId" className="form-text text-muted">(DDD) 9999-9999</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="numero_ieee">N° IEEE</label>
                <input
                  type="text"
                  className="form-control"
                  name="numero_ieee"
                  id="numero_ieee"
                  readOnly
                  defaultValue={(dataMember) ? dataMember.numero_ieee : ''}
                />
                <small id="helpId" className="form-text text-muted">Registro do membro pagante</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="robocore_usuario">Usuário na Robocore</label>
                <input
                  type="text"
                  className="form-control"
                  name="robocore_usuario"
                  id="robocore_usuario"
                  readOnly
                  defaultValue={(dataMember) ? dataMember.cadastro_robocore : ''}
                />
                <small id="helpId" className="form-text text-muted">Cadastro do membro na Robocore</small>
              </div>
            </div>
          </div>

        <Subtitles>Dados Médicos</Subtitles>
        <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="tipo_sanguineo">Tipo Sanguíneo</label>
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
                <label htmlFor="medicamentos_utilizados">Medicamentos Utilizados</label>
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
                <label htmlFor="medicamentos_alergicos">Medicamentos Alérgicos</label>
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
                <label htmlFor="alimento_alergico">Alimento Alérgico</label>
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
                <label htmlFor="condicoes_especiais">Condições Especiais</label>
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
                <label htmlFor="nome_contato">Nome do Contato</label>
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
                <label htmlFor="grau_contato">Grau de Parentesco</label>
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
                <label htmlFor="telefone_contato">Telefone para Contato</label>
                <InputMask
                  type="tel"
                  className="form-control"
                  name="telefone_contato"
                  id="telefone_contato"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  mask="(99) 9999-9999"
                  maskChar=" "
                  required
                />
                <small id="helpId" className="form-text text-muted">Telefone da pessoa de emergência</small>
              </div>
            </div>
          </div>
          <div className="center">
            <button type="submit" className="btn-send">Salvar</button>
          </div>
        </form>
      </Content>
    </Screen>
  )
}

export default EditProfile
