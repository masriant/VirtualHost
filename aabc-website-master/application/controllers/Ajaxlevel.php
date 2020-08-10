<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ajaxlevel extends CI_Controller {

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
		$extra_js = $this->load->view('ajaxlevel/extra_js', NULL, TRUE);
		$data_level = null; //karena via ajax
		// $this->levelmodel->read_data();
		$this->load->view('template/header');
		$this->load->view('ajaxlevel/index', array('levels' => $data_level));
		$this->load->view('template/footer', array('extra_js' => $extra_js));
	}

	public function simpan()
	{
		$code = 0;
		$msg = '';
		//validasi
		// setting rule validasi
		$this->form_validation->set_rules('level-name', 'Level Name', 'required');
		$this->form_validation->set_rules('description', 'Description', 'required');
		//cek validasi
		if ($this->form_validation->run() == FALSE) {
			//jika tidak valid
			$msg = validation_errors();
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
				$code = 1;
			} else {
				$msg = 'Simpan data tidak berhasil! Cek data tersebut.';
			}
		}

		//output dalam bentuk json
		echo json_encode(array(
			'code' => $code,
			'msg' => $msg
		));
	}

	/* data level dalam bentuk json u/ datatable*/
	public function source_data()
	{
		$data = array();

		//data level
		$data_level = $this->levelmodel->read_data();
		if ($data_level) {
			foreach ($data_level as $row) {
				$data[] = array(
					'level_id' => $row->level_id,
					'level_name' => $row->level_name,
					'description' => $row->description,
					'is_active' => $row->is_active,
					'option' => '
						<a href="#'.$row->level_id.'" class="btn-edit btn btn-sm btn-warning"> Edit</a>
						<a href="#'.$row->level_id.'" class="btn-delete btn btn-sm btn-danger"> Delete</a>
					'
				);
			}
		}
		//output json
		echo json_encode(array('data' => $data));
	}

	public function get_data()
	{
		$code = 0;
		$level_id = $this->input->post('id');
		// data level berdasarkan id
		$level = $this->levelmodel->get_data($level_id);
		if ($level) {
			$code = 1;
		}

		//output dlm bentuk json
		echo json_encode(array('code' => $code, 'object' => $level));
	}

	public function update()
	{
		$code = 0;
		$msg = '';
		//validasi
		// setting rule validasi
		$this->form_validation->set_rules('id-edit', 'ID', 'required');
		$this->form_validation->set_rules('level-name-edit', 'Level Name', 'required');
		$this->form_validation->set_rules('description-edit', 'Description', 'required');
		//cek validasi
		if ($this->form_validation->run() == FALSE) {
			//jika tidak valid
			$msg = validation_errors();
		} else {
			//prepare data (mapping data) \
			$data = array(
				'level_name' => $this->input->post('level-name-edit'),
				'description' => $this->input->post('description-edit'),
				'is_active' => $this->input->post('status-edit')
			);
			//proses update
			$update = $this->levelmodel->update_data($this->input->post('id-edit'), $data);
			//cek berhasil atau tidak
			if ($update) {
				$code = 1;
			} else {
				$msg = 'Update data tidak berhasil! Cek data tersebut.';
			}
		}

		//output dalam bentuk json
		echo json_encode(array(
			'code' => $code,
			'msg' => $msg
		));
	}

	public function delete_data()
	{
		$code = 0;
		$level_id = $this->input->post('id');
		// data level berdasarkan id
		$delete = $this->levelmodel->delete_data($level_id);
		if ($delete) {
			$code = 1;
		}

		//output dlm bentuk json
		echo json_encode(array('code' => $code));
	}

	public function report()
	{
		//load library pdf
		$this->load->library('pdfutils');
		$data['data_level'] = $this->levelmodel->read_data();
		$report = $this->load->view('ajaxlevel/report_level', $data, TRUE);

		//buat pdf
		$mpdf = new mPDF();
		//jika ada css tambahan
		//$this->stylesheet = file_get_contents('css/style.css');
	    $mpdf->AddPage('P', // L - landscape, P - portrait
	            '', '', '', '',
	            5, // margin_left
	            5, // margin right
	            5, // margin top
	            5, // margin bottom
	            4, // margin header
	            4); // margin footer
		$mpdf->WriteHTML($report);
		/*save direct download*/
		$mpdf->Output('report_level_' . date("Y-m-d-His") . '.pdf' , 'I');

	}
}
