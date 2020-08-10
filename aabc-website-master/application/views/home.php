<?php
if ($this->session->userdata('username')) {
	echo '
		<div class="alert alert-success">
			Hi, '.$this->session->userdata('username').'
		</div>
	';
}
?>