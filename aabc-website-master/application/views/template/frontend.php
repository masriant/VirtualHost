<?php
/* Available Var in themplate */
$title = (isset($title)) ? $title : '';
$description = (isset($description)) ? $description : '';
$keyword = (isset($keyword)) ? $keyword : '';
$intro = (isset($intro)) ? $intro : '';
$content = (isset($content)) ? $content : '';

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title><?php echo $title;?></title>
  <meta content="<?php echo $description;?>" name="description">
  <meta content="<?php echo $keyword;?>" name="keywords">

  <!-- Favicons -->
  <link href="<?php echo base_url('asset/Reveal/');?>assets/img/favicon.png" rel="icon">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800|Montserrat:300,400,700" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/ionicons/css/ionicons.min.css" rel="stylesheet">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/animate.css/animate.min.css" rel="stylesheet">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/venobox/venobox.css" rel="stylesheet">
  <link href="<?php echo base_url('asset/Reveal/');?>assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="<?php echo base_url('asset/Reveal/');?>assets/css/style.css" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Reveal - v2.0.0
  * Template URL: https://bootstrapmade.com/reveal-bootstrap-corporate-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Top Bar ======= -->
  <section id="topbar" class="d-none d-lg-block">
    <div class="container clearfix">
      <div class="contact-info float-left">
        <i class="fa fa-envelope-o"></i> 
        <a href="mailto:<?php echo $this->config->item('email');?>">
        	<?php echo $this->config->item('email');?>
        </a>
        <i class="fa fa-phone"></i> <?php echo $this->config->item('phone');?>
      </div>
      <div class="social-links float-right">
        <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
        <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
        <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
        <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
        <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
      </div>
    </div>
  </section><!-- End Top Bar-->

  <!-- ======= Header ======= -->
  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        <h1>
        	<a href="#topbar" class="scrollto">
        		<?php echo $this->config->item('app_name');?>
        	</a>
        </h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="#topbar"><img src="<?php echo base_url('asset/Reveal/');?>assets/img/logo.png" alt=""></a>-->
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><a href="<?php echo base_url('front');?>">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="<?php echo base_url('front/list_user');?>">Our Team</a></li>
          <li class="menu-has-children"><a href="">Drop Down</a>
            <ul>
              <li><a href="#">Drop Down 1</a></li>
              <li><a href="#">Drop Down 3</a></li>
              <li><a href="#">Drop Down 4</a></li>
              <li><a href="#">Drop Down 5</a></li>
            </ul>
          </li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="<?php echo base_url('user/login');?>">Login</a></li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- End Header -->

  <!-- ======= Intro Section ======= -->
  <?php echo $intro;?>

  <main id="main">

    <?php echo $content;?>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Reveal</strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!--
        All the links in the footer should remain intact.
        You can delete the links only if you purchased the pro version.
        Licensing information: https://bootstrapmade.com/license/
        Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Reveal
      -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>

  <!-- Vendor JS Files -->
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/jquery/jquery.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/php-email-form/validate.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/wow/wow.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/venobox/venobox.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/owl.carousel/owl.carousel.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/jquery-sticky/jquery.sticky.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/superfish/superfish.min.js"></script>
  <script src="<?php echo base_url('asset/Reveal/');?>assets/vendor/hoverIntent/hoverIntent.js"></script>

  <!-- Template Main JS File -->
  <script src="<?php echo base_url('asset/Reveal/');?>assets/js/main.js"></script>

</body>

</html>