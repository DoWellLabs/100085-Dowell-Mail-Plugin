<?php
/**
 * Plugin Name:       Wp Mail
 * Description:       An email platform powered by wordpress.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Emmanuel Mwara
 * License:           GPL-2.0-or-later
 * License URI:       https://www.github.com/mwaraem
 * Text Domain:       wpmail
 */

add_action( 'admin_menu', 'wpmail_init_menu' );

/**
 * Init Admin Menu.
 *
 * @return void
 */
function wpmail_init_menu() {
    add_menu_page( __( 'Wp Mail', 'wpmail'), __( 'Wp Mail', 'wpmail'), 'manage_options', 'wpmail', 'wpmail_admin_page', 'dashicons-admin-post', '2.1' );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function wpmail_admin_page() {
    require_once plugin_dir_path( __FILE__ ) . 'templates/app.php';
}

add_action( 'admin_enqueue_scripts', 'wpmail_admin_enqueue_scripts' );

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function wpmail_admin_enqueue_scripts() {
    wp_enqueue_style( 'wpmail-style', plugin_dir_url( __FILE__ ) . 'build/index.css' );
    wp_enqueue_script( 'wpmail-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
}

