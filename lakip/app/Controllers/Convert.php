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

    $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4', 'L']);
    // $mpdf = new \Mpdf\Mpdf();
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
    $lakip = $this->pdfModel->getPdf();

    $data = [
      'halaman' => 'spreadsheet ',
      'title' => 'spreadsheet',
      'lakip' => $lakip,
    ];


    $spreadsheet = new Spreadsheet();

    $spreadsheet->getProperties()
      ->setCreator("Maarten Balliauw")
      ->setLastModifiedBy("Maarten Balliauw")
      ->setTitle("Office 2007 XLSX Test Document")
      ->setSubject("Office 2007 XLSX Test Document")
      ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
      ->setKeywords("office 2007 openxml php")
      ->setCategory("Test result file");


    $htmlString = '<table>
    <tr>
        <td>Hello World</td>
    </tr>
    <tr>
        <td>Hello<br />World</td>
    </tr>
    <tr>
        <td>Hello<br>World</td>
    </tr>
</table>';

    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
    $spreadsheet = $reader->loadFromString($htmlString);

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
    $writer->save('write.xls');

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Hello World !');



    $writer = new Xlsx($spreadsheet);
    // $writer->save('hello world.xlsx');
    $spreadsheet->getActiveSheet()->setShowGridlines(true);
    $spreadsheet->getActiveSheet()->getPageSetup()->setRowsToRepeatAtTopByStartAndEnd(1, 5);
    $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea('A1:E5');

    $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(12)
    $spreadsheet->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('C')->setVisible(true);
    $spreadsheet->getActiveSheet()->getColumnDimension('D')->setVisible(false);
    
    for ($i = 51; $i <= 80; $i++) {
      $spreadsheet->getActiveSheet()->setCellValue('A' . $i, "FName $i");
      $spreadsheet->getActiveSheet()->setCellValue('B' . $i, "LName $i");
      $spreadsheet->getActiveSheet()->setCellValue('C' . $i, "PhoneNo $i");
      $spreadsheet->getActiveSheet()->setCellValue('D' . $i, "FaxNo $i");
      $spreadsheet->getActiveSheet()->setCellValue('E' . $i, true);
      $spreadsheet->getActiveSheet()->getRowDimension($i)->setOutlineLevel(1);
      $spreadsheet->getActiveSheet()->getRowDimension($i)->setVisible(false);
  }
  
  $spreadsheet->getActiveSheet()->getRowDimension(81)->setCollapsed(true);

  $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
  $drawing->setName('Logo');
  $drawing->setDescription('Logo');
  $drawing->setPath('./images/officelogo.jpg');
  $drawing->setHeight(36);

  // Retrieve the worksheet called 'Worksheet 1'
$spreadsheet->getSheetByName('Worksheet 1');
  
    $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
    $drawing->setName('PhpSpreadsheet logo');
    $drawing->setPath('/assets/lakip.jpeg');
    $drawing->setHeight(36);
    $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($drawing, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_LEFT);

    $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1);
    $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.75);
    $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.75);
    $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(1);

    $spreadsheet->getActiveSheet()->getHeaderFooter()
      ->setOddHeader('&C&HPlease treat this document as confidential!');
    $spreadsheet->getActiveSheet()->getHeaderFooter()
      ->setOddFooter('&L&B' . $spreadsheet->getProperties()->getTitle() . '&RPage &P of &N');
    $spreadsheet->getActiveSheet()->getPageSetup()
      ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);


    return redirect()->to($writer->save('hello world.xlsx'));
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