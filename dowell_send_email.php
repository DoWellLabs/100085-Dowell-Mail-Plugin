<?php
/**
 * Plugin Name:       dowell_send_email 
 * Description:       A plugin to send email.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Saidul
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dowell_send_email
 */

 if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
* Define Plugins Contants
*/
define ( 'WP_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WP_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'load_scripts' );
function load_scripts() {
    wp_enqueue_style( 'dowell-send-email-style', WP_URL . 'dist/output.css' );
    wp_enqueue_script( 'dowell-send-email', WP_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'dowell-send-email', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
    ] );
}

require_once WP_PATH . 'classes/class-create-admin-menu.php';
