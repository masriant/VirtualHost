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

  // public function search($keyword)
  // {
  //   // $builder = $this->table('lakip');
  //   // $builder->like('name', $keyword);
  //   // return $builder;

  //   return $this->table('lakip')->like('nama', $keyword)->orLike('alamat', $keyword)->orLike('kodeqr', $keyword);
  // }
}