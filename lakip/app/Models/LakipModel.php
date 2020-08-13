<?php

namespace App\Models;

use CodeIgniter\Model;

class LakipModel extends Model
{
  protected $table = 'lakip';
  protected $useTimestamps = true;
  protected $allowedFields = ['nama', 'alamat', 'kodeqr'];

  public function getLakip($slug = false)
  {
    if ($slug == false) {
      return $this->findAll();
    }

    return $this->where(['slug' => $slug])->first();
  }

  public function search($keyword)
  {
    // $builder = $this->table('lakip');
    // $builder->like('name', $data);
    // $builder->like('alamat', $data);
    // $builder->like('kodeqr', $data);
    // return $builder;

    return $this->table('lakip')->like('nama', $keyword)->orLike('alamat', $keyword)->orLike('kodeqr', $keyword);
  }

  // public function detail($id)
  // {
  //   // if ($id == false) {
  //   //   return $this->findAll();
  //   // }

  //   return $this->where(['id' => $id])->first();

  //   // return $this->table('lakip')->like('nama', $id)->orLike('alamat', $id)->orLike('kodeqr', $id);
  // }

  // public function getdataAjaxInponow($data)
  // public function jumlah($id)
  // {
  //   $query = $this->db->query('SELECT * FROM lakip');
  //   return $this->table('lakip')->getFieldCount($id);

  //   // $queryaku = "SELECT nama, alamat FROM lakip WHERE nama LIKE '$data%' OR alamat LIKE '$data%'";
  //   // $query = $this->db->query($queryaku);

  //   // return $query->result_array();
  // }
}