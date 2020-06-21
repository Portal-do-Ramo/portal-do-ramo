<?php

namespace App\Models;

use App\Casts\DataFormatadaCast;
use App\Events\Strike\AudienceRemoved;
use App\Events\Strike\AudienceRequested;
use App\Events\Strike\AudienceRescheduled;
use App\Events\Strike\AudienceScheduled;
use App\Events\Strike\StrikeDisapproved;
use App\Events\Strike\StrikeRequested;
use App\Events\Strike\StrikeApproved;
use App\Events\Strike\StrikeRemoved;
use App\Events\Strike\StrikeSustained;
use App\Traits\UsesUuid;
use Carbon\Carbon;

class Strike extends BaseModel
{
    use UsesUuid;

    protected $dispatchesEvents = [
        'approved' => StrikeApproved::class, 
        'audienceRequested' => AudienceRequested::class,
        'audienceRescheduled' => AudienceRescheduled::class,
        'audienceRemoved' => AudienceRemoved::class,
        'audienceScheduled' => AudienceScheduled::class,
        'created' => StrikeRequested::class,
        'disapproved' => StrikeDisapproved::class,
        'removed' => StrikeRemoved::class,
        'sustained' => StrikeSustained::class
    ];

    protected $casts = [
        'data_audiencia_solicitada' => DataFormatadaCast::class,
        'audiencia_solicitada' => 'boolean',
        'aprovado' => 'boolean',
    ];

    protected $dates = ['data_aprovado', 'data_audiencia'];

    protected $observables = ['approved', 'audienceRequested', 'audienceScheduled', 'audienceRemoved', 'audienceRescheduled', 'disapproved', 'sustained', 'removed'];

    /**
     * Definição do escopo para recuperar somente os strikes que foram aprovados
     *
     * @param \Illuminate\Database\Query\Builder $query
     * @return \Illuminate\Database\Query\Builder
     */
    public function scopeAprovados($query)
    {
        return $query->whereAprovado(true);
    }

    /**
     * Define a relação do strike com as suas possíveis futuras reavalições
     *
     * @return \App\Models\Reavaliacao
     */
    public function reavaliacoes()
    {
        return $this->hasMany('App\Models\Reavaliacao', 'strike_id', 'uuid');
    }

    /**
     * Define a relação do strike com o membro que veio a aplicá-lo
     *
     * @return \App\Models\Membro
     */
    public function membroAplicou()
    {
        return $this->belongsTo('App\Models\Usuario', 'membro_aplicou', 'matricula');
    }

    /**
     * Define a relação do strike com o membro que veio a recebê-lo
     *
     * @return \App\Models\Membro
     */
    public function membroRecebeu()
    {
        return $this->belongsTo('App\Models\Usuario', 'membro_recebeu', 'matricula');
    }

    public function getAudienciaMarcadaAttribute()
    {
        return !$this->data_audiencia == null;
    }

    public function setDataAudienciaAttribute($value)
    {
        $this->attributes['data_audiencia'] = $value ? Carbon::createFromFormat('d/m/Y', $value) : NULL;
    }
    
    public function aprovar()
    {
        $this->update(['aprovado' => true, 'data_aprovado' => now(), 'situacao' => 'Aprovado']);
        $this->fireModelEvent('approved', false);
    }

    public function solicitarAudiencia()
    {
        $this->update(['audiencia_solicitada' => true, 'data_audiencia_solicitada' => today()->format('d/m/Y')]);
        $this->fireModelEvent('audienceRequested', false);
    }

    public function marcarAudiencia($dadosValidos)
    {
        $this->update(['data_audiencia' => $dadosValidos['data_audiencia'], 'hora_audiencia' => $dadosValidos['hora_audiencia'], 'situacao' => 'Em Processamento']);
        $this->fireModelEvent('audienceScheduled', false);

    }
    
    public function remarcarAudiencia($dadosValidos)
    {
        $this->data_audiencia = $dadosValidos['data_audiencia'];
        $this->hora_audiencia = $dadosValidos['hora_audiencia'];

        $this->fireModelEvent('audienceRescheduled', false);
        $this->save();
    }
    
    public function desmarcarAudiencia()
    {
        $this->fireModelEvent('audienceRemoved', false);
        $this->update(['data_audiencia' => null, 'hora_audiencia' => null, 'situacao' => 'Aprovado']);
    }

    public function manter()
    {
        $this->update(['situacao' => 'Mantido', 'data_audiencia' => null, 'hora_audiencia' => null]);
        $this->fireModelEvent('sustained', false);
    }

    public function reprovar()
    {
        $this->update(['situacao' => 'Reprovado']);
        $this->fireModelEvent('disapproved', false);
    }

    public function remover()
    {
        $this->update(['situacao' => 'Retirado']);
        $this->when($this->audiencia_marcada, fn($query) => $query->update(['data_audiencia' => null, 'hora_audiencia' => null]));
        $this->fireModelEvent('removed', false);
    }
}
