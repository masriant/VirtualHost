/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.filebrowserBrowseUrl='http://localhost/aabc-website/fileman/index.html';
	config.filebrowserImageBrowseUrl='http://localhost/aabc-website/fileman/index.html'+'?type=image';
	config.removeDialogTabs= 'link:upload;image:upload';
};
