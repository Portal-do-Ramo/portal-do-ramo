<?php

namespace App\Exports;

use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class UsuariosDesligadosExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'lista-desligados.xlsx';
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function collection()
    {
        return $this->usuarioRepository->getDesligados();
    }

    public function headings(): array
    {
        return ['Nome', 'E-mail', 'Celular', 'Motivo', 'Data de desligamento'];
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
