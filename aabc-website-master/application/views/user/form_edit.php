<h3>Edit Data User</h3>
<?php

if (! $user) {
	echo 'Invalid Data User!';
	exit();
}
?>
<form action="<?php echo base_url() . 'user/update_data'?>" method="POST">
	<div class="form-group">
		<!-- id yang mau di update -->
		<input type="hidden" name="id" value="<?php echo $user->user_id;?>">
		<label for="username">Username :</label>
		<input type="text" class="form-control" id="username" name="username" value="<?php echo $user->username;?>">
	</div>
	<div class="form-group">
		<label for="email">Email :</label>
		<input type="email" class="form-control" id="email" name="email" value="<?php echo $user->email;?>">
	</div>
	<div class="form-group">
		<label for="password">Password :</label>
		<input type="password" class="form-control" id="password" name="password" value="" autocomplete="false">
	</div>
	<div class="form-group">
		<label for="level_id">Level :</label>
		<select class="form-control" id="level_id" name="level_id">
			<option value=""></option>
			<?php
			if ($levels) {
				foreach ($levels as $level) {
					if ($user->level_id == $level->level_id) {
						echo '<option value="'.$level->level_id.'" selected="">'.$level->level_name.'</option>';
					} else {
						echo '<option value="'.$level->level_id.'">'.$level->level_name.'</option>';
					}
					
				}
			}

			?>
		</select>
	</div>
	<div class="form-group">
		<label for="description">Description :</label>
		<textarea class="form-control" id="description" name="description"><?php echo $user->description;?></textarea>
	</div>
	<div class="form-group">
		<label for="status">Status :</label>
		<input type="radio" name="status" value="Active" <?php echo ($user->is_active == 'Active') ? 'checked=""': '';?>> Active 
		<input type="radio" name="status" value="Nonactive" <?php echo ($user->is_active == 'Nonactive') ? 'checked=""': '';?>> Nonactive
	</div>
	<div>
		<input type="submit" id="btn-id-update-user" name="Update" value="Update" class="btn btn-primary">
	</div>
</form>