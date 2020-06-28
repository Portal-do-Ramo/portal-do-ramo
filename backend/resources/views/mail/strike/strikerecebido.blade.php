@component('mail::message')
Prezado {{ $membro->nome_completo }},
 

A Diretoria do Ramo Estudantil IEEE CEFET/RJ vem por meio deste e-mail comunicar a aprovação de um strike dado pelo membro {{ $strike->membroAplicou->nome_completo }} no membro {{ $strike->membroRecebeu->nome_completo }} pelos seguintes motivos:


"{{ $strike->motivo }}"



Baseado nisso, o procedimento abaixo deve ser seguido para a melhor condução do trabalho e das atividades do Ramo Estudantil IEEE CEFET/RJ e dos seus projetos:

De acordo com o item 6.2.6 do Estatuto do Ramo Estudantil IEEE em vigor, gostaríamos de marcar uma audiência para que apresente a sua defesa em relação ao fato ocorrido para que assim, então, o strike possa ser votado pela Diretoria. Existe a possibilidade de recusar a audiência, aceitando o strike. Ao responder esse e-mail, em até sete dias, sinalize se deseja ou não a audiência.

Esse e-mail foi escrito pela Diretoria de Gestão de Pessoas. Segue cópia para todos os membros da diretoria.

 

Aproveitamos para lembrar que se não for solicitada audiência em até uma semana neste strike, o seu somatório de Strike alcançará o valor {{ $strike->membroRecebeu->strikesRecebeuAprovados()->count() }}.



Agradecemos a compreensão.



Atenciosamente, Diretoria do Ramo IEEE CEFET-RJ
@endcomponent
