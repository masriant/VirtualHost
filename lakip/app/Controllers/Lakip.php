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
    $currentPage = $this->request->getVar('page_lakip') ? $this->request->getVar('page_lakip') : 1;

    $keyword = $this->request->getVar('keyword');
    if ($keyword) {
      $lakip = $this->lakipModel->search($keyword);
    } else {
      $lakip = $this->lakipModel;
    }
    $data = [
      'halaman' => 'Database',
      'title' => 'List Data Peserta',
      // 'lakip' => $this->lakipModel->paginate(6),
      // 'pager' => $this->lakipModel->pager,

      // 'lakip' => $lakip->paginate(10, 'lakip'),
      'lakip' => $lakip->paginate(10, 'id'),
      'pager' => $this->lakipModel->pager,
      'currentPage' => $currentPage
    ];

    return view('lakip/index', $data);
  }

  //--------------------------------------------------------------------

}