@component('mail::message')
Caro {{ $usuario->nome_completo }},

A Diretoria do Ramo Estudantil IEEE CEFET/RJ vem por meio deste e-mail comunicar o recebimento/aprovação de seu terceiro strike.

@foreach ($usuario->strikesRecebeuAprovados as $strike)
    {{ $loop->iteration }}° strike: Membro Aplicou: {{ $strike->membroAplicou->nome_completo }}, Motivo: {{ $strike->motivo }}, Data Aprovado: {{ $strike->data_aprovado->format('d/m/Y') }}
@endforeach
 
Baseado nisso, a diretoria, de acordo com o item 6.2.2 do estatuto vigente vem por meio deste comunicar o seu desligamento da extensão.

Esse e-mail foi escrito pelo(a) diretor(a) de Gestão de Pessoas. Segue cópia para todos os membros da diretoria.
Agradecemos a compreensão.

Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
