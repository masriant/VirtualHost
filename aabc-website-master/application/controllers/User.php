<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usermodel');
	}

	public function index()
	{
		$extra_js = '
			<script>
				$(document).ready(function() {
				    $("#table-user").DataTable({
				    	"paging":false,
				    	"ordering": false,
				    });
				});
			</script>
		';
		$data_user = $this->usermodel->read_data();
		$this->load->view('template/header');
		$this->load->view('user/index', array('users' => $data_user));
		$this->load->view('template/footer', array('extra_js' => $extra_js));
	}

	public function add()
	{
		$this->load->model('levelmodel');
		$level = $this->levelmodel->read_data();

		$extra_js = $this->load->view('user/extra_js', NULL, TRUE);

		$this->load->view('template/header');
		$this->load->view('user/form_add', array('levels' => $level, 'extra_js' => $extra_js));
		$this->load->view('template/footer');
	}

	public function simpan_data()
	{
		$msg = '';
		$code = 0;
		//validasi
		//upload foto
		//config
		$config['upload_path']          = './asset/images/';
		$config['allowed_types']        = 'gif|jpg|png';
		//$config['max_size']             = 100;
		//$config['max_width']            = 1024;
		//$config['max_height']           = 768;

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload('foto')) {
		    $msg = $this->upload->display_errors();
		    $file_name = '';
		} else {
			$code = 1;
			$file_name = $this->upload->data('file_name');
		}

		if ($code == 0) {
			$this->session->set_flashdata('error_input_user', $msg);
			redirect('user/add');
			exit();
		}

		//prepare data (mapping data) \
		$data = array(
			'username' => $this->input->post('username'),
			'email' => $this->input->post('email'),
			'level_id' => $this->input->post('level_id'),
			'password' => md5($this->input->post('password')),
			'description' => $this->input->post('description'),
			'is_active' => $this->input->post('status'),
			'foto' => $file_name
		);

		//proses simpan
		$simpan = $this->usermodel->create_data($data);
		//cek berhasil atau tidak
		if ($simpan) {
			$this->index();
		} else {
			$this->add();
		}
	}

	public function edit($id = null)
	{
		// id yang akan di edit
		$user_id = (int) $id;
		// data level berdasarkan id
		$user = $this->usermodel->get_data($user_id);
		//data level
		$this->load->model('levelmodel');
		$levels = $this->levelmodel->read_data();

		$extra_js = $this->load->view('user/extra_js', NULL, TRUE);
		
		$this->load->view('template/header');
		$this->load->view('user/form_edit', array('user' => $user, 'levels' => $levels, 'extra_js' => $extra_js));
		$this->load->view('template/footer');
	}

	public function update_data()
	{
		//validasi
		//prepare data (mapping data) \
		$data = array(
			'username' => $this->input->post('username'),
			'email' => $this->input->post('email'),
			'level_id' => $this->input->post('level_id'),
			//'password' => md5($this->input->post('password')),
			'description' => $this->input->post('description'),
			'is_active' => $this->input->post('status')
		);

		//update password jika tidak kosong
		if ($this->input->post('password') != '') {
			$data['password'] = md5($this->input->post('password'));
		}
		//proses simpan
		$update = $this->usermodel->update_data($this->input->post('id'), $data);
		//cek berhasil atau tidak
		if ($update) {
			$this->index();
		} else {
			$this->edit($this->input->post('id'));
		}
	}

	public function delete($id = null)
	{
		// id yang akan di delete
		$user_id = (int) $id;
		// delete data level berdasarkan id
		$hapus = $this->usermodel->delete_data($user_id);
		// cek
		$this->index();
	}

	public function login()
	{
		$this->load->view('login');
	}

	public function proses_login()
	{
		$code = 0;
		$msg = '';
		//ambil data dari form login
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		//validasi
		if ($username == '') {
			$msg .= 'Username harus diisi!';
		} else if ($password == '') {
			$msg .= 'Password harus diisi!';
		} else {
			//cek apakah username ada di db
			$user = $this->usermodel->get_data_by_username($username);
			if ($user) {
				//cek password benar
				if ($user->password == md5($password)) {
					//password benar
					if ($user->is_active == 'Active') {
						//user valid
						$data_session = array(
							'user_id' => $user->user_id,
							'username' => $user->username
						);

						//buat session
						$this->session->set_userdata($data_session);
						$code = 1;
						$msg .= 'Login berhasil';
					} else {
						$msg .= 'User tidak aktif!';
					}
				} else {
					$msg .= 'Password salah!';
				}
			} else {
				$msg .= 'Username tidak valid!';
			}
		}

		if ($code == 1) {
			redirect();
		} else {
			$this->session->set_flashdata('error_login', $msg);
			redirect('user/login');
		}
		//buat session & redirect
	}

	public function logout()
	{
		//destroy session
		$this->session->sess_destroy();
		redirect('user/login');
	}

	public function view($id = null)
	{
		// id yang akan di edit
		$user_id = (int) $id;
		// data level berdasarkan id
		$user = $this->usermodel->get_data($user_id);
		
		$this->load->view('template/header');
		$this->load->view('user/view', array('user' => $user));
		$this->load->view('template/footer');
	}
}
