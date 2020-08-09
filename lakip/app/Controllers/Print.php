<?php

namespace App\Controllers;

use Mpdf\Mpdf;
use App\Models\PdfModel;

class Pdf extends BaseController
{
  protected $pdfModel;
  public function __construct()
  {
    // $this->pdfModel = new PdfModel();
  }
  public function index()
  {
    //// $lakip = $this->lakipModel->findAll();
    // $currentPage = $this->request->getVar('page_lakip') ? $this->request->getVar('page_lakip') : 1;

    // $keyword = $this->request->getVar('keyword');
    // if ($keyword) {
    //   $pdf = $this->pdfModel->search($keyword);
    // } else {
    //   $pdf = $this->pdfModel;
    // }


    $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
    // $mpdf = new \Mpdf\Mpdf();


    $html = '
    <htmlpageheader name="myHeader1">
        <div style="text-align: right>My document</div>
    </htmlpageheader>
    
    <htmlpageheader name="myHeader2">
        <div style="border-bottom: 1px solid #000000; font-weight: bold;  font-size: 10pt;">
            My document
        </div>
    </htmlpageheader>
    
    <htmlpagefooter name="myFooter1">
        <table width="100%">
            <tr>
                <td width="33%">{DATE j-m-Y}</td>
                <td width="33%" align="center">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">My document</td>
            </tr>
        </table>
    </htmlpagefooter>
    
    <htmlpagefooter name="myFooter2">
        <table width="100%">
            <tr>
                <td width="33%">My document</td>
                <td width="33%" align="center">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right;">{DATE j-m-Y}</td>
            </tr>
        </table>
    </htmlpagefooter>';


    $mpdf->SetHeader('<img src="assets/lakip.jpeg" width="70" />|<p>LEMBAGA ADMINISTRASI KEUANGAN DAN ILMU PEMERINTAHAN</p>
    <p>SKT DITJEN POLPUM KEMENDAGRI NOMOR : 001-00-00/034/I/2019</p> 
    <p>Sekretariat : Jln. Serdang Baru Raya No. 4B, Kemayoran - Jakarta 10650</p>
    <p>Website : www.lakip.co.id E-mail : admin@lakip.co.id Telp./Fax. 021-42885718</p>
    |');
    $mpdf->WriteHTML($html);
    // FOOTER
    // $mpdf->SetFooter('footer||Page {PAGENO}', '$footer');

    // $mpdf = WriteHTML($html);
    // $mpdf->WriteHTML($text);
    // $footer = array(
    //   'odd' => array(
    //     'L' => array(
    //       'content' => '',
    //       'font-size' => 12,
    //       'font-style' => 'B',
    //       'font-family' => 'serif',
    //       'color' => '#000000'
    //     ),
    //     'C' => array(
    //       'content' => '',
    //       'font-size' => 12,
    //       'font-style' => 'B',
    //       'font-family' => 'serif',
    //       'color' => '#000000'
    //     ),
    //     'R' => array(
    //       'content' => 'My document',
    //       'font-size' => 12,
    //       'font-style' => 'B',
    //       'font-family' => 'serif',
    //       'color' => '#000000'
    //     ),
    //     'line' => 1,
    //   ),
    //   'even' => array()
    // );
    // CSS
    // $mpdf->defaultheaderfontsize = 12;
    // $mpdf->defaultheaderfontstyle = 'B';
    // $mpdf->defaultheaderline = 5;
    // $mpdf->defaultfooterfontsize = 10;
    // $mpdf->defaultfooterfontstyle = 'BI';
    // $mpdf->defaultfooterline = 0;

    // Set initial state of layer: "hidden" or nothing
    // $mpdf->layerDetails[z]['state'] = 'hidden';
    // Write some HTML code:
    // $mpdf->layerDetails[z]['name'] = 'Correct Answers';
    // $html = ROOTPATH . 'public/assets/lakip.jpeg';

    // $mpdf->useOddEven = true;

    // $mpdf->SetHeader('First section header');
    // $mpdf->SetFooter('First section footer');
    // $mpdf->WriteHTML('First section text...');

    // Use a conditional page-break to ensure you are on an EVEN page before
    // changing the Header
    // $mpdf->AddPage('', 'E');

    // Now you know that this page-break takes you to an ODD page
    // $mpdf->SetHeader('Second section header');

    // $mpdf->AddPage();
    // $mpdf->SetFooter('Second section footer');
    // $mpdf->WriteHTML('Second section text...');


    // <img src="assets/lakip.jpeg"
    // $mpdf->img_dpi = 96;

    // $mpdf->open_layer_pane = true;
    // $this->defaultPagebreakType;
    // $mpdf->use_kwt = true;





    // $mpdf->WriteHTML('Masrianto');




    $html = '
<html>
<head>
<style>
    @page {
      size: auto;
      odd-header-name: html_MyHeader1;
      odd-footer-name: html_MyFooter1;
    }

    @page chapter2 {
        odd-header-name: html_MyHeader2;
        odd-footer-name: html_MyFooter2;
    }

    @page noheader {
        odd-header-name: _blank;
        odd-footer-name: _blank;
    }

    div.chapter2 {
        page-break-before: always;
        page: chapter2;
    }

    div.noheader {
        page-break-before: always;
        page: noheader;
    }
</style>
</head>
<body>
    <htmlpageheader name="MyHeader1">
        <div style="text-align: right; border-bottom: 1px solid #000000; font-weight: bold; font-size: 10pt;">My document</div>
    </htmlpageheader>

    <htmlpageheader name="MyHeader2">
        <div style="border-bottom: 1px solid #000000; font-weight: bold;  font-size: 10pt;">My document</div>
    </htmlpageheader>

    <htmlpagefooter name="MyFooter1">
        <table width="100%" style="vertical-align: bottom; font-family: serif; font-size: 8pt; color: #000000; font-weight: bold; font-style: italic;">
            <tr>
                <td width="33%"><span style="font-weight: bold; font-style: italic;">{DATE j-m-Y}</span></td>
                <td width="33%" align="center" style="font-weight: bold; font-style: italic;">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">My document</td>
            </tr>
        </table>
    </htmlpagefooter>

    <htmlpagefooter name="MyFooter2">
        <table width="100%" style="vertical-align: bottom; font-family: serif; font-size: 8pt; color: #000000; font-weight: bold; font-style: italic;">
            <tr>
                <td width="33%"><span style="font-weight: bold; font-style: italic;">My document</span></td>
                <td width="33%" align="center" style="font-weight: bold; font-style: italic;">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">{DATE j-m-Y}</td>
            </tr>
        </table>
    </htmlpagefooter>

    <div>Here is the text of the first chapter</div>
    <div class="chapter2">Text of Chapter 2</div>

    <div class="noheader">No-Header page</div>
</body>
</html>';

    $mpdf->WriteHTML($html);


    $html = '
    <htmlpageheader name="MyHeader1">
        <div style="text-align: right">My document</div>
    </htmlpageheader>
    
    <htmlpagefooter name="MyFooter1">
        <table width="100%">
            <tr>
                <td width="33%"><span style="font-weight: bold; font-style: italic;">{DATE j-m-Y}</span></td>
                <td width="33%" align="center" style="font-weight: bold; font-style: italic;">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">My document</td>
            </tr>
        </table>
    </htmlpagefooter>
    
    <sethtmlpageheader name="MyHeader1" value="on" show-this-page="1" />
    <sethtmlpagefooter name="MyFooter1" value="on" />
    
    <div>Start of the document ... and all the rest</div>';

    $mpdf->WriteHTML($html);

    $text = '<p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius tempore iusto, molestiae 
    nesciunt animi cumque,   // non-standard support for dimension iste voluptas officia harum possimus  // 90 pixels, just like HTML
    accusantium quidem et sequi unde perspiciatis velit, recusandae a voluptatibus?  // Can also use CSS  width="90mm" /></p>';
    // <pagebreak page-break-type="clonebycss" />
    $mpdf->WriteHTML($text);

    $mpdf->AddPage();

    // $arr['L']['content'] = 'Chapter 2';
    // $mpdf->SetHeader($arr, 'O');
    // $mpdf->BeginLayer($z-index);
    // <img src="assets/lakip.jpeg" style="width:90mm;" />

    // $mpdf->EndLayer();
    // $mpdf->image($html, 0, 0, 210, 297, 'jpeg', '', true, false);

    // return redirect()->to($mpdf->Output('filename.pdf', 'I'));


    // $mpdf->WriteHTML('Masrianto');






    // $data = [
    //   'halaman' => 'PDF',
    //   'title' => 'Document',
    //   $mpdf = $this->pdfModel,
    //// 'pdf' => $this->pdfModel->paginate(6),
    //// 'pager' => $this->pdfModel->pager,

    //// 'pdf' => $pdf->paginate(10, 'pdf'),
    // 'pdf' => $pdf->paginate(10, 'id'),
    // 'pager' => $this->pdfModel->pager,
    // 'currentPage' => $currentPage
    // ];

    return redirect()->to($mpdf->Output('filename.pdf', 'I'));
    // return view('pdf/index', $data);
  }

  //--------------------------------------------------------------------


}
