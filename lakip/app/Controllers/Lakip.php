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
}