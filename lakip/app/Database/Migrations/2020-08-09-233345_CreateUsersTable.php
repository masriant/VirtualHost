<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use Illuminate\Database\Schema\Blueprint;


class CreateUsersTable extends Migration
{
	public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('full_name');
			$table->string('email')->unique();
			$table->string('username')->unique();
			$table->string('password');
			$table->timestamp('email_verified_at')->nullable();
			$table->string('avatar')->nullable();
			$table->rememberToken();
			$table->timestamps();
		});
	}

	//--------------------------------------------------------------------

	public function down()
	{
		Schema::dropIfExists('users');
	}
}