<?php 
if (!isset($user)) {
	echo 'Invalid data!';
	exit();
}
 ?>
<h3>Detail Data User : <?php echo $user->username;?></h3>

<div>
	Email:
	<br>
	<?php echo $user->email;?>
	<br>
	Foto:
	<br>
	<img style="height:50px" src="<?php echo base_url('asset/images/' . $user->foto);?>">
	<br>
	Description:
	<br>
	<?php echo $user->description;?>
</div>
<div class="clearfix"></div>
<a href="<?php echo base_url('user');?>" class="btn btn-success pull-right"> Kembali</a>
