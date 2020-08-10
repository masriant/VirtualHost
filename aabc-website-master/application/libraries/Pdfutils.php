<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/third_party/mpdf/mpdf.php';

class PdfUtils extends mPDF {
    public function __construct() {
        parent::__construct();
    }
}