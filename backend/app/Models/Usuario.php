<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Filtros\NomeCompleto;
use App\Traits\Filtravel;
use App\Traits\UsesSerializedDates;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use Filtravel, HasRelationships, Notifiable, UsesSerializedDates;

    protected $primaryKey = 'matricula';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $casts = [
        'data_desligado' => DataFormatadaCast::class,
        'data_fim_inatividade' => DataFormatadaCast::class,
        'ativo' => 'boolean',
        'assessor' => 'boolean',
        'marketing' => 'boolean',
        'diretoria' => 'boolean'
    ];

    protected $hidden = ['senha', 'hierarquia_id', 'ativo'];

    protected $guarded = [];

    const CREATED_AT = 'data_criado';
    const UPDATED_AT = 'data_alterado';

    public function getQuantidadeFaltas($tipo, $projeto)
    {
        return $this->faltas()->tipoFalta($tipo)->when($projeto, fn($query) => $query->whereNomeProjeto($projeto))->count();
    }

    /**
     * Retorna para o autenticador JWT, a chave(token) de identificação do usuário em questão
     *
     * @return string
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = Hash::make($value);
    }

    /**
     * Define o payload extra que irá junto com o JWT na requisição de login
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'ativo' => $this->ativo,
        ];
    }

    public function membro()
    {
        return $this->hasOne('App\Models\Membro', 'matricula_usuario', 'matricula');
    }

    /**
     * Define a relação deste modelo com o modelo Hierarquia
     *
     * @return \App\Models\Hierarquia
     */
    public function hierarquia()
    {
        return $this->belongsTo('App\Models\WeakModels\Hierarquia', 'hierarquia_id', 'id');
    }

    public function situacao()
    {
        return $this->belongsTo('App\Models\WeakModels\Situacao', 'situacao_id', 'id');
    }

    /**
     * Define a relação do modelo com as notificações via banco de dados, utilizando como base o modelo
     * presente em \App\Models\CustomNotification
     *
     * @return \Illuminate\Support\Collection
     */
    public function notifications()
    {
        return $this->morphMany(CustomNotification::class, 'notifiable')->orderBy('created_at');
    }

    public function getMorphClass()
    {
        return 'Usuario';
    }

    /**
     * Define a relação deste modelo com o modelo Falta
     *
     * @return \Illuminate\Support\Collection
     */
    public function faltas()
    {
        return $this->hasMany('App\Models\Falta', 'matricula_membro', 'matricula');
    }

    /**
     * Define a relação deste modelo com o modelo Strike, porém somente com os strikes
     * que foram solicitados pelo membro em questão
     *
     * @return \Illuminate\Support\Collection
     */
    public function strikesAplicou()
    {
        return $this->hasMany('App\Models\Strike', 'membro_aplicou', 'matricula');
    }

    /**
     * Define a relação deste modelo com o modelo Strike, porém somente com os strikes
     * que foram recebidos pelo membro em questão
     *
     * @return \Illuminate\Support\Collection
     */
    public function strikesRecebeu()
    {
        return $this->hasMany('App\Models\Strike', 'membro_recebeu', 'matricula');
    }

    public function strikesRecebeuAprovados()
    {
        return $this->hasMany('App\Models\Strike', 'membro_recebeu', 'matricula')->aprovados();
    }

    public function inscricoesProjetos()
    {
        return $this->hasMany('App\Models\InscricaoProjeto', 'matricula_membro', 'matricula');
    }

    public function projetos()
    {
        return $this->hasManyDeepFromRelations($this->inscricoesProjetos(), (new InscricaoProjeto)->projeto())->where('inscricoes_projetos.ativo', true);
    }

    public function projetosFormatados()
    {
        return $this->inscricoesProjetos()
            ->where('inscricoes_projetos.ativo', true)
            ->select('incricoes_projetos.funcao', 'incricoes_projetos.area', 'incricoes_projetos.data_entrada')
            ->join('projetos', 'inscricoes_projetos.nome_projeto', '=', 'projetos.nome_projeto_slug')
            ->select('projetos.nome_projeto', 'projetos.nome_projeto_slug')
            ->join('equipes', 'projetos.nome_equipe', '=', 'equipes.nome_equipe_slug')
            ->addSelect('equipes.nome_equipe_slug', 'equipes.nome_equipe', 'equipes.foto_url')
            ->get();
    }

    public function equipes()
    {
        return $this->hasManyDeepFromRelations($this->projetos(), (new Projeto)->equipe())->where('inscricoes_projetos.ativo', true);
    }

    public function equipeCoordena()
    {
        return $this->hasOne('App\Models\Equipe', 'matricula_coordenador', 'matricula');
    }

    public function equipesAssessora()
    {
        return $this->hasMany('App\Models\Equipe', 'matricula_assessor', 'matricula');
    }

    public function iconesEquipesParticipa()
    {
        $equipesProjetos = $this->equipes()->select('equipes.nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url')->get()->map(fn($equipe) => Arr::except($equipe->toArray(), 'laravel_through_key'));
        $equipesAssessora = $this->equipesAssessora()->select('nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url')->get();
        $equipesCoordena = $this->equipeCoordena()->select('nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url')->get();

        return $equipesProjetos->merge($equipesAssessora)->merge($equipesCoordena)->unique('nome_equipe');
    }

    public function equipesFormatadas()
    {
        $equipesProjetos = $this->equipes()->select('equipes.nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url', 'capitulo', DB::raw("'Membro' as funcao"))->get();
        $equipesAssessora = $this->equipesAssessora()->select('equipes.nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url', 'capitulo', DB::raw("'Assessor' as funcao"))->get();
        $equipesCoordena = $this->equipeCoordena()->select('equipes.nome_equipe', 'equipes.nome_equipe_slug', 'equipes.foto_url', 'capitulo', DB::raw("'Coordenador' as funcao"))->get();

        return $equipesProjetos->merge($equipesAssessora)->merge($equipesCoordena)->sortBy(fn($equipe) => ['Coordenador' => 1, 'Assessor' => 2, 'Membro' => 3][$equipe['funcao']])->unique('nome_equipe')->values();
    }

    public function feedbacks()
    {
        return $this->hasMany('App\Models\Feedback', 'membro_enviou', 'matricula');
    }

    public function pedidos()
    {
        return $this->hasMany('App\Models\Pedidos\BasePedido', 'matricula_membro_solicitou', 'matricula');
    }

    public function doacoesVaquinha()
    {
        return $this->hasMany('App\Models\DoacaoVaquinha', 'matricula_membro_doador', 'matricula');
    }

    /**
     * Retorna se o membro questão tem a hierarquia de Vice-Presidente ou Presidente
     *
     * @return boolean
     */
    public function isPresidencia()
    {
        return in_array($this->hierarquia->nome, ['Presidente', 'Vice-Presidente']);
    }

    /**
     * Retorna se o membro questão tem a hierarquia de Diretor de Gestão de Pessoas, Financeiro ou de Projetos,
     * baseado no parâmetro passado
     *
     * @param string $tipo
     * @return boolean
     */
    public function isDiretor($tipo)
    {
        return $this->hierarquia->nome == "Diretor $tipo";
    }

    public static function getQueryFormatada()
    {
        return self::select('usuarios.matricula', 'usuarios.nome_completo', 'usuarios.foto_url')
            ->join('hierarquias', 'usuarios.hierarquia_id', '=', 'hierarquias.id')
            ->addSelect('hierarquias.nome as hierarquia')
            ->orderBy('nome_completo');
    }

    protected static function getFiltros()
    {
        return [NomeCompleto::class];
    }
}
