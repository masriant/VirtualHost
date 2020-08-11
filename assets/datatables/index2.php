<?php namespace App\Models;

use CodeIgniter\Model;

class Index2 extends Model
{
    protected $table      = 'tableName';
    protected $primaryKey = 'id';

    protected $returnType = 'array';
    protected $useSoftDeletes = true;

    protected $allowedFields = [];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Index2 extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->view('home');
	}

	public function load_data()
	{
		$this->load->library('datatables_server_side', array(
			'table' => 'customer',
			'primary_key' => 'customer_id',
			'columns' => array('first_name', 'last_name', 'email'),
			'where' => array()
		));

		$this->datatables_server_side->process();
	}
}