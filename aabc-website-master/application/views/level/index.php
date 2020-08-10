<h3>Data Level</h3>
<a href="<?php echo base_url() . 'level/add/'?>" class="btn btn-success pull-right"> Tambah Data</a>
<table id="table-level" class="table table-sm table-hover">
	<thead>
		<tr>
			<th>No</th>
			<th>Level Name</th>
			<th>Description</th>
			<th>Status</th>
			<th>Option</th>
		</tr>
	</thead>
	<tbody>
		<?php
		if ($levels) {
			$no = 1;
			foreach ($levels as $row) {
				echo '
					<tr>
						<td>'.$no.'</td>
						<td>'.$row->level_name.'</td>
						<td>'.$row->description.'</td>
						<td>'.$row->is_active.'</td>
						<td>
							<a href="'.base_url('level/edit/' . $row->level_id).'" class="btn btn-sm btn-warning"> Edit</a>
							<a onclick="return confirm(\'Yakin hapus data level '.$row->level_name.' ?!\');" href="'.base_url('level/delete/' . $row->level_id).'" class="btn btn-sm btn-danger"> Delete</a>
						</td>
					</tr>
				';

				$no++;
			}
		}
		?>
	</tbody>
		
</table>