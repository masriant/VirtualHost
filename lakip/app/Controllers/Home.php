<?php

namespace App\Controllers;

use App\Models\LakipModel;

class Home extends BaseController
{
	protected $lakipModel;

	public function __construct()
	{
		$this->lakipModel = new LakipModel();
	}
	public function index()
	{
		return view('index');
	}

	//--------------------------------------------------------------------
	public function getDataFromAjx()
	// public function detail()
	{
		$data = $this->input->post('input_ajx');
		// bisa juga menggunakaan-> $_POST['input_ajx'] 
		$ini = $this->lakipModel->getdataAjax($data);
		echo json_encode($ini);
		return view('index', $data);
	}
}