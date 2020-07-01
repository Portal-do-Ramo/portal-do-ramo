<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use Illuminate\Support\Carbon;

class Membro extends BaseModel
{
    /**
     * Definição da chave primária diferente do padrão do Laravel(id)
     *
     * @var string
     */
    protected $primaryKey = 'matricula_usuario';
    /**
     * Definindo que a chave primária não possui AutoIncrement
     *
     * @var boolean
     */
    public $incrementing = false;
    /**
     * Definição do tipo da chave primária
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Definindo os casts que o Laravel fará automaticamente ao acessar o campo na tabela
     *
     * @var array
     */
    protected $casts = [
        'pagante' => 'boolean',
        'telefones' => 'array',
        'matriz_habilidade' => 'array',
        'info_contato' => 'array',
    ];
    
    /**
     * Definindo as relações que o modelo carregará sem a necessidade de explicitar
     *
     * @var array
     */
    protected $with = ['curso'];

    /**
     * Determina que os atributos que vão ser convertidos automaticamente para uma instância de Carbon
     *
     * @var array
     */
    protected $dates = ['data_nascimento'];

    public function setDataNascimentoAttribute($value)
    {
        $this->attributes['data_nascimento'] = Carbon::createFromFormat('d/m/Y', $value);
    }

    public function setDataFimMembresia($value)
    {
        $this->attributes['data_fim_membresia'] = Carbon::createFromFormat('d/m/Y', $value);
    }

    /**
     * Função responsável por recuperar o valor da idade do membro a partir da data de nascimento dele
     *
     * @return int
     */
    public function getIdadeAttribute()
    {
        return $this->data_nascimento->age;
    }

    /**
     * Função responsável por retornar o valor do número de celular, presente dentro do atributo telefones
     *
     * @return string
     */
    public function getCelularAttribute()
    {
        return $this->telefones['telefone_principal'];
    }

    public function usuario()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_usuario', 'matricula');
    }

    /**
     * Define a relação deste modelo com o modelo Curso
     *
     * @return \App\Models\Curso
     */
    public function curso()
    {
        return $this->belongsTo('App\Models\WeakModels\Curso', 'curso_id', 'id');
    }
}
