<?php

namespace App\Controllers;

use App\Models\DatatablesModel;
use CodeIgniter\Controllers;


class Data extends BaseController
{
  public function __construct()
  {
    // $this->lakipModel = new LakipModel();
    $this->datalakip = new DatatablesModel();
  }
  public function index()
  {
    return view('datatables/index_data');
  }
  public function kwitansi()
  {

    // $nilai = $this->datalakip->penyebut($nilai);
    // $nilai = $this->datalakip->terbilang($nilai);

    $this->datalakip = new DatatablesModel();

    $data = [
      'title' => 'Kwitansi',
      'halaman' => 'kwitansi',
      // 'terbilang' => $this->lakipModel,
      // 'terbilang' => $terbilang($nilai);
    ];

    return view('datatables/kwitansi', $data);
  }

  public function listdata()
  {
    $model = new DatatablesModel();

    $listlakip = $model->get_datalist();
    $jumlah_semua = $model->jumlah_semua();
    $jumlah_filter = $model->jumlah_filter();

    $data = array();
    $no = $_POST['start'];
    foreach ($listlakip as $key) {
      $no++;
      $row = array();
      $row[] = $no;
      $row[] = $key->nama;
      $row[] = $key->alamat;
      $row[] = $key->kodeqr;

      $data[] = $row;
    }

    $output = array(
      "draw" => $_POST['draw'],
      "recordsTotal" => $jumlah_semua->jml,
      "recordsFiltered" => $jumlah_filter->jml,
      "data" => $data
    );
    echo json_encode($output);
  }

  //--------------------------------------------------------------------

}