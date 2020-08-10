<script type="text/javascript">
	$(document).ready(function () {

		CKEDITOR.replace( 'description' );
		/* Update existing */
		for ( instance in CKEDITOR.instances ) {
	        CKEDITOR.instances[instance].updateElement();
	    }
	});

	
</script>