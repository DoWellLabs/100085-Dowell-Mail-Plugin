<?php
/*
 * Plugin Name: doWell-email-plugin
 * Description: A doWell email plugin
 * Version: 1.0
 * Author: Addisu Haile
 * Author URI: https://github.com/Addisu87
 */

 if(!defined("ABSPATH")) : exit(); endif; // No direct access allowed.

/** Define plugins Constants */
define ( 'WPDE_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'WPDE_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );


/** Loading necessary scripts */

add_action("admin_enqueue_scripts", "load_scripts");

function load_scripts() {
  wp_enqueue_scripts("wp-dowell-email", WPDE_URL . "dist/bundle.js", ["wp-element"], wp_rand(), true);
  wp_localize_script("wp-dowell-email", "appLocalizer", [
    'apiUrl' => home_url('/wp-json'),
    "nonce" => wp_create_nonce("wp-rest")
  ]);
}

require_once WPDE_PATH . "classes/admin-menu.php";