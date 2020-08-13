<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<!-- <section class="content"> -->
<div class="container">
  <div class="row">
    <div class="col-6">
      <form action="" method="POST">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Cari data..." id="keyword" name="keyword" autofocus>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" name="submit">Cari</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <caption>List of All users <a href="<?= base_url(); ?>/lakip/cari"> Cari</a> </caption>
        <?php if (session()->getFlashdata('pesan')) : ?>
        <div class="alert alert-success" role="alert">
          <?= session()->getFlashdata('pesan'); ?>
        </div>
        <?php endif; ?>
        <table class="table table-bordered table-hover caption-top">
          <thead class="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Kode</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <!-- <tbody> -->
          <tbody id="myTable">
            <?php $i = 1 + (10 * ($currentPage - 1)); ?>
            <?php foreach ($lakip as $k) : ?>
            <tr>
              <td><?= $i++; ?></td>
              <td><?= $k['nama']; ?></td>
              <td><?= $k['alamat']; ?></td>
              <td><?= $k['kodeqr']; ?></td>
              <td>
                <a href="<?= base_url(); ?>/lakip/<?= $k['id']; ?>" class="btn btn-sm btn-success"><i
                    class="fa fa-id-card" aria-hidden="true"></i>Detail</a>
                <a href="<?= base_url(); ?>/lakip/edit/<?= $k['id']; ?>" class="btn btn-sm btn-primary"><i
                    class="fas fa-edit" aria-hidden="true"></i>Edit</a>
                <a href="" class="btn btn-sm btn-warning"><i class="far fa-trash-alt" aria-hidden="true"></i>Hapus</a>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
        <?= $pager->links('id', 'lakip_pagination'); ?>
      </div>
    </div>
  </div>







</div>
<!-- </section> -->
<?= $this->endSection(); ?>