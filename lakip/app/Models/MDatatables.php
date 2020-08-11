<?php

namespace App\Models;

use CodeIgniter\Model;

class MDatatables extends Model
{

	var $column_order = array('Id', 'NamaTeman', 'Alamat', 'JenisKelamin');
	var $order = array('Id' => 'asc');

	function get_datatables()
	{

		// search
		if ($_POST['search']['value']) {
			$search = $_POST['search']['value'];
			$kondisi_search = "NamaTeman LIKE '%$search%' OR Alamat LIKE '%$search%' OR JenisKelamin LIKE '%$search%'";
		} else {
			$kondisi_search = "Id != ''";
		}

		// order
		if ($_POST['order']) {
			$result_order = $this->column_order[$_POST['order']['0']['column']];
			$result_dir = $_POST['order']['0']['dir'];
		} else if ($this->order) {
			$order = $this->order;
			$result_order = key($order);
			$result_dir = $order[key($order)];
		}


		if ($_POST['length'] != -1);
		$db = db_connect();
		$builder = $db->table('tb_teman');
		$query = $builder->select('*')
			->where($kondisi_search)
			->orderBy($result_order, $result_dir)
			->limit($_POST['length'], $_POST['start'])
			->get();
		return $query->getResult();
	}

	function jumlah_semua()
	{
		$sQuery = "SELECT COUNT(Id) as jml FROM tb_teman";
		$db = db_connect();
		$query = $db->query($sQuery)->getRow();
		return $query;
	}

	function jumlah_filter()
	{
		// kondisi_search
		if ($_POST['search']['value']) {
			$search = $_POST['search']['value'];
			$kondisi_search = " AND (NamaTeman LIKE '%$search%' OR Alamat LIKE '%$search%' OR JenisKelamin LIKE '%$search%')";
		} else {
			$kondisi_search = "";
		}

		$sQuery = "SELECT COUNT(Id) as jml FROM tb_teman WHERE Id != '' $kondisi_search";
		$db = db_connect();
		$query = $db->query($sQuery)->getRow();
		return $query;
	}
}