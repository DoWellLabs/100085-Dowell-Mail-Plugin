<?php

/*
This file will create admin menu page
*/

class WPDE_Create_Admin_Page {
  public function __construct() {
    add_action("admin_menu", [$this, "create_admin_menu"]);
  }

  public function create_admin_menu() {
    $capablity = 'manage_options';
    $slug = "wpde-contact";


    add_menu_page(
      __("WP Dowell Email", "wp-dowell-email"),
      __("WP Dowell Email", "wp-dowell-email"),
      $capablity,
      $slug,
      [$this, "menu_page_template"],
      "dashicons-buddicons-replies",

    );
  }

  public function menu_page_template() {
    echo '<div class="wrap"><div id="wpde-admin-app"></div></div>';
  }
}

new WPDE_Create_Admin_Page();