<h4>Data Siswa</h4>
<table class="table table-sm table-hover">
	<tr>
		<th>No</th>
		<th>Nama</th>
		<th>Kelas</th>
		<th>Keterangan</th>
		<th>Opsi</th>
	</tr>
	<tr>
		<td>1</td>
		<td>Agus</td>
		<td>IPA</td>
		<td>Masuk</td>
		<td>
			<a href="#" class="btn btn-warning btn-sm"> View</a>
		</td>
	</tr>
</table>


<div style="background-color: lightblue; padding: 10px;">
	<?php

	if ($data_nilai) {
		echo $data_nilai;
	}
	?>
</div>