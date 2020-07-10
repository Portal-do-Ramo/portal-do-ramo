<?php

namespace App\Models;

use App\Traits\UsesNomeSlug;
use Illuminate\Support\Carbon;

class Psi extends BaseModel
{
    use UsesNomeSlug;

    /**
     * Adicionando os atributos que não estão presentes na tabela Psis, mas no modelo, ao JSON do objeto
     *
     * @var array
     */
    protected $appends = ['aberto'];

    /**
     * Definindo os casts que o Laravel fará automaticamente ao acessar o campo na tabela
     *
     * @var array
     */
    protected $casts = [
        'gestao_areas_vagas' => 'array'
    ];

    protected $hidden = ['membro_criou','data_criado','data_alterado'];

    /**
     * Determina que os atributos que vão ser convertidos automaticamente para uma instância de Carbon
     *
     * @var array
     */
    protected $dates = ['data_inicio', 'data_fim'];

    /**
     * Determina que os atributos que vão ser convertidos automaticamente para uma instância de Carbon
     *
     * @var array
     */
    public function setDataInicioAttribute($value)
    {
        $this->attributes['data_inicio'] = Carbon::createFromFormat('d/m/Y', $value);
    }


    public function setDataFimAttribute($value)
    {
        $this->attributes['data_fim'] = ($value) ? Carbon::createFromFormat('d/m/Y', $value) : NULL;
    }

    /**
     * Determina o valor do atributo "aberto" da PSI, verificando a data atual com as datas de inicio e termino da PSI.
     *
     * @return boolean
     */
    public function getAbertoAttribute()
    {
        return $this->jaAbriu() and !$this->jaFechou();
    }

    /**
     * Indica se o Processo Seletivo Interno já passou da data de início.
     *
     * @return boolean
     */
    public function jaAbriu()
    {
        return now() >= $this->data_inicio;
    }

    /**
     * Indica se o Processo Seletivo Interno já passou da data de fim.
     *
     * @return boolean
     */
    public function jaFechou()
    {
        return today() > $this->data_fim;
    }

    public static function scopeAbreHoje($query)
    {
        return  $query->whereDataInicio(today());
    }

    /**
     * Define a relação deste modelo com o modelo "Projeto" e seu pivot "ProjetoPsi"
     *
     * @return \App\Models\Pivot\ProjetoPsi
     */
    public function projetos()
    {
        return $this->belongsToMany('App\Models\Projeto','projetos_psis','nome_psi','nome_projeto','nome_psi_slug','nome_projeto_slug')
            ->withPivot('areas_vagas')->using('App\Models\Pivot\ProjetoPsi');
    }

    public function equipes()
    {
        return $this->belongsToMany('App\Models\Equipe','equipe_psis','nome_psi','nome_equipe','nome_psi_slug','nome_equipe_slug')
            ->withPivot('areas_vagas')->using('App\Models\Pivot\EquipePsi');
    }

    public function inscricoes()
    {
        return $this->hasMany('App\Models\InscricaoPsi','nome_psi','nome_psi_slug');
    }

    /**
     * Define a relação deste modelo com o modelo Usuario do membro que criou a PSI
     *
     * @return \App\Models\Usuario
     */
    public function membroCriou()
    {
        return $this->belongsTo('App\Models\Usuario', 'membro_criou', 'matricula');
    }

    /**
     * Busca um projeto da PSI com base no nome do projeto passado no parametro
     *
     * @return \App\Models\Pivot\ProjetoPsi
     */
    public function buscaProjeto($projeto)
    {
        return $this->projetos()->wherePivot('nome_projeto', $projeto);
    }

    /**
     * Busca uma equipe da PSI com base no nome da equipe passado no parametro
     *
     * @return \App\Models\Pivot\EquipePsi
     */
    public function buscaEquipe($equipe)
    {
        return $this->equipes()->wherePivot('nome_equipe', $equipe);
    }

    public function buscaInscricao($id)
    {
        return $this->inscricoes()->whereId($id);
    }

    public function buscaInscricaoMembro($matricula)
    {
        return $this->inscricoes()->whereMembroInscrito($matricula);
    }

    /**
     * Verifica se possui membros inscritos com a condição "pendente"
     *
     * @return boolean
     */
    public function temInscriçõesPendente()
    {
        return $this->inscricoes()->whereCondicao('Pendente')->exists();
    }

    /**
     * Função pega todos os membros inscritos na PSI e os formata unindo as inscrições dos membros iguais.
     * Caso não possua membros inscritos é retornado o valor null.
     *
     * @return array
     */
    public function membrosInscritosFormatado()
    {
        $inscricoes = $this->inscricoes()->orderBy('membro_inscrito')->get();
        $membrosInscritos = $inscricoes->pluck('membro');

        $membrosFormatados = null;
        $membroAnterior = null;
        $aux = 0;

        foreach($membrosInscritos as $key => $membro)
        {
            if($membro->matricula != $membroAnterior)
            {
                $membroAnterior = $membro->matricula;
                $membrosFormatados[$aux++] = $this->formatarMembro($membro);
            }

            array_push($membrosFormatados[$aux-1]['inscricoes'], $inscricoes[$key]);
        }

        return $membrosFormatados;
    }

    /**
     * Função pega todas as inscrições do membro indicado e as une no campo 'inscricoes'.
     * Caso o membro não possua inscrição é retornado o valor null.
     *
     * @param $matriculaMembro
     * @return array
     */
    public function membroInscritoFormatado($matriculaMembro)
    {
        $inscricoesMembro = $this->buscaInscricaoMembro($matriculaMembro)->get();

        if($inscricoesMembro->isNotEmpty()){
            $membroFormatado = $this->formatarMembro( $inscricoesMembro->pluck('membro')->first() );
            $membroFormatado['inscricoes'] = $inscricoesMembro;
        }
        else
            $membroFormatado = null;

        return $membroFormatado;
    }

    private function formatarMembro($membro)
    {
        return [
            'matricula' => $membro->matricula,
            'nome_completo' => $membro->nome_completo,
            'foto_url' => $membro->foto_url,
            'hierarquia' => $membro->hierarquia,
            'inscricoes' => []
        ];
    }

    public function formatarMembroCriou($membro)
    {
        return [
            'matricula' => $membro->matricula,
            'nome_completo' => $membro->nome_completo,
            'foto_url' => $membro->foto_url,
            'hierarquia' => $membro->hierarquia,
        ];
    }
}

