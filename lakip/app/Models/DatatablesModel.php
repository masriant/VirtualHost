<?php

namespace App\Models;

use CodeIgniter\Model;

class DatatablesModel extends Model
{
  var $column_order = array('id', 'nama', 'alamat', 'kodeqr');
  var $order = array('id' => 'asc');

  function get_datalist()
  {

    // search
    if ($_POST['search']['value']) {
      $search = $_POST['search']['value'];
      $kondisi_search = "nama LIKE '%$search%' OR Alamat LIKE '%$search%' OR kodeqr LIKE '%$search%'";
    } else {
      $kondisi_search = "id != ''";
    }

    // order
    if ($_POST['order']) {
      $result_order = $this->column_order[$_POST['order']['0']['column']];
      $result_dir = $_POST['order']['0']['dir'];
    } else if ($this->order) {
      $order = $this->order;
      $result_order = key($order);
      $result_dir = $order[key($order)];
    }


    if ($_POST['length'] != -1);
    $db = db_connect();
    $builder = $db->table('lakip');
    $query = $builder->select('*')
      ->where($kondisi_search)
      ->orderBy($result_order, $result_dir)
      ->limit($_POST['length'], $_POST['start'])
      ->get();
    return $query->getResult();
  }


  function jumlah_semua()
  {
    $kQuery = "SELECT COUNT(id) as jml FROM lakip";
    $db = db_connect();
    $query = $db->query($kQuery)->getRow();
    return $query;
  }

  function jumlah_filter()
  {
    // kondisi_search
    if ($_POST['search']['value']) {
      $search = $_POST['search']['value'];
      $kondisi_search = " AND (nama LIKE '%$search%' OR alamat LIKE '%$search%' OR kodeqr LIKE '%$search%')";
    } else {
      $kondisi_search = "";
    }

    $kQuery = "SELECT COUNT(id) as jml FROM lakip WHERE id != '' $kondisi_search";
    $db = db_connect();
    $query = $db->query($kQuery)->getRow();
    return $query;
  }
}