<h3>Data User</h3>
<a href="<?php echo base_url() . 'user/add'?>" class="btn btn-success pull-right"> Tambah Data</a>
<table id="table-user" class="table table-sm table-hover">
	<thead>
		<tr>
			<th>No</th>
			<th>Foto</th>
			<th>Username</th>
			<th>Level</th>
			<th>Email</th>
			<th>Description</th>
			<th>Status</th>
			<th>Option</th>
		</tr>
	</thead>
	<tbody>
		<?php
		if ($users) {
			$no = 1;
			foreach ($users as $row) {
				echo '
					<tr>
						<td>'.$no.'</td>
						<td>
							<img style="height:50px" src="'.base_url('asset/images/'.$row->foto).'">
						</td>
						<td>'.$row->username.'</td>
						<td>'.$row->level_name.'</td>
						<td>'.$row->email.'</td>
						<td style="width:300px; overflow-x: hide;">'.$row->description.'</td>
						<td>'.$row->is_active.'</td>
						<td>
							<a href="'.base_url('user/view/' . $row->user_id).'" class="btn btn-sm btn-info"> View</a>
							<a href="'.base_url('user/edit/' . $row->user_id).'" class="btn btn-sm btn-warning"> Edit</a>
							<a onclick="return confirm(\'Yakin hapus data user '.$row->username.' ?!\');" href="'.base_url('user/delete/' . $row->user_id).'" class="btn btn-sm btn-danger"> Delete</a>
						</td>
					</tr>
				';

				$no++;
			}
		}
		?>
	</tbody>
</table>