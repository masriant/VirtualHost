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
  public function pdf()
  {
    $lakip = $this->pdfModel->getPdf();

    $data = [
      'halaman' => 'pdf ',
      'title' => 'pdf',
      'lakip' => $lakip,
    ];

    // $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4', 'L']);
    $mpdf = new \Mpdf\Mpdf();
    $mpdf = new \Mpdf\Mpdf([
      'margin_top' => 30,
      // 'margin_left' => 10,
      // 'margin_right' => 10,
      // 'mirrorMargins' => true
    ]);

    $mpdf->SetHeader('<img src="assets/lakip.jpeg" width="70" />|<p>LEMBAGA ADMINISTRASI KEUANGAN DAN ILMU PEMERINTAHAN</p>
    <p>SKT DITJEN POLPUM KEMENDAGRI NOMOR : 001-00-00/034/I/2019</p> 
    <p>Sekretariat : Jln. Serdang Baru Raya No. 4B, Kemayoran - Jakarta 10650</p>
    <p>Website : www.lakip.co.id E-mail : admin@lakip.co.id Telp./Fax. 021-42885718</p>
    |');

    // <link rel="stylesheet" href="/css/print.css">
    // $html = ' Halaman pertama';
    // $mpdf->WriteHTML($html);
    // $mpdf->AddPage();
    $mpdf->WriteHTML('Masrianto');


    $html = '<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF</title>
</head>
<body>
<h3>List Peserta</h3>
<table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Kode</th>
            </tr>
          </thead>';
    $i = 1;
    foreach ($lakip as $row) {
      $html  .= '<tr>
               <td>' . $i++ . '</td>
               <td>' . $row["nama"] . '</td>
               <td>' . $row["alamat"] . '</td>
               <td>' . $row["kodeqr"] . '</td>      
               </tr>';
    }
    $html .= '</table>
</body>
</html>';
    $tgl_cetak = date('d F Y H:i:s');
    $mpdf->SetFooter(base_url() . '|{PAGENO}|' . $tgl_cetak);

    $mpdf->WriteHTML($html);

    return redirect()->to($mpdf->Output('Laporan-x.pdf', 'I'));
  }

  //--------------------------------------------------------------------

  public function spreadsheet()
  {
    // $lakip = $this->pdfModel->getPdf();
    // $lakip = $this->pdfModel->findAll();
    $lakip = $this->pdfModel->findAll();
    $spreadsheet = new Spreadsheet();

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xlsx");
    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    $writer = new Xlsx($spreadsheet);
    // $writer->save("05featuredemo.xlsx");

    // $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xlsx");
    // $spreadsheet = $reader->load("05featuredemo.xlsx")
    // Set value binder
    // \PhpOffice\PhpSpreadsheet\Cell\Cell::setValueBinder(new \PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder());


    // Create new Spreadsheet object OK <===
    // $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');


    // $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    // $writer->save("05featuredemo.xlsx");













    // $writer = \PhpOffice\PhpSpreadsheet\Writer\IWriter($spreadsheet, 'Xlsx');
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::IReader($spreadsheet, 'Xlsx');

    // $writer = \PhpOffice\PhpSpreadsheet\Reader\IReader($spreadsheet, 'Xlsx');
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::IWriter($spreadsheet, 'Xlsx');


    // $spreadsheet->getActiveSheet()->setAutoFilter('A1:D20');

    //   $spreadsheet->getActiveSheet()->setAutoFilter(
    //     $spreadsheet->getActiveSheet()
    //         ->calculateWorksheetDimension()
    // );

    // $autoFilter = $spreadsheet->getActiveSheet()->getAutoFilter();
    // $columnFilter = $autoFilter->getColumn('C');

    // $columnFilter->setFilterType(
    //   \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_FILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     ''
    // );

    //   $columnFilter->setFilterType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_FILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     [
    //         'year' => 2018,
    //         'month' => 1
    //     ]
    // )
    // ->setRuleType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DATEGROUP
    // );

    //   $columnFilter->setFilterType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_DYNAMICFILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     NULL,
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DYNAMIC_YEARTODATE
    // )
    // ->setRuleType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DYNAMICFILTER
    // );


    // $spreadsheet->getActiveSheet()->setCellValue('E2', 'Year');
    // $data = [
    //   'halaman' => 'spreadsheet ',
    //   'title' => 'spreadsheet',
    //   'lakip' => $lakip,
    // ];



    $spreadsheet->getProperties()
      ->setCreator("Masrianto")
      ->setLastModifiedBy("www.lakip.co.id")
      ->setTitle("LAKIP.CO.ID")
      ->setSubject("Office 2007 XLSX LAKIP Document")
      ->setDescription("Lembaga Administrasi Keuangan dan Ilmu Pemerintahan")
      ->setKeywords("Lembaga Administrasi Keuangan dan Ilmu Pemerintahan")
      ->setCategory("Result Laporan");


    // $htmlString = '
    // <table>
    //       <tr>
    //           <td>Hello ABC</td>
    //       </tr>
    //       <tr>
    //           <td>CDE<br />FGH</td>
    //       </tr>
    //       <tr>
    //           <td>IJK<br>LMN</td>
    //     </tr>
    // </table>';


    // $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
    // $spreadsheet = $reader->loadFromString($htmlString);


    // $sheet = $spreadsheet->getActiveSheet();

    // $sheet = $spreadsheet->getActiveSheet();
    // $sheet->setCellValue('A1', 'No');
    // $sheet->setCellValue('B1', 'Nama');
    // $sheet->setCellValue('C1', 'Alamat');
    // $sheet->setCellValue('D1', 'Kode');

    $spreadsheet->getActiveSheet()
      ->setCellValue('A1', 'No')
      ->setCellValue('B1', 'Nama')
      ->setCellValue('C1', 'Jabatan')
      ->setCellValue('D1', 'Alamat')
      ->setCellValue('E1', 'Kode')
      ->setCellValue('F1', 'Check-IN')
      ->setCellValue('G1', 'Check-OUT')
      ->setCellValue('H1', 'Kontribusi');



    $no = 1;
    $x = 3;
    $dibuat = date('d');
    $sel = 3;
    $kontribusi = 4500000;
    foreach ($lakip as $row) {
      $spreadsheet->getActiveSheet()
        ->setCellValue('A' . $x, $no++)
        ->setCellValue('B' . $x, $row['nama'])
        ->setCellValue('C' . $x, 'jabatan')
        ->setCellValue('D' . $x, $row['alamat'])
        ->setCellValue('E' . $x, $row['kodeqr'])
        ->setCellValue('F' . $x, $dibuat)
        // ->setCellValue('G' . $x, '=SUM(F' . $sel++ . '+3)')
        ->setCellValue('G' . $x, '=SUM(F' . $sel++ . '+3)')
        ->setCellValue('H' . $x, $kontribusi);
      $x++;
    }












    // for ($i = 1; $i <= 20; $i++) {
    //   $sheet->setCellValue('A1', 'Hello World !');
    //   $spreadsheet->getActiveSheet()->setCellValue('B' . $i, "nama $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('C' . $i, "alamat $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('D' . $i, "kodeqr $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('E' . $i, true);
    //   $spreadsheet->getActiveSheet()->getRowDimension($i)->setOutlineLevel(1);
    //   $spreadsheet->getActiveSheet()->getRowDimension($i)->setVisible(false);
    // }

    // $spreadsheet->getActiveSheet()->getRowDimension(51)->setCollapsed(true);
    // $writer = new Xlsx($spreadsheet);


    // return redirect()->to($writer->save('php://output'));












    // $writer->save('write.xls');
    // $writer = new Xlsx($spreadsheet);

    // $sheet = $spreadsheet->getActiveSheet();
    // $sheet->setCellValue('A1', 'Hello World !');



    // $writer->save('hello world.xlsx');
    // $spreadsheet->getActiveSheet()->setShowGridlines(true);
    $spreadsheet->getActiveSheet()->getPageSetup()->setRowsToRepeatAtTopByStartAndEnd(1, 2);
    $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea('A:H');
    // $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea('A1:D102');

    $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(5);
    $spreadsheet->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('D')->setVisible(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('E')->setVisible(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('F')->setVisible(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('G')->setVisible(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('H')->setVisible(true);

    // $spreadsheet->getActiveSheet()->getStyle('D')
    //   ->getNumberFormat()
    //   ->setFormatCode(
    //     '0000000000000000'
    //   );
    // $spreadsheet->getActiveSheet()->getStyle('A')
    //   ->getNumberFormat()
    //   ->setFormatCode(
    //     // '0000-000-0000'
    //     '0000'
    //   );
    // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
    // $drawing->setName('Logo');
    // $drawing->setDescription('Logo');
    // $drawing->setPath('./images/officelogo.jpg');
    // $drawing->setHeight(36);

    // Retrieve the worksheet called 'Worksheet 1'
    // $spreadsheet->getSheetByName('$tgl_cetak');

    // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
    // $drawing->setName('PhpSpreadsheet logo');
    // $drawing->setPath('/assets/lakip.jpeg');
    // $drawing->setHeight(36);
    // $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($drawing, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_LEFT);

    $spreadsheet->getActiveSheet()->getPageMargins()->setTop(0.5);
    $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.7);
    $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.7);
    $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(0.5);

    // $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.75);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.75);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(1);

    // $spreadsheet->getActiveSheet()->getHeaderFooter()
    //   ->setOddHeader('&C&HPlease treat this document as confidential!');
    $spreadsheet->getActiveSheet()->getHeaderFooter()
      ->setOddFooter('&L&B' . $spreadsheet->getProperties()->getTitle() . '&RPage &P of &N');
    $spreadsheet->getActiveSheet()->getPageSetup()
      ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);



    // $writer->save('php://output');

    $tgl_cetak = date('dmY His');
    $filename = 'Data ';
    // $spreadsheet->getSheetByName("File-" . $tgl_cetak . " - Copy");

    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="' . $filename . $tgl_cetak . '.xlsx"');
    header('Cache-Control: max-age=0');

    // $class = new \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf::class;
    // \PhpOffice\PhpSpreadsheet\IOFactory::registerWriter('Pdf', $class);
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Pdf');




    $writer->save('php://output');

    // $writer = \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf($spreadsheet);
    // $writer = new \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf($spreadsheet);
    // $writer->writeAllSheets()->save("05feature.pdf");

    // return redirect()->to($writer->save('php://output'));
  }

  public function sheet()
  {
    // $lakip = $this->pdfModel->getPdf();
    // $lakip = $this->pdfModel->findAll();
    $lakip = $this->pdfModel->findAll();
    $spreadsheet = new Spreadsheet();

    // Set value binder
    \PhpOffice\PhpSpreadsheet\Cell\Cell::setValueBinder(new \PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder());











    // // Create new Spreadsheet object OK <===
    // $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');


    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    // $writer->save("05featuredemo.xlsx");













    // $writer = \PhpOffice\PhpSpreadsheet\Writer\IWriter($spreadsheet, 'Xlsx');
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::IReader($spreadsheet, 'Xlsx');

    // $writer = \PhpOffice\PhpSpreadsheet\Reader\IReader($spreadsheet, 'Xlsx');
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::IWriter($spreadsheet, 'Xlsx');


    // $spreadsheet->getActiveSheet()->setAutoFilter('A1:D20');

    //   $spreadsheet->getActiveSheet()->setAutoFilter(
    //     $spreadsheet->getActiveSheet()
    //         ->calculateWorksheetDimension()
    // );

    // $autoFilter = $spreadsheet->getActiveSheet()->getAutoFilter();
    // $columnFilter = $autoFilter->getColumn('C');

    // $columnFilter->setFilterType(
    //   \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_FILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     ''
    // );

    //   $columnFilter->setFilterType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_FILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     [
    //         'year' => 2018,
    //         'month' => 1
    //     ]
    // )
    // ->setRuleType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DATEGROUP
    // );

    //   $columnFilter->setFilterType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column::AUTOFILTER_FILTERTYPE_DYNAMICFILTER
    // );

    // $columnFilter->createRule()
    // ->setRule(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_COLUMN_RULE_EQUAL,
    //     NULL,
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DYNAMIC_YEARTODATE
    // )
    // ->setRuleType(
    //     \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule::AUTOFILTER_RULETYPE_DYNAMICFILTER
    // );


    $spreadsheet->getActiveSheet()->setCellValue('E2', 'Date/time value:');
    // $data = [
    //   'halaman' => 'spreadsheet ',
    //   'title' => 'spreadsheet',
    //   'lakip' => $lakip,
    // ];



    $spreadsheet->getProperties()
      ->setCreator("Masrianto")
      ->setLastModifiedBy("LAKIP.CO.ID")
      ->setTitle("Office 2007 XLSX Document")
      ->setSubject("Office 2007 XLSX LAKIP Document")
      ->setDescription("Document for Office 2007 XLSX, generated using PHP classes.")
      ->setKeywords("office 2007 openxml php")
      ->setCategory("Result file laporan");


    // $htmlString = '
    // <table>
    //       <tr>
    //           <td>Hello ABC</td>
    //       </tr>
    //       <tr>
    //           <td>CDE<br />FGH</td>
    //       </tr>
    //       <tr>
    //           <td>IJK<br>LMN</td>
    //     </tr>
    // </table>';


    // $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
    // $spreadsheet = $reader->loadFromString($htmlString);


    // $sheet = $spreadsheet->getActiveSheet();

    // $sheet = $spreadsheet->getActiveSheet();
    // $sheet->setCellValue('A1', 'No');
    // $sheet->setCellValue('B1', 'Nama');
    // $sheet->setCellValue('C1', 'Alamat');
    // $sheet->setCellValue('D1', 'Kode');

    $spreadsheet->getActiveSheet()
      ->setCellValue('A1', 'No')
      ->setCellValue('B1', 'Nama')
      ->setCellValue('C1', 'Alamat')
      ->setCellValue('D1', 'Kode');

    $no = 1;
    $x = 3;
    foreach ($lakip as $row) {
      $spreadsheet->getActiveSheet()
        ->setCellValue('A' . $x, $no++)
        ->setCellValue('B' . $x, $row['nama'])
        ->setCellValue('C' . $x, $row['alamat'])
        ->setCellValue('D' . $x, $row['kodeqr']);
      $x++;
    }
    $writer = new Xlsx($spreadsheet);











    // for ($i = 1; $i <= 20; $i++) {
    //   $sheet->setCellValue('A1', 'Hello World !');
    //   $spreadsheet->getActiveSheet()->setCellValue('B' . $i, "nama $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('C' . $i, "alamat $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('D' . $i, "kodeqr $i");
    //   $spreadsheet->getActiveSheet()->setCellValue('E' . $i, true);
    //   $spreadsheet->getActiveSheet()->getRowDimension($i)->setOutlineLevel(1);
    //   $spreadsheet->getActiveSheet()->getRowDimension($i)->setVisible(false);
    // }

    // $spreadsheet->getActiveSheet()->getRowDimension(51)->setCollapsed(true);
    // $writer = new Xlsx($spreadsheet);


    // return redirect()->to($writer->save('php://output'));












    // $writer->save('write.xls');
    // $writer = new Xlsx($spreadsheet);

    // $sheet = $spreadsheet->getActiveSheet();
    // $sheet->setCellValue('A1', 'Hello World !');



    // $writer->save('hello world.xlsx');
    // $spreadsheet->getActiveSheet()->setShowGridlines(true);
    $spreadsheet->getActiveSheet()->getPageSetup()->setRowsToRepeatAtTopByStartAndEnd(1, 2);
    $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea('A1:D1');
    $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea('A1:D102');

    $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(5);
    $spreadsheet->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('D')->setVisible(true);

    $spreadsheet->getActiveSheet()->getStyle('D')
      ->getNumberFormat()
      ->setFormatCode(
        '0000000000000000'
      );
    $spreadsheet->getActiveSheet()->getStyle('A')
      ->getNumberFormat()
      ->setFormatCode(
        // '0000-000-0000'
        '0000'
      );
    // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
    // $drawing->setName('Logo');
    // $drawing->setDescription('Logo');
    // $drawing->setPath('./images/officelogo.jpg');
    // $drawing->setHeight(36);

    // Retrieve the worksheet called 'Worksheet 1'
    // $spreadsheet->getSheetByName('$tgl_cetak');

    // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
    // $drawing->setName('PhpSpreadsheet logo');
    // $drawing->setPath('/assets/lakip.jpeg');
    // $drawing->setHeight(36);
    // $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($drawing, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_LEFT);

    $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1);
    $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.75);
    $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.75);
    $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(1);

    // $spreadsheet->getActiveSheet()->getHeaderFooter()
    //   ->setOddHeader('&C&HPlease treat this document as confidential!');
    // $spreadsheet->getActiveSheet()->getHeaderFooter()
    //   ->setOddFooter('&L&B' . $spreadsheet->getProperties()->getTitle() . '&RPage &P of &N');
    // $spreadsheet->getActiveSheet()->getPageSetup()
    //   ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);


    // $spreadsheet = new Spreadsheet();
    // $sheet = $spreadsheet->getActiveSheet();
    // $sheet->setCellValue('A1', 'Hello World !');


    $tgl_cetak = date('d F Y H:i:s');
    $filename = 'Lap-data ';
    $spreadsheet->getSheetByName("File-" . $tgl_cetak . " - Copy");

    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="' . $filename . $tgl_cetak . '.xlsx"');
    header('Cache-Control: max-age=0');

    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Mpdf');
    $writer->save('php://output');
    // return redirect()->to($writer->save('php://output'));
  }
}


    

//     $html = '<!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Spreadsheet</title>
// </head>
// <body>
// <h3>List Peserta</h3>
// <table class="table table-bordered table-hover">
//           <thead class="table-dark">
//             <tr>
//               <th scope="col">No</th>
//               <th scope="col">Nama</th>
//               <th scope="col">Alamat</th>
//               <th scope="col">Kode</th>
//             </tr>
//           </thead>';
//     $i = 1;
//     foreach ($lakip as $row) {
//       $html  .= '<tr>
//                <td>' . $i++ . '</td>
//                <td>' . $row["nama"] . '</td>
//                <td>' . $row["alamat"] . '</td>
//                <td>' . $row["kodeqr"] . '</td>      
//                </tr>';
//     }
//     $html .= '</table>
// </body>
// </html>';
//     $tgl_cetak = date('d F Y H:i:s');

    // $mpdf->SetFooter(base_url() . '|{PAGENO}|' . $tgl_cetak);

    // $mpdf->WriteHTML($html);