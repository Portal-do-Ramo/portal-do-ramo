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

class ListaPresencaExport implements FromCollection, Responsable, ShouldAutoSize, WithEvents, WithHeadings
{
    use Exportable;

    private $fileName = 'lista-presenca.xlsx';
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function collection()
    {
        return $this->usuarioRepository->getListaPresenca();
    }

    public function headings(): array
    {
        return ['Nome', 'Assinatura'];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event)
            {
                $event->sheet->getDelegate()->getStyle('A1:B1')->getAlignment()->setHorizontal('center');
                for($i = 1; $i < ($event->sheet->getDelegate()->getHighestRow() + 1); $i++)
                    $event->sheet->getDelegate()->mergeCellsByColumnAndRow(2, $i, 5, $i);
            }
        ];
    }
}
