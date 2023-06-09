<?php
/**
 * This file will create admin menu page.
 */

class WP_Create_Admin_Page {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'create_admin_menu' ] );
    }

    public function create_admin_menu() {
        $capability = 'manage_options';
        $slug = 'dowell-send-email';

        add_menu_page(
            __( 'Dowell Email', 'dowell_send_email' ),
            __( 'Dowell Email', 'dowell_send_email' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-email'
        );
    }

    public function menu_page_template() {
        echo '<div class="wrap"><div id="dowell-send-email"></div></div>';
    }

}
new WP_Create_Admin_Page();