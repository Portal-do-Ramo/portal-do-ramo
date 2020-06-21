<?php

namespace App\Exports;

use App\Repositories\Interfaces\StrikeRepositoryInterface;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class StrikesAprovadosExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'strikes-aprovados.xlsx';
    protected $strikeRepository;

    public function __construct(StrikeRepositoryInterface $strikeRepository)
    {
        $this->strikeRepository = $strikeRepository;
    }

    public function collection()
    {
        return $this->strikeRepository->getStrikesAprovados();
    }

    public function headings(): array
    {
        return ['Membro aplicou', 'Membro recebeu', 'Motivo', 'Data solicitado', 'Data aprovado'];
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
