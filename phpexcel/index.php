<?php

require 'vendor/autoload.php';

$koneksi = mysqli_connect("localhost","root","","ci4");

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle('Sheet 1');
$sheet->setCellValue('A1', 'Nama');
$sheet->setCellValue('B1', 'Alamat');
$sheet->setCellValue('C1', 'Kode');

$employee = mysqli_query($koneksi,"select * from lakip");
$row = 2;
while($record = mysqli_fetch_array($employee))
{
    $sheet->setCellValue('A'.$row, $record['nama']);
    $sheet->setCellValue('B'.$row, $record['alamat']);
    $sheet->setCellValue('B'.$row, $record['kodeqr']);

    $row++;
}



$writer = new Xlsx($spreadsheet);
$writer->save('hello world.xlsx');
?>