<h3>Data Level <small>AJAX</small></h3>
<div id="loading-table-level" class="text-center" style="display: none;">
	<img src="<?php echo base_url('asset/images/ajax-loader.gif');?>">
</div>

<div class="row">
	<div class="col-md-6">
		<a href="#" data-toggle="modal" data-target="#modal-form-add-level" class="btn btn-success pull-right"> Tambah Data</a>
	</div>
	<div class="col-md-6 text-right">
		<a href="<?php echo base_url('ajaxlevel/report');?>" class="btn btn-info">Download PDF</a>
	</div>
</div>
<div class="clearfix mb-2"></div>

<table id="table-level-ajax" class="table table-sm table-hover">
	<thead>
		<tr>
			<th>Level Name</th>
			<th>Description</th>
			<th>Status</th>
			<th>Option</th>
		</tr>
	</thead>
	<tbody></tbody>

</table>

<!-- modal add -->
<div class="modal fade" id="modal-form-add-level" tabindex="-1" role="dialog" 
	aria-labelledby="formAddModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="formAddModalLabel">Tambah Data Level</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="form-add-level" method="POST">
					<div id="loading-add-level" class="text-center" style="display: none;">
						<img src="<?php echo base_url('asset/images/ajax-loader.gif');?>">
					</div>
					<div class="form-group">
						<label for="level-name">Level Name :</label>
						<input type="text" class="form-control" id="level-name" name="level-name" required="">
					</div>
					<div class="form-group">
						<label for="description">Description :</label>
						<textarea class="form-control" id="description" name="description"></textarea>
					</div>
					<div class="form-group">
						<label for="status">Status :</label>
						<input type="radio" name="status" value="Active" checked=""> Active 
						<input type="radio" name="status" value="Nonactive"> Nonactive
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" id="btn-save-add-level" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>

<!-- modal edit -->
<div class="modal fade" id="modal-form-edit-level" tabindex="-1" role="dialog" 
	aria-labelledby="formEditModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="formEditModalLabel">Edit Data Level</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="form-edit-level" method="POST">
					<div id="loading-edit-level" class="text-center" style="display: none;">
						<img src="<?php echo base_url('asset/images/ajax-loader.gif');?>">
					</div>
					<div class="form-group">
						<label for="level-name-edit">Level Name :</label>
						<input type="hidden" name="id-edit" id="id-edit" value="">
						<input type="text" class="form-control" id="level-name-edit" name="level-name-edit" required="">
					</div>
					<div class="form-group">
						<label for="description-edit">Description :</label>
						<textarea class="form-control" id="description-edit" name="description-edit"></textarea>
					</div>
					<div class="form-group">
						<label for="status-edit">Status :</label>
						<input type="radio" name="status-edit" id="status-edit-active" value="Active" checked=""> Active 
						<input type="radio" name="status-edit" id="status-edit-nonactive" value="Nonactive"> Nonactive
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" id="btn-save-edit-level" class="btn btn-primary">Update</button>
			</div>
		</div>
	</div>
</div>