<?php

namespace App\Controllers;

use Mpdf\Mpdf;
use App\Models\PdfModel;
use CodeIgniter\Database\Query;

// use App\Models\LakipModel;

class Pdf extends BaseController
{
    public function __construct()
    {
        $this->pdfModel = new PdfModel();
        $this->Mpdf = new Mpdf;
    }
    public function index()
    {
        $lakip = $this->pdfModel->getPdf();

        $data = [
            'halaman' => 'Printer ',
            'title' => 'Printer',
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
    <title>Sertifikat</title>
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


}