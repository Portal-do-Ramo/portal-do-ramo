@component('mail::message')
Prezado {{ $membro->nome_completo }},


A Diretoria do Ramo Estudantil IEEE CEFET/RJ vem por meio deste e-mail comunicar a remoção do strike dado pelo membro {{ $strike->membroAplicou->nome_completo }} pelos seguintes motivos:


"{{ $strike->motivo }}"


Seu somatório de Strike voltou ao valor de {{ $strike->membroRecebeu->strikesRecebeuAprovados()->count() }}.

Agradecemos a compreensão.


Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
