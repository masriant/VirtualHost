<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href="index.php" class="brand-link">
    <img src="<?= base_url(); ?>/template/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
      class="brand-image img-circle elevation-3" style="opacity: .8">
    <span class="brand-text font-weight-light">Admin LAKIP</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="<?= base_url(); ?>/template/dist/img/user2-160x160.jpg" class="img-circle elevation-2"
          alt="User Image">
      </div>
      <div class="info">
        <a href="#" class="d-block">Masrianto</a>
      </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
        <li class="nav-item has-treeview menu-open">
          <a href="#" class="nav-link active">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
              Dashboard
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="<?= base_url(); ?>" class="nav-link active">
                <i class="far fa-circle nav-icon"></i>
                <p>Bootstrap v5</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="<?= base_url(); ?>/lakip" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>AdminLTE v4</p>
              </a>
            </li>

          </ul>
        </li>
        <li class="nav-item">
          <a href="<?= base_url(); ?>/datatables" class="nav-link">
            <i class="nav-icon fas fa-th"></i>
            <p>
              Datatables
              <span class="right badge badge-danger">New</span>
            </p>
          </a>
        </li>

        <li class="nav-item has-treeview">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-chart-pie"></i>
            <p>
              Lakip Detail
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="<?= base_url(); ?>/lakip" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Index</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="<?= base_url(); ?>/lakip/create" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Tambah</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="<?= base_url(); ?>/lakip/cari" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Cari</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="<?= base_url(); ?>/lakip/spreadsheet" target="_blank" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Eksport Spreadsheet</p>
              </a>
            </li>
        </li>
        <li class="nav-item">
          <a href="<?= base_url(); ?>/lakip/pdf" target="_blank" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Eksport PDF</p>
          </a>
        </li>
        </li>
        <li class="nav-item">
          <a href="<?= base_url(); ?>/lakip/xlsx" target="_blank" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Eksport XLSX</p>
          </a>
        </li>
        </li>
        <li class="nav-item">
          <a href="<?= base_url(); ?>/lakip/conversi" target="_blank" class="nav-link">
            <i class="far fa-circle nav-icon"></i>
            <p>Eksport</p>
          </a>
        </li>
      </ul>
      </li>
      <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-chart-pie"></i>
          <p>
            Menu Detail
            <i class="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul class="nav nav-treeview">
          <li class="nav-item">
            <a href="<?= base_url(); ?>/data" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Data</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="<?= base_url(); ?>/pdf" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>PDF</p>
            </a>
          </li>

      </li>
      <li class="nav-item">
        <a href="<?= base_url(); ?>/convert/spreadsheet" class="nav-link">
          <i class="far fa-circle nav-icon"></i>
          <p>Spreadsheet</p>
        </a>
      </li>
      </li>
      <li class="nav-item">
        <a href="<?= base_url(); ?>/post" class="nav-link">
          <i class="far fa-circle nav-icon"></i>
          <p>Post</p>
        </a>
      </li>
      </li>
      <li class="nav-item">
        <a href="<?= base_url(); ?>/students" class="nav-link">
          <i class="far fa-circle nav-icon"></i>
          <p>Students</p>
        </a>
      </li>
      <li class="nav-item">
        <a href="<?= base_url(); ?>/convert/sheet" class="nav-link">
          <i class="far fa-circle nav-icon"></i>
          <p>Xlsx</p>
        </a>
      </li>
      <li class="nav-item">
        <a href="<?= base_url(); ?>/data/kwitansi" class="nav-link">
          <i class="far fa-circle nav-icon"></i>
          <p>Kwitansi</p>
        </a>
      </li>
      </ul>
      </li>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>