<?= $this->extend('layout/template'); ?>
<?= $this->section('content'); ?>
<!-- Main content -->
<!-- <section class="content"> -->
<div class="container">
  <div class="row">
    <div class="col-6">
      <form>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Cari..." name="keyword" autofocus>
          <button class="btn btn-outline-secondary" type="submit" name="submit">Cari</button>
        </div>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <div class="table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <caption>List of users</caption>
        <table class="table table-bordered table-hover caption-top">
          <thead class="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Masrianto</td>
              <td>JakartaJakartaJakartaJakartaJakartaJakartaJakarta</td>
              <td>
                <a href="" class="btn btn-sm btn-success"><i class="fa fa-id-card" aria-hidden="true"></i>
                  Detail</a>
                <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit" aria-hidden="true"></i>Edit</a>
                <a href="" class="btn btn-sm btn-warning"><i class="far fa-trash-alt" aria-hidden="true"></i>Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>







</div>
<!-- </section> -->
<?= $this->endSection(); ?>