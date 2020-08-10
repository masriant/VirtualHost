<!DOCTYPE html>
<html>
<head>
	<title>Report Level</title>
	<!-- css bootstrap -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() . 'asset/bootstrap/dist/css/bootstrap.min.css';?>">
</head>
<body>
	<h3 align="center">Data Level</h3>

	<table class="table table-sm table-stripped">
		<thead>
			<tr>
				<th>No</th>
				<th>Level Name</th>
				<th>Description</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<?php
			if ($data_level) {
				$no = 1;
				foreach ($data_level as $row) {
					echo '
						<tr>
							<td>'.$no.'</td>
							<td>'.$row->level_name.'</td>
							<td>'.$row->description.'</td>
							<td>'.$row->is_active.'</td>
						</tr>
					';
					$no++;
				}
			}
			?>
		</tbody>
	</table>
	<br>
	<br>
	<hr>
	<table width="100%">
		<tr>
			<td align="center">Dibuat</td>
			<td align="center">Disetujui</td>
		</tr>
		<tr>
			<td height="100">
				
			</td>
			<td>
				
			</td>
		</tr>
		<tr>
			<td align="center">Admin</td>
			<td align="center">Agus</td>
		</tr>
	</table>
</body>
</html>