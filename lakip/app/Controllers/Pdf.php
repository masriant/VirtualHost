<?php

namespace App\Controllers;

use App\Models\LakipModel;
use Mpdf\Mpdf;
use App\Models\PdfModel;

class Pdf extends BaseController
{
    protected $PdfModel;
    protected $LakipModel;
    public function __construct()
    {
        $this->pdfModel = new PdfModel();
    }
    public function index()
    {

        $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
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


        $html = ' Halaman pertama';
        $mpdf->WriteHTML($html);
        $mpdf->AddPage();

        $mpdf->WriteHTML('Masrianto');


        $html = '
        
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>














</body>
</html>';


        $mpdf->WriteHTML($html);





















        return redirect()->to($mpdf->Output('filename.pdf', 'I'));
    }

    //--------------------------------------------------------------------


}