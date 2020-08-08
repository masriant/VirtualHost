<?php

namespace App\Controllers;

use App\Models\LakipModel;

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
    $lakip = $this->lakipModel->detail($id);

    $data = [
      'halaman' => 'Detail',
      'title' => 'Peserta',
      'lakip' => $lakip,
    ];

    return view('lakip/detail', $data);
  }

  public function edit($id)
  {
    $lakip = $this->lakipModel->detail($id);

    $data = [
      'halaman' => 'Edit',
      'title' => 'Edit',
      'lakip' => $lakip,
    ];

    return view('lakip/edit', $data);
  }

  public function print($id)
  {
    $lakip = $this->lakipModel->detail($id);

    $data = [
      'halaman' => 'Print',
      'title' => 'Print',
      'lakip' => $lakip,
    ];

    return view('lakip/print', $data);
  }

  public function printer($id)
  {
    $lakip = $this->lakipModel->detail($id);

    $data = [
      'halaman' => 'Printer ',
      'title' => 'Printer',
      'lakip' => $lakip,
    ];

    return view('lakip/v_print', $data);
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
      'kodeqr' => [
        'rules' => 'max_size[kodeqr,1024]|is_image[kodeqr]|mime_in[kodeqr,image/jpg,image/jpeg,image/png]',
        'errors' => [
          'max_size' => 'Ukuran {field} terlalu besar.',
          'is_image' => 'Yang anda pilih bukan gambar.',
          'mime_in' => 'Yang anda pilih bukan gambar.'
        ]
      ]
    ])) {
      // $validation = \Config\Services::validation();
      // return redirect()->to('/lakip/create')->withInput()->with('validation', $validation);
      return redirect()->to('/lakip/create')->withInput();
    }

    // ambil gambar
    $filekodeqr = $this->request->getFile('kodeqr');
    // Apakah tidak ada gambar yang di upload
    if ($filekodeqr->getError() == 4) {
      $namakodeqr = 'default.jpg';
    } else {
      // Generate nama kodeqr random
      $namakodeqr = $filekodeqr->getRandomName();
      // pindahkan file ke folder img
      $filekodeqr->move('images', $namakodeqr);
      // ambil nama file
      // $namakodeqr = $filekodeqr->getName();
    }


    $slug = url_title($this->request->getVar('nama'), '-', true);
    $this->lakipModel->save([
      'nama' => $this->request->getVar('nama'),
      'slug' => $slug,
      'alamat' => $this->request->getVar('alamat'),
      'kodeqr' => $this->request->getVar('kodeqr'),
      'kodeqr' => $namakodeqr
    ]);

    session()->setFlashdata('pesan', 'Data berhasil ditambahkan.');

    return redirect()->to('/lakip');
  }

  public function update($id)
  {
    $lakip = $this->lakipModel->detail($id);

    $data = [
      'halaman' => 'Edit',
      'title' => 'Edit',
      'lakip' => $lakip,
    ];

    return view('lakip/detail', $data);
  }
}