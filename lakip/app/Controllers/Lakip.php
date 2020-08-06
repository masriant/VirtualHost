<?php

namespace App\Controllers;

class Lakip extends BaseController
{
  public function index()
  {
    $data = [
      'page' => 'LAKIP',
      'title' => 'Daftar Peserta',
    ];
    return view('lakip/index', $data);
  }

  //--------------------------------------------------------------------

}