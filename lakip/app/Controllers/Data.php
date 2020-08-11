<?php

namespace App\Controllers;

use CodeIgniter\Controllers;
use App\Models\DatatablesModel;

class Data extends BaseController
{
  public function index()
  {
    return view('datatables/index_data');
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