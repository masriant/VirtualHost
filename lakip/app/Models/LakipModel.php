<?php

namespace App\Models;

use CodeIgniter\Model;

class LakipModel extends Model
{
  protected $table = 'orang';
  protected $useTimestamps = true;
  protected $allowedFields = ['nama', 'alamat'];

  // public function getOrang($slug = false)
  // {
  //   if ($slug == false) {
  //     return $this->findAll();
  //   }

  //   return $this->where(['slug' => $slug])->first();
  // }

  public function search($keyword)
  {
    // $builder = $this->table('orang');
    // $builder->like('name', $keyword);
    // return $builder;

    return $this->table('orang')->like('nama', $keyword)->orLike('alamat', $keyword);
  }
}