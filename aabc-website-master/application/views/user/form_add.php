<h3>Tambah Data User</h3>
<?php
	//jika ada error, tampilkan
	$error = $this->session->flashdata('error_input_user');
  	if ($error) {
  		echo '
  		<div class="text-danger error pt-3 pb-3">'.$error.'</div>
  		';
  	}

?>
<form action="<?php echo base_url() . 'user/simpan_data'?>" enctype="multipart/form-data" method="POST">
	<div class="form-group">
		<label for="username">Username :</label>
		<input type="text" class="form-control" id="username" name="username">
	</div>
	<div class="form-group">
		<label for="email">Email :</label>
		<input type="email" class="form-control" id="email" name="email">
	</div>
	<div class="form-group">
		<label for="password">Password :</label>
		<input type="password" class="form-control" id="password" name="password">
	</div>
	<div class="form-group">
		<label for="level_id">Level :</label>
		<select class="form-control" id="level_id" name="level_id">
			<option value=""></option>
			<?php
			if ($levels) {
				foreach ($levels as $level) {
					echo '<option value="'.$level->level_id.'">'.$level->level_name.'</option>';
				}
			}

			?>
		</select>
	</div>

	<div class="form-group">
		<label for="description">Description :</label>
		<textarea class="form-control" id="description" name="description"></textarea>
	</div>
	<div class="form-group">
		<label for="status">Status :</label>
		<input type="radio" name="status" value="Active"> Active 
		<input type="radio" name="status" value="Nonactive"> Nonactive
	</div>
	<div class="form-group">
		<label for="foto">Foto :</label>
		<input type="file" class="form-control" id="foto" name="foto">
	</div>
	<div>
		<input type="submit" name="Simpan" value="Simpan" class="btn btn-primary">
	</div>
</form>