<?php

namespace App\Exports;

use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Maatwebsite\Excel\Events\AfterSheet;

class UsuariosPagantesExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'lista-pagantes.xlsx';
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }
    
    public function collection()
    {
        return $this->usuarioRepository->getPagantes();
    }

    public function headings(): array
    {
        return ['Nome', 'E-mail', 'Situação', 'Número IEEE', 'Fim da membresia'];
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
