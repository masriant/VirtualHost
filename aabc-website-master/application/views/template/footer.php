
<!-- footer -->
		<p class="footer">
			<br>
			<hr>
			<div class="text-center text-muted">
				&copy; 2020 AABC Team - All rights reserverd.
			</div>
		</p>
	</div>		

	<!-- jquery -->
	<script type="text/javascript" src="<?php echo base_url().'asset/js/jquery-3.5.0.min.js'?>"></script>
	<!-- popper -->
	<script type="text/javascript" src="<?php echo base_url().'asset/js/popper.min.js'?>"></script>
	<!-- bootstrap -->
	<script type="text/javascript" src="<?php echo base_url().'asset/bootstrap/dist/js/bootstrap.min.js'?>"></script>
	<!-- datatables js -->
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/js/jquery.dataTables.min.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/js/dataTables.bootstrap4.min.js';?>"></script>
	<!-- button -->
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/Buttons-1.6.1/js/dataTables.buttons.min.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/Buttons-1.6.1/js/buttons.flash.min.js';?>"></script>

	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/JSZip-2.5.0/jszip.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/pdfmake-0.1.36/pdfmake.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/pdfmake-0.1.36/vfs_fonts.js';?>"></script>

	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/Buttons-1.6.1/js/buttons.html5.min.js';?>"></script>
	<script type="text/javascript" src="<?php echo base_url().'asset/DataTables/plugin/Buttons-1.6.1/js/buttons.print.min.js';?>"></script>

	<!-- CKEditor -->
	<script type="text/javascript" src="<?php echo base_url().'asset/ckeditor/ckeditor.js';?>"></script>
	<?php
	/*dynamic js from controller*/
	if (isset($extra_js)) {
		echo $extra_js;
	}

	?>
</body>
</html>