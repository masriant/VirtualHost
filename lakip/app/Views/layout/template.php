<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?= $title; ?></title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/template/plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="/template/dist/css/adminlte.min.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <!-- My CSS  -->
  <link rel="stylesheet" href="/template/main/style.css">

</head>

<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">

  <?= $this->include('layout/sidebar_right'); ?>
  <?= $this->include('layout/main_sidebar'); ?>
  <?= $this->include('layout/sidebar_left'); ?>
  <?= $this->include('layout/content_wrapper'); ?>
  <?= $this->renderSection('content'); ?>

  </div>
  <!-- /.content-wrapper -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2018-<?= date('Y'); ?> <a href="http://lakip.co.id">Lakip.co.id</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.0.5
    </div>
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
  </div>
  <!-- ./wrapper -->

  <!-- jQuery -->
  <script src="/template/plugins/jquery/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="/template/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- AdminLTE App -->
  <script src="/template/dist/js/adminlte.min.js"></script>
  <!-- AdminLTE for demo purposes -->
  <script src="/template/dist/js/demo.js"></script>