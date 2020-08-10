<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Front extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
	}

	public function index()
	{
		$data['title'] = 'Welcome to My Website';
		$data['content'] = $this->load->view('front/homepage', null, TRUE);
		$this->load->view('template/frontend', $data);
	}

	public function list_user()
	{
		/*data user*/
		$this->load->model('usermodel');
		$data_user = $this->usermodel->read_data();
		
		$data['title'] = 'Welcome to My Website';
		$data['content'] = $this->load->view('front/list_user', array('users' => $data_user), TRUE);
		$this->load->view('template/frontend', $data);
	}
}
