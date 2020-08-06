<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Lakip extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'id'          => [
				'type'           => 'INT',
				'constraint'     => 11,
				'unsigned'       => true,
				'auto_increment' => true,
			],
			'nama'       => [
				'type'           => 'VARCHAR',
				'constraint'     => '255',
			],
			'alamat'       => [
				'type'           => 'VARCHAR',
				'constraint'     => '255',
			],
			'kodeqr'       => [
				'type'           => 'VARCHAR',
				'constraint'     => '255',
			],
			'created_at' => [
				'type'					 => 'DATETIME',
				'null'					 => true,
			],
			'updated_at' => [
				'type'					=> 'DATETIME',
				'null'					=> true,
			],
			'deleted_at' => [
				'type'					=> 'DATETIME',
				'null'					=> true,
			]
		]);
		$this->forge->addKey('id', true);
		$attributes = ['ENGINE' => 'InnoDB'];
		$this->forge->createTable('lakip', FALSE, $attributes);
	}

	//--------------------------------------------------------------------

	public function down()
	{
		$this->forge->dropTable('lakip', TRUE);
	}
}