<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>404 Page Not Found</title>
  <!-- Google font -->
  <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:900" rel="stylesheet">
  <style>
  div.logo {
    height: 200px;
    width: 155px;
    display: inline-block;
    opacity: 0.08;
    position: absolute;
    top: 2rem;
    left: 50%;
    margin-left: -73px;
  }

  body {
    height: 100%;
    background: #fafafa;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #777;
    font-weight: 300;
  }

  h1 {
    font-weight: lighter;
    letter-spacing: 0.8;
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0;
    color: #222;
  }

  .wrap {
    max-width: 1024px;
    margin: 5rem auto;
    padding: 2rem;
    background: #fff;
    text-align: center;
    border: 1px solid #efefef;
    border-radius: 0.5rem;
    position: relative;
  }

  pre {
    white-space: normal;
    margin-top: 1.5rem;
  }

  code {
    background: #fafafa;
    border: 1px solid #efefef;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    display: block;
  }

  p {
    margin-top: 1.5rem;
  }

  .footer {
    margin-top: 2rem;
    border-top: 1px solid #efefef;
    padding: 1em 2em 0 2em;
    font-size: 85%;
    color: #999;
  }

  a:active,
  a:link,
  a:visited {
    color: #dd4814;
  }
  </style>
  <style>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* body {
    padding: 0;
    margin: 0;
  } */

  #notfound {
    position: relative;
    height: 100vh;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
  }

  .notfound .notfound-404 {
    position: relative;
    height: 240px;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 252px;
    font-weight: 900;
    margin: 0px;
    color: #262626;
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
  }

  .notfound .notfound-404 h1>span {
    text-shadow: -8px 0px 0px #fff;
  }

  .notfound .notfound-404 h3 {
    font-family: 'Cabin', sans-serif;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #262626;
    margin: 0px;
    letter-spacing: 3px;
    padding-left: 6px;
  }

  .notfound h2 {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    color: #000;
    margin-top: 0px;
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      height: 200px;
    }

    .notfound .notfound-404 h1 {
      font-size: 200px;
    }
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      height: 162px;
    }

    .notfound .notfound-404 h1 {
      font-size: 162px;
      height: 150px;
      line-height: 162px;
    }

    .notfound h2 {
      font-size: 16px;
    }
  }
  </style>
</head>

<body>
  <!-- <div class="wrap">
    <h1>404 - File Not Found</h1>

  </div> -->
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h3>Oops! Page not found</h3>
        <h1><span>4</span><span>0</span><span>4</span></h1>
      </div>
      <h2>we are sorry, but the page you requested was not found</h2>
      <p>
        <?php if (!empty($message) && $message !== '(null)') : ?>
        <?= esc($message) ?>
        <?php else : ?>
        <h2> Sorry! Cannot seem to find the page you were looking for.</h2>
        <?php endif ?>
      </p>
    </div>
  </div>
</body>

</html>