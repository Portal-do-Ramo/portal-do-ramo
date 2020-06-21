<?php

namespace App\Models\Pedidos;

use App\Casts\DataFormatadaCast;
use App\Models\BaseModel;
use App\Traits\UsesUuid;

class BasePedido extends BaseModel
{
    use UsesUuid;

    protected $table = 'pedidos';

    protected $casts = ['aprovado' => 'boolean', 'dados_pedido' => 'array', 'data_aprovado' => DataFormatadaCast::class];

    protected $observables = ['approved', 'refused'];

    public function tipoPedido()
    {
        return $this->belongsTo('App\Models\WeakModels\TipoPedido', 'tipo_pedido', 'nome_tipo_pedido_slug');
    }

    public function membroSolicitante()
    {
        return $this->belongsTo('App\Models\Usuario', 'matricula_membro_solicitou', 'matricula');
    }

    public function projetoSolicitado()
    {
        return $this->belongsTo('App\Models\Projeto', 'nome_projeto_solicitado', 'nome_projeto_slug');
    }

    public function scopeAprovados($query)
    {
        return $query->whereSituacao('Aprovado');
    }

    public function aprovar()
    {
        $this->update(['situacao' => 'Aprovado', 'data_aprovado' => today()->format('d/m/Y')]);
        $this->fireModelEvent('approved', false);
    }

    public function recusar()
    {
        $this->update(['situacao' => 'Recusado']);
        $this->fireModelEvent('refused', false);
    }
}
