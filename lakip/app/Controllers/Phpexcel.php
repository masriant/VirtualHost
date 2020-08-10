<?php

namespace App\Controllers;

use Mpdf\Mpdf;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Models\PdfModel;
use CodeIgniter\Database\Query;

// use App\Models\LakipModel;

class Convert extends BaseController
{
  public function __construct()
  {
    $this->pdfModel = new PdfModel();
    $this->Mpdf = new Mpdf;
    $this->spreadsheet = new Spreadsheet();
  }
  public function phpexcel()

// require 'vendor/autoload.php';

// $koneksi = mysqli_connect("localhost", "root", "", "ci4");


// $spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle('Sheet 1');
$sheet->setCellValue('A1', 'Nama');
$sheet->setCellValue('B1', 'Alamat');
$sheet->setCellValue('C1', 'Kode');

// $lakip = mysqli_query($koneksi, "select * from lakip");


$row = 2;
while ($record = mysqli_fetch_array($lakip)) {
  $sheet->setCellValue('A' . $row, $record['nama']);
  $sheet->setCellValue('B' . $row, $record['alamat']);
  $sheet->setCellValue('B' . $row, $record['kodeqr']);
  $row++;
}



$writer = new Xlsx($spreadsheet);
$writer->save('hello world.xlsx');