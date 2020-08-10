<!DOCTYPE html>
<html>
<head>
	<title>Welcome To AABC Website</title>
	<style type="text/css">
		h2{
			text-align: center;
			color: red;
			padding: 10px 50px;
			border: 1px solid red;
		}
	</style>
	<!-- css bootstrap -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() . 'asset/bootstrap/dist/css/bootstrap.min.css';?>">
	<!-- css datatables -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() . 'asset/DataTables/css/jquery.dataTables.min.css';?>">
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() . 'asset/DataTables/css/dataTables.bootstrap4.min.css';?>">
	<!-- button -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() . 'asset/DataTables/plugin/Buttons-1.6.1/css/buttons.bootstrap4.min.css';?>">
</head>
<body>
	<div class="container">
		<h2 class="mt-5">Welcome to AABC Website</h2>
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="#">AABC Web</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item active">
						<a class="nav-link" href="<?php echo base_url();?>">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="<?php echo base_url('level');?>">Data Level</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="<?php echo base_url('ajaxlevel');?>">Data Level <small>Ajax</small></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="<?php echo base_url('user');?>">Data User</a>
					</li>
					<?php
					if ($this->session->userdata('username')) {
						echo '
							<li class="nav-item">
								<a class="nav-link" href="'.base_url('user/logout').'"> Logout</a>
							</li>
						';
					} else {
						echo '
							<li class="nav-item">
								<a class="nav-link" href="'.base_url('user/login').'"> Login</a>
							</li>
						';
					};?>
				</ul>
			</div>
		</nav>
		<br>
		<br>
		<!-- end Header -->

