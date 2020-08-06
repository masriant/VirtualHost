<?php

namespace App\Database\Seeds;

use CodeIgniter\I18n\Time;


class LakipSeeder extends \CodeIgniter\Database\Seeder
{
  public function run()
  {
    // coba faker
    $faker = \Faker\Factory::create('id_ID');
    // $faker = \Faker\Factory::create();
    // $faker = new \Faker\Generator();
    // $faker->addProvider(new \Faker\Provider\ms_MY\Address($faker));
    // $faker->addProvider(new \Faker\Provider\id_ID\Person($faker));
    // $faker->addProvider(new \Faker\Provider\en_US\Address($faker));
    // $faker->addProvider(new \Faker\Provider\it_IT\Person($faker));
    // generate data by accessing properties
    // echo $faker->name;
    for ($i = 0; $i < 100; $i++) {
      $data = [
        'nama'       => $faker->firstName,
        'alamat'     => $faker->company,
        'kodeqr'     => $faker->nik,
        'created_at' => Time::createFromTimestamp($faker->unixTime()),
        'updated_at' => Time::now(),
        'deleted_at' => '',
      ];
      $this->db->table('lakip')->insert($data);
    }
  }
}

// // bila masih kosong
// 1. php spark migrate:create Orang
// 2. php spark migrate:create komik
// 3. php spark migrate:create Users 
// 4. php spark migrate:create Register

// // karena data sudah ada maka langsung migrate
// 5. php spark migrate

// // isi database
// 6. php spark db:seed OrangSeeder
// 7. php spark db:seed komikSeeder
// 8. php spark db:seed UsersSeeder
// 9. php spark db:seed RegisterSeeder


// 10. php spark db:seed EventSeeder


// 1. php spark migrate:create Lakip // buat nama tabel
// 2. php spark migrate // buat migrasi di DB
// 3. php spark db:seed LakipSeeder // buat tabel DB di DBMS