<script>
	$(document).ready(function() {
		//datatable via ajax
	    var table_level = $("#table-level-ajax").DataTable({
	    	"ajax": '<?php echo base_url('ajaxlevel/source_data');?>',
	    	"columns": [
	    		{"data": "level_name"},
	    		{"data": "description"},
	    		{"data": "is_active"},
	    		{"data": "option"},
	    	],
		    dom: 'Bfrtip',
	        buttons: [
	            'copy', 'csv', 'excel', 'pdf', 'print'
	        ],
	    	"fnDrawCallback": function (oSettings) {
	    		//tambahkan event di isi datatable
	    		//ketika tombol edit di klik
	    		$("#table-level-ajax .btn-edit").on("click",function() {
	    			edit_data($(this).attr('href').substring(1));
	    			$("#modal-form-edit-level").modal('show');
                });

	    		//ketika tombol delete di klik
                $("#table-level-ajax .btn-delete").on("click",function() {
                	if (confirm('Yakin hapus data?!')) {
                		delete_data($(this).attr('href').substring(1));
                	}	    			
	    		});
	    	}
	    });

	    //saat klik simpan
	    $("#btn-save-add-level").on("click", function () {
	    	//show loading & disable button
	    	$("#loading-add-level").show();
	    	//ajax kirim ke server
	    	$.ajax({
	    		url: "<?php echo base_url('ajaxlevel/simpan');?>",
	    		data: $("#form-add-level").serialize(),
	    		dataType: 'json',
	    		type: 'POST',
	    		success: function(result){
	    			//hide loding
	    			$("#loading-add-level").hide();
	    			//check berhasil / tidak
	    			if (result.code == 1) {
	    				//modal close atau redirect
	    				//alert('Simpan data berhasil');
	    				//clear input
	    				$("#level-name, #description").val('');
	    				//hide modal
	    				$("#modal-form-add-level").modal('hide');
	    				//refresh datatable (belum dibahas), sementara reload aja
	    				//window.location = '<?php echo base_url('ajaxlevel');?>';
	    				refresh_table_level();
	    			} else {
	    				alert(result.msg);
	    			}
					
				},
				error: function () {
					$("#loading-add-level").hide();
					alert('Respon server error!');
				}
			});
	    	//jika berhasil / gagal maka ...
	    	return false;
	    });

	    function edit_data(id_level) {
	    	$("#loading-edit-level").show();
	    	$.ajax({
	    		url: "<?php echo base_url('ajaxlevel/get_data/');?>",
	    		data: 'id='+id_level,
	    		dataType: 'json',
	    		type: 'POST',
	    		success: function(result){
	    			//hide loding
	    			$("#loading-edit-level").hide();
	    			//check berhasil / tidak
	    			if (result.code == 1) {
	    				$("#id-edit").val(result.object.level_id);
	    				$("#level-name-edit").val(result.object.level_name);
	    				$("#description-edit").val(result.object.description);
	    				//via val tidak bisa?
	    				//$("input[name='status-edit']").val(result.object.is_active);
	    				//via prop aja
	    				$("#status-edit-active").prop("checked", (result.object.is_active == 'Active') ? true : false);
	    				$("#status-edit-nonactive").prop("checked", (result.object.is_active == 'Nonactive') ? true : false);
	    			} else {
	    				alert('Tidak bisa menampilkan data!');
	    			}
					
				},
				error: function () {
					$("#loading-add-level").hide();
					alert('Respon server error!');
				}
			});
	    }

	    //saat klik simpan
	    $("#btn-save-edit-level").on("click", function () {
	    	//show loading & disable button
	    	$("#loading-edit-level").show();
	    	//ajax kirim ke server
	    	$.ajax({
	    		url: "<?php echo base_url('ajaxlevel/update');?>",
	    		data: $("#form-edit-level").serialize(),
	    		dataType: 'json',
	    		type: 'POST',
	    		success: function(result){
	    			//hide loding
	    			$("#loading-edit-level").hide();
	    			//check berhasil / tidak
	    			if (result.code == 1) {
	    				//modal close atau redirect
	    				//alert('Simpan data berhasil');
	    				//clear input
	    				$("#level-name, #description").val('');
	    				//hide modal
	    				$("#modal-form-edit-level").modal('hide');
	    				//refresh table via ajax
	    				refresh_table_level();
	    			} else {
	    				alert(result.msg);
	    			}
					
				},
				error: function () {
					$("#loading-edit-level").hide();
					alert('Respon server error!');
				}
			});
	    	//jika berhasil / gagal maka ...
	    	return false;
	    });

	    function refresh_table_level() {
	    	table_level.ajax.url('<?php echo base_url('ajaxlevel/source_data');?>').load();
	    }

	    function delete_data(id_level) {
	    	$("#loading-table-level").show();
	    	$.ajax({
	    		url: "<?php echo base_url('ajaxlevel/delete_data/');?>",
	    		data: 'id='+id_level,
	    		dataType: 'json',
	    		type: 'POST',
	    		success: function(result){
	    			//hide loding
	    			$("#loading-table-level").hide();
	    			//check berhasil / tidak
	    			if (result.code == 1) {
	    				refresh_table_level()
	    			} else {
	    				alert('Tidak bisa delete data!');
	    			}
					
				},
				error: function () {
					$("#loading-table-level").hide();
					alert('Respon server error!');
				}
			});
	    }

	});
</script>