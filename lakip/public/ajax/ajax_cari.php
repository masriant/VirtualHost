<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>


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
  <tbody>
    <?php $i = 1; ?>
    <?php foreach ($lakip as $k) : ?>
    <tr>
      <td><?= $i++; ?></td>
      <td><?= $k['nama']; ?></td>
      <td><?= $k['alamat']; ?></td>
      <td><?= $k['kodeqr']; ?></td>
      <td>
        <a href="" class="btn btn-sm btn-success"><i class="fa fa-id-card" aria-hidden="true"></i>
          Detail</a>
        <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit" aria-hidden="true"></i>Edit</a>
      </td>
    </tr>
    <?php endforeach; ?>
  </tbody>
</table>

</div>
<!-- </section> -->
<?= $this->endSection(); ?>