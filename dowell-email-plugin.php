<?php
/*
 * Plugin Name: doWell-email-plugin
 * Description: A doWell email plugin
 * Version: 1.0
 * Author: Addisu Haile
 * Author URI: https://github.com/Addisu87
 */

 if(!defined("ABSPATH")) : exit(); endif; // No direct access allowed.
/**
* Define Plugins Contants
*/
define ( 'WPDE_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WPDE_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts' );
function load_scripts() {
    wp_enqueue_script( 'wp-react-kickoff', WPDE_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'wp-react-kickoff', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}

require_once WPDE_PATH . "classes/admin-menu.php";
require_once WPDE_PATH . "classes/email-routes.php";