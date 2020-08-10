<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Level extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		//harus login
		if (! $this->session->userdata('username')) {
			redirect('user/login');
		}

		$this->load->model('levelmodel');
		$this->load->library('form_validation');
	}

	public function index()
	{
		$extra_js = '
			<script>
				$(document).ready(function() {
				    $("#table-level").DataTable();
				});
			</script>
		';
		$data_level = $this->levelmodel->read_data();
		$this->load->view('template/header');
		$this->load->view('level/index', array('levels' => $data_level));
		$this->load->view('template/footer', array('extra_js' => $extra_js));
	}

	public function add()
	{
		$this->load->view('template/header');
		$this->load->view('level/form_add');
		$this->load->view('template/footer');
	}

	public function simpan_data()
	{
		$msg = '';
		//validasi
		// setting rule validasi
		$this->form_validation->set_rules('level-name', 'Level Name', 'required|alpha');
		$this->form_validation->set_rules('description', 'Description', 'required|min_length[5]');
		//cek validasi
		if ($this->form_validation->run() == FALSE) {
			//jika tidak valid
			$msg = validation_errors();
			$this->session->set_flashdata('error_input_level', $msg);
			redirect('level/add');
		} else {
			//prepare data (mapping data) \
			$data = array(
				'level_name' => $this->input->post('level-name'),
				'description' => $this->input->post('description'),
				'is_active' => $this->input->post('status')
			);
			//proses simpan
			$simpan = $this->levelmodel->create_data($data);
			//cek berhasil atau tidak
			if ($simpan) {
				$this->index();
			} else {
				$this->add();
			}
		}
			
	}

	public function edit($id = null)
	{
		// id yang akan di edit
		$level_id = (int) $id;
		// data level berdasarkan id
		$level = $this->levelmodel->get_data($level_id);
		// proses update
		$this->load->view('template/header');
		$this->load->view('level/form_edit', array('level' => $level));
		$this->load->view('template/footer');
	}

	public function update_data()
	{
		$msg = '';
		//validasi
		// setting rule validasi
		$this->form_validation->set_rules('level-name', 'Level Name', 'required|alpha');
		$this->form_validation->set_rules('description', 'Description', 'required|min_length[5]');
		//cek validasi
		if ($this->form_validation->run() == FALSE) {
			//jika tidak valid
			$msg = validation_errors();
			$this->session->set_flashdata('error_input_level', $msg);
			redirect('level/edit/' . $this->input->post('id'));
			exit();
		}

		//prepare data (mapping data) \
		$data = array(
			'level_name' => $this->input->post('level-name'),
			'description' => $this->input->post('description'),
			'is_active' => $this->input->post('status')
		);
		//proses simpan
		$update = $this->levelmodel->update_data($this->input->post('id'), $data);
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
		$level_id = (int) $id;
		// delete data level berdasarkan id
		$hapus = $this->levelmodel->delete_data($level_id);
		// cek
		$this->index();
	}
}
