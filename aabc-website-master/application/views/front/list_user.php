<section id="home" class="wow fadeInUp">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 content">
				<h3>Data User</h3>
				<table id="table-user" class="table table-sm table-hover">
					<thead>
						<tr>
							<th>No</th>
							<th>Foto</th>
							<th>Username</th>
							<th>Level</th>
							<th>Email</th>
							<th>Description</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<?php
						if ($users) {
							$no = 1;
							foreach ($users as $row) {
								echo '
									<tr>
										<td>'.$no.'</td>
										<td>
											<img style="height:50px" src="'.base_url('asset/images/'.$row->foto).'">
										</td>
										<td>'.$row->username.'</td>
										<td>'.$row->level_name.'</td>
										<td>'.$row->email.'</td>
										<td style="width:300px; overflow-x: hide;">'.$row->description.'</td>
										<td>'.$row->is_active.'</td>
									</tr>
								';

								$no++;
							}
						}
						?>
					</tbody>
				</table>

			</div>
		</div>

	</div>
</section>