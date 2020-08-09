<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->get('/lakip/cari', 'Lakip::cari');
$routes->get('/lakip/print/(:segment)', 'Lakip::print/$1');
$routes->get('/lakip/printer/(:segment)', 'Lakip::printer/$1');
$routes->get('/lakip/Convert/(:segment)', 'Lakip::spreadsheet/$1');
$routes->get('/lakip/Convert/(:segment)', 'Lakip::pdf/$1');
$routes->get('/lakip/list', 'Lakip::list_print');
$routes->get('/pdf/(:segment)', 'Pdf::index/$1');
$routes->get('/lakip/edit/(:segment)', 'Lakip::edit/$1');
$routes->get('/lakip/(:any)', 'Lakip::detail/$1');

// $routes->add('login/(.+)', 'Auth::login/$1');
// $routes->add('users/profile', 'Users::profile', ['as' => 'profile']);

// Redirect to a named route
// $routes->addRedirect('users/about', 'profile');
// Redirect to a URI
// $routes->addRedirect('users/about', 'users/profile');
// $routes->group('admin', function ($routes) {
// 	$routes->add('users', 'Admin\Users::index');
// 	$routes->add('blog', 'Admin\Blog::index');
// });

// $routes->group('admin', function ($routes) {
// 	$routes->group('users', function ($routes) {
// 		$routes->add('list', 'Admin\Users::list');
// 	});
// });

// $routes->add('admin', ' AdminController::index', ['filter' => 'admin-auth']);

// $routes->add('users/delete/(:segment)', 'AdminController::index', ['filter' => 'admin-auth:dual,noreturn']);

// Routes to \Admin\Users::index()
// $routes->add('admin/users', 'Users::index', ['namespace' => 'Admin']);

// $routes->setDefaultNamespace('');

// Controller is \Users
// $routes->add('users', 'Users::index');

// Controller is \Admin\Users
// $routes->add('users', 'Admin\Users::index');

// $routes->setDefaultNamespace('App');

// Controller is \App\Users
// $routes->add('users', 'Users::index');

// Controller is \App\Admin\Users
// $routes->add('users', 'Admin\Users::index');



/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}