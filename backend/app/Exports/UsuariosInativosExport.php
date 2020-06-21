<?php

namespace App\Exports;

use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use App\Repositories\Interfaces\UsuarioRepositoryInterface;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsuariosInativosExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'lista-inativos.xlsx';
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function collection()
    {
        return $this->usuarioRepository->getInativos();
    }

    public function headings(): array
    {
        return ['Nome', 'E-mail', 'Motivo', 'Fim do período de inatividade'];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) 
            {
                $event->sheet->getDelegate()->getStyle("A1:D{$event->sheet->getDelegate()->getHighestRow()}")->getAlignment()->setHorizontal('center');
            }
        ];
    }
}
