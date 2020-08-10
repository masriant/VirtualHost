<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct()
	{
		parent::__construct();
		//harus login
		if (! $this->session->userdata('username')) {
			redirect('user/login');
		}
	}

	public function index()
	{
		$this->load->view('template/header');
		$this->load->view('home');
		$this->load->view('template/footer');
	}

	public function nilai()
	{

		//view ke variable
		$nilai = $this->load->view('data_nilai', NULL, TRUE);
		//$this->load->view('welcome_message');
		$this->load->view('template/header');

		$this->load->view('data_siswa', array('data_nilai' => $nilai));
		//$this->load->view('data_nilai', NULL);

		$this->load->view('template/footer');

		//manual output
		//echo "<h2 style='text-align: center; color: red;'>Welcome to My Website</h2>";
	}

	public function data_guru()
	{
		$list_guru = array(
			array(
				'nama' => 'Bpk. Joko',
				'ket' => 'Guru IPA'
			),
			array(
				'nama' => 'Bpk. Adi',
				'ket' => 'Guru Matematika'
			),
			array(
				'nama' => 'Ibu Ani',
				'ket' => 'Guru Bahasa Indonesia'
			),
		);

		$this->load->view('template/header');
		$this->load->view('data_guru', array('data_guru' => $list_guru));
		$this->load->view('template/footer');
	}
}
