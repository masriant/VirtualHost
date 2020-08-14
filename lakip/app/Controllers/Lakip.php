<?php

namespace App\Controllers;

use App\Models\LakipModel;

use Mpdf\Mpdf;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Lakip extends BaseController
{
  protected $lakipModel;

  public function __construct()
  {
    $this->lakipModel = new LakipModel();
  }
  public function index()
  {
    // $lakip = $this->lakipModel->findAll();
    $currentPage = $this->request->getVar('page_id') ? $this->request->getVar('page_id') : 1;

    // $currentPage = $this->request->getVar('page_lakip') ? $this->request->getVar('page_lakip') : 1;

    $keyword = $this->request->getVar('keyword');
    if ($keyword) {
      $lakip = $this->lakipModel->search($keyword);
    } else {
      $lakip = $this->lakipModel;
    }
    $data = [
      'halaman' => 'Database',
      'title' => 'List Data Peserta',
      // 'lakip' => $lakip->paginate(6, 'id'),
      'lakip' => $lakip->paginate(10, 'id'),
      'pager' => $this->lakipModel->pager,
      'currentPage' => $currentPage
      // 'lakip' => $this->lakipModel->paginate(6),
      // 'pager' => $this->lakipModel->pager,

    ];

    return view('lakip/index', $data);
  }

  public function create()
  {
    // session();
    $data = [
      'halaman' => 'Create',
      'title' => 'Form Tambah Data',
      'validation' => \Config\Services::validation()
    ];

    return view('lakip/create', $data);
  }


  //--------------------------------------------------------------------
  public function cari()
  {
    // // $lakip = $this->lakipModel->findAll(); //

    // $currentPage = $this->request->getVar('page_id') ? $this->request->getVar('page_id') : 1;


    // $keyword = $this->request->getVar('keyword');
    // if ($keyword) {
    //   $lakip = $this->lakipModel->search($keyword);
    // } else {
    //   $lakip = $this->lakipModel;
    // }
    // $lakip = $this->lakipModel->findAll();
    // $lakip = $this->lakipModel->search($keyword);
    $lakip = $this->lakipModel->getLakip();
    $data = [
      'halaman' => 'Cari',
      'title' => 'Peserta',
      'lakip' => $lakip,
      // 'pager' => $this->lakipModel->pager,
      // 'currentPage' => $currentPage

    ];

    // Jika data tidak ada ditabel
    // if (empty($data['lakip'])) {
    //   throw new \CodeIgniter\Exceptions\PageNotFoundException('Data yang anda cari adalah :  '  . $lakip .  ' dan tidak ada dalam database kami.');
    // }
    return view('lakip/cari', $data);
  }

  public function detail($id)
  {
    $lakip = $this->lakipModel->find($id);

    $data = [
      'halaman' => 'Detail',
      'title' => 'Peserta',
      'lakip' => $lakip,
    ];

    return view('lakip/detail', $data);
  }

  public function edit($id)
  {
    $lakip = $this->lakipModel->find($id);

    $data = [
      'halaman' => 'Edit',
      'title' => 'Edit',
      'lakip' => $lakip,
      'validation' => \Config\Services::validation(),
      // 'komik' => $this->komikModel->getKomik($slug)

    ];

    return view('lakip/edit', $data);
  }

  public function print($id)
  {
    $lakip = $this->lakipModel->find($id);

    $data = [
      'halaman' => 'Print',
      'title' => 'Print',
      'lakip' => $lakip,
    ];

    return view('lakip/print', $data);
  }

  public function printer($id)
  {
    $lakip = $this->lakipModel->find($id);

    $data = [
      'halaman' => 'Printer ',
      'title' => 'Printer',
      'lakip' => $lakip,
    ];

    return view('lakip/v_print', $data);
  }

  public function list()
  {
    $lakip = $this->lakipModel->getLakip();

    $data = [
      'halaman' => 'Printer ',
      'title' => 'Printer',
      'lakip' => $lakip,
    ];

    return view('lakip/list_print', $data);
  }


  public function save()
  {
    // validasi input 
    if (!$this->validate([
      'nama' => [
        'rules' => 'required|is_unique[lakip.nama]',
        'errors' => [
          'required' => '{field} harus diisi.',
          'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      'alamat' => [
        'rules' => 'required|is_unique[lakip.alamat]',
        'errors' => [
          'required' => '{field} harus diisi.',
          'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      'kodeqr' => [
        'rules' => 'required|is_unique[lakip.kodeqr]',
        'errors' => [
          'required' => '{field} harus diisi.',
          'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      // 'kodeqr' => [
      //   'rules' => 'max_size[kodeqr,1024]|is_image[kodeqr]|mime_in[kodeqr,image/jpg,image/jpeg,image/png]',
      //   'errors' => [
      //     'max_size' => 'Ukuran {field} terlalu besar.',
      //     'is_image' => 'Yang anda pilih bukan gambar.',
      //     'mime_in' => 'Yang anda pilih bukan gambar.'
      //   ]
      // ]
    ])) {
      // $validation = \Config\Services::validation();
      // return redirect()->to('/lakip/create')->withInput()->with('validation', $validation);
      return redirect()->to('/lakip/create')->withInput();
    }

    // ambil gambar
    // $filekodeqr = $this->request->getFile('kodeqr');
    // Apakah tidak ada gambar yang di upload
    // if ($filekodeqr->getError() == 4) {
    //   $namakodeqr = 'default.jpg';
    // } else {
    //   // Generate nama kodeqr random
    //   $namakodeqr = $filekodeqr->getRandomName();
    //   // pindahkan file ke folder img
    //   $filekodeqr->move('images', $namakodeqr);
    //   // ambil nama file
    //   // $namakodeqr = $filekodeqr->getName();
    // }


    // $slug = url_title($this->request->getVar('nama'), '-', true);
    $this->lakipModel->save([
      'nama' => $this->request->getVar('nama'),
      // 'slug' => $slug,
      'alamat' => $this->request->getVar('alamat'),
      'kodeqr' => $this->request->getVar('kodeqr'),
      // 'kodeqr' => $namakodeqr
    ]);

    session()->setFlashdata('pesan', 'Data berhasil ditambahkan.');

    return redirect()->to('/lakip');
  }

  public function update($id)
  {
    // $lakip = $this->lakipModel->detail($id);

    // $data = [
    //   'halaman' => 'Edit',
    //   'title' => 'Edit',
    //   'lakip' => $lakip,
    // ];

    // return view('lakip/detail', $data);


    // $lakipLama = $this->lakipModel->detail($this->request->getVar('id'));
    // if ($lakipLama['nama'] == $this->request->getVar('nama')) {
    //   $rule_nama = 'required';
    // } else {
    //   $rule_nama = 'required|is_unique[lakip.nama]';
    // }

    if (!$this->validate([
      'nama' => [
        // 'rules' => 'required|is_unique[lakip.nama]',
        'rules' => 'required',
        // 'rules' => $rule_nama,
        'errors' => [
          'required' => '{field} harus diisi.',
          // 'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      'alamat' => [
        // 'rules' => 'required|is_unique[lakip.alamat]',
        'rules' => 'required',
        'errors' => [
          'required' => '{field} harus diisi.',
          // 'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      'kodeqr' => [
        'rules' => 'required|is_unique[lakip.kodeqr]',
        // 'rules' => 'required',
        'errors' => [
          // 'required' => '{field} harus diisi.',
          'is_unique' => '{field} sudah terdaftar.'
        ]
      ],
      // 'sampul' => [
      //   'rules' => 'max_size[sampul,1024]|is_image[sampul]|mime_in[sampul,image/jpg,image/jpeg,image/png]',
      //   'errors' => [
      //     'max_size' => 'Ukuran {field} terlalu besar.',
      //     'is_image' => 'Yang anda pilih bukan gambar.',
      //     'mime_in' => 'Yang anda pilih bukan gambar.'
      //   ]
      // ]
    ])) {
      return redirect()->to('/lakip/edit/' . $this->request->getVar('id'))->withInput();
    }
    // ambil gambar
    // $fileSampul = $this->request->getFile('sampul');
    // // cek gambar apakah tetap pakai gambar lama
    // if ($fileSampul->getError() == 4) {
    //   $namaSampul = $this->request->getVar('sampulLama');
    // } else {
    //   // Generate nama sampul random
    //   $namaSampul = $fileSampul->getRandomName();
    //   // pindahkan file ke folder image
    //   $fileSampul->move('images', $namaSampul);
    //   // hapus file yang lama
    //   unlink('images/' . $this->request->getVar('sampulLama'));
    // }

    // $slug = url_title($this->request->getVar('judul'), '-', true);
    $this->lakipModel->save([
      'id' => $id,
      'nama' => $this->request->getVar('nama'),
      // 'slug' => $slug,
      'alamat' => $this->request->getVar('alamat'),
      'kodeqr' => $this->request->getVar('kodeqr'),
      'updated_at' => $this->request->getVar('updated_at'),
      // 'sampul' => $namaSampul
    ]);

    session()->setFlashdata('pesan', 'Data berhasil diubah.');

    return redirect()->to('/lakip');
  }

  public function delete($id)
  {
    // cari gambar berdasarkan id
    $komik = $this->komikModel->find($id);
    // cek jika file gambarnya default.jpg
    if ($komik['sampul'] != 'default.jpg') {
      // Hapus gambar
      unlink('images/' . $komik['sampul']);
    }

    $this->komikModel->delete($id);
    session()->setFlashdata('pesan', 'Data berhasil dihapus.');

    return redirect()->to('/komik');
  }


  public function spreadsheet()
  {

    $lakip = $this->lakipModel->findAll();
    $spreadsheet = new Spreadsheet();

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xlsx");
    $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    $writer = new Xlsx($spreadsheet);
    // $writer->save("05featuredemo.xlsx");


    $spreadsheet->getProperties()
      ->setCreator("Masrianto")
      ->setLastModifiedBy("www.lakip.co.id")
      ->setTitle("LAKIP.CO.ID")
      ->setSubject("Office 2007 XLSX LAKIP Document")
      ->setDescription("Lembaga Administrasi Keuangan dan Ilmu Pemerintahan")
      ->setKeywords("Lembaga Administrasi Keuangan dan Ilmu Pemerintahan")
      ->setCategory("Result Laporan");



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

    $spreadsheet->getActiveSheet()->getPageMargins()->setTop(0.5);
    $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.7);
    $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.7);
    $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(0.5);

    $spreadsheet->getActiveSheet()->getHeaderFooter()
      ->setOddFooter('&L&B' . $spreadsheet->getProperties()->getTitle() . '&RPage &P of &N');
    $spreadsheet->getActiveSheet()->getPageSetup()
      ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);

    $tgl_cetak = date('dmY His');
    $filename = 'Data ';

    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="' . $filename . $tgl_cetak . '.xlsx"');
    header('Cache-Control: max-age=0');

    return $writer->save('php://output');

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


    // $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.75);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.75);
    // $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(1);

    // $spreadsheet->getActiveSheet()->getHeaderFooter()
    //   ->setOddHeader('&C&HPlease treat this document as confidential!');




    // $writer->save('php://output');

    // $spreadsheet->getSheetByName("File-" . $tgl_cetak . " - Copy");


    // $class = new \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf::class;
    // \PhpOffice\PhpSpreadsheet\IOFactory::registerWriter('Pdf', $class);
    // $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Pdf');




    // $writer->save('php://output');

    // $writer = \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf($spreadsheet);
    // $writer = new \PhpOffice\PhpSpreadsheet\Writer\Pdf\Mpdf($spreadsheet);
    // $writer->writeAllSheets()->save("05feature.pdf");

    // return redirect()->to($writer->save('php://output'));
  }
}