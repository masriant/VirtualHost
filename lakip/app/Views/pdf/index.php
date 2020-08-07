<?php
$mpdf = new \Mpdf\Mpdf();

$mpdf->useOddEven = true;

// Set header and footer arrays for section:Introduction
$intro_header_odd_array = array(...);
$intro_header_even_array = array(...);
$intro_footer_odd_array = array(...);
$intro_footer_even_array = array(...);

// Set header and footer arrays for section:Main
$main_header_odd_array = array(...);
$main_header_even_array = array(...);
$main_footer_odd_array = array(...);
$main_footer_even_array = array(...);

// Set the headers/footers for the Introduction
$mpdf->setHeader($intro_header_odd_array,'O');
$mpdf->setHeader($intro_header_even_array,'E');
$mpdf->setFooter($intro_footer_odd_array,'O');
$mpdf->setFooter($intro_footer_even_array,'E');

$mpdf->AddPage('', '', 1, '', 'on');    // suppress page numbering for the introduction
$mpdf->WriteHTML('Introduction of document...');

$mpdf->AddPage('','E');

$mpdf->setHeader($main_header_odd_array,'O');
$mpdf->setHeader($main_header_even_array,'E');

$mpdf->TOCpagebreak(
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    $toc-preHTML, $toc-postHTML, $toc-bookmarkText,
    1, 'A', 'off'); // sets numbering to start at A

$mpdf->setFooter($main_footer_odd_array,'O');
$mpdf->setFooter($main_footer_even_array,'E');

$mpdf->WriteHTML('Main part of document...');

// $mpdf->Output();