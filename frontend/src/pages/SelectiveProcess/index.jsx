import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Top_Left_Side_Menu from '../../components/Top_Left_Side_Menu'
import Bottom_Right_Side_Menu from '../../components/Bottom_Right_Side_Menu'
import Header from '../../components/Home_Header'
import Title from '../../components/Title'
import Loader from '../../components/LoaderSpinner'

import { Screen, ViewProcess, LeftBox, RightBox, Card } from './styles.js'

function SelectiveProcess() {
    document.title = 'Processos Seletivos'

    const access_token = 'Bearer'.concat(sessionStorage.getItem("access_token"));
    const [selectiveProcess, setSelectiveProcess] = useState([])
    const [selectedPSI, setSelectedPSI] = useState()

    const [isLoaded, setIsLoaded] = useState(false)

    var area = [];

    useEffect(() => {
        api.get('api/psis', {headers: { Authorization: access_token } })
        .then(response => {
            setSelectiveProcess(response.data)
            console.log(response)
        })
        .catch(error => {
            console.log(error)
            // document.getElementById("title").innerHTML = "ERROR"
        })
        .finally(() => {
            setIsLoaded(true)
            // document.getElementById("title").innerHTML = response.data.ano
        })
    }, [])

    function sendSubscription(vacancyType, vacancyName, vacancyArea) {
        // api.post(`api/psis/${psi}/inscrever`, {
        //     tipo: vacancyType,
        //     nome: vacancyName,
        //     area: vacancyArea
        // }, { headers: { Authorization: access_token } })
        // .then(response => console.log(response))
        // .catch(error => console.log(error))
    }

    function generateManagementVacancies() {
        const obj = (selectedPSI.gestao_areas_vagas);
        for(var index in obj){
            console.log(index + ' - ' + obj[index])
        }
    }

    return (
        <Screen>
            <Top_Left_Side_Menu />
            <Bottom_Right_Side_Menu />
            <div className="container">
                <Header />

                <div className="row">
                    <div className="col-md-6">
                        <LeftBox>
                            <Title title="Processo Seletivo"/>
                            <ViewProcess>
                                <ul>
                                    { (selectiveProcess != '') ? selectiveProcess.map(sp => (
                                        <Card
                                            className="btn btn-default"
                                            id={sp.nome_psi}
                                            bgcolor={(sp.aberto) ? '#1D5EA8' : '#CECECE'}
                                            color={(sp.aberto) ? '#FFF' : '#000'}
                                            key={sp.nome_psi}
                                            onClick={e => setSelectedPSI(sp)}>
                                            <h1>{sp.nome_psi}</h1>
                                            <span>{sp.data_inicio}</span> até <span>{sp.data_fim}</span>
                                        </Card>
                                    )).reverse()
                                    :
                                    <h5>Não existem PSI's criados</h5> }
                                </ul>
                            </ViewProcess>
                        </LeftBox>
                    </div>

                    <div className="col-md-6">
                        <RightBox>
                            {(selectedPSI) ?
                                <>
                                    <h1 className="title">{selectedPSI.nome_psi}</h1>
                                    <h2>{selectedPSI.data_inicio} até {selectedPSI.data_fim}</h2>

                                    <div className="view">
                                        <h3>Equipes</h3>
                                        {(selectedPSI.equipes).map(team => (
                                            <div className="vacancy" key={team.nome_equipe}>
                                                {team.nome_equipe}
                                            </div>
                                        ))}

                                        <h3>Projetos</h3>
                                        {(selectedPSI.projetos).map(project => (
                                            <div className="vacancy" key={project.nome_projeto}>
                                                {project.nome_projeto} - {project.nome_equipe}
                                            </div>
                                        ))}

                                        <h3>Gestão</h3>
                                        {generateManagementVacancies()}

                                    </div>
                                </>
                            :
                                <h1>Selecione</h1>
                            }
                        </RightBox>
                    </div>
                </div>
            </div>
        </Screen>
    )
}

export default SelectiveProcess;
