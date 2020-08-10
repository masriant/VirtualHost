<h3>Edit Data Level</h3>
<?php

	if (! $level) {
		echo 'Invalid Data Level!';
		exit();
	}

	//jika ada error, tampilkan
	$error = $this->session->flashdata('error_input_level');
  	if ($error) {
  		echo '
  		<div class="text-danger error pt-3 pb-3">'.$error.'</div>
  		';
  	}
?>
<form action="<?php echo base_url() . 'level/update_data'?>" method="POST">
	<div class="form-group">
		<!-- id yang mau di update -->
		<input type="hidden" name="id" value="<?php echo $level->level_id;?>">
		<label for="level-name">Level Name :</label>
		<input type="text" class="form-control" id="level-name" name="level-name" value="<?php echo $level->level_name;?>" required="">
	</div>
	<div class="form-group">
		<label for="description">Description :</label>
		<textarea class="form-control" id="description" name="description"><?php echo $level->description;?></textarea>
	</div>
	<div class="form-group">
		<label for="status">Status :</label>
		<input type="radio" name="status" value="Active" <?php echo ($level->is_active == 'Active') ? 'checked=""': '';?>> Active 
		<input type="radio" name="status" value="Nonactive" <?php echo ($level->is_active == 'Nonactive') ? 'checked=""': '';?>> Nonactive
	</div>
	<div>
		<input type="submit" name="Update" value="Update" class="btn btn-primary">
	</div>
</form>