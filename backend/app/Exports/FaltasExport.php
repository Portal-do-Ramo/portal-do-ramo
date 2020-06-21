<?php

namespace App\Exports;

use App\Repositories\Interfaces\FaltaRepositoryInterface;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class FaltasExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'lista-faltas.xlsx';
    protected $faltaRepository;

    public function __construct(FaltaRepositoryInterface $faltaRepository)
    {
        $this->faltaRepository = $faltaRepository;
    }

    public function collection()
    {
        return $this->faltaRepository->getListaFaltas();
    }

    public function headings(): array
    {
        return ['Nome membro recebeu', 'Data do evento', 'Descrição', 'Tipo', 'Projeto envolvido'];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event)
            {
                $event->sheet->getDelegate()->getStyle("A1:E{$event->sheet->getDelegate()->getHighestRow()}")->getAlignment()->setHorizontal('center');
            }
        ];
    }
}
