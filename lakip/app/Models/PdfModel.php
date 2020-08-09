<?php

namespace App\Models;

use CodeIgniter\Model;

class PdfModel extends Model
{
  protected $table = 'lakip';
  protected $useTimestamps = true;
  protected $allowedFields = ['nama', 'alamat', 'kodeqr'];

  // public function getLakip($slug = false)
  // {
  //   if ($slug == false) {
  //     return $this->findAll();
  //   }

  //   return $this->where(['slug' => $slug])->first();
  // }

  public function getPdf($id = false)
  {
    if ($id === false) {
      return $this->findAll();
    } else {
      return $this->getWhere(['id' => $id]);
    }
  }

  public function getPrint()
  {
    return $this->db->table('lakip')->get()->getResultArray();
  }

  public function editPrint($id)
  {
    return $this->db->table('lakip')->where('id', $id)->get()->getRowArray();
  }
}