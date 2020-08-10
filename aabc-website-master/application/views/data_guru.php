<h4>Data Guru</h4>
<table border="1" width="80%">
	<tr>
		<th>No</th>
		<th>Nama Guru</th>
		<th>Keterangan</th>
	</tr>
	<?php
	if (isset($data_guru)) {
		$no = 1;
		foreach ($data_guru as $row) {
			echo '<tr>
					<td>'.$no.'</td>
					<td>'.$row['nama'].'</td>
					<td>'.$row['ket'].'</td>
				</tr>
			';
			//increment
			$no++;
		}
	}
	?>
</table>