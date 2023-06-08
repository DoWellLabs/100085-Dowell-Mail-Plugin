<?php

/**
 * This file will create custom Rest API end points
 */

 class WP_React_Email_Rest_Route {

  public function __construct() {
    add_action("rest_api_init", [$this, "create_rest_routes"]);
  }

  public function create_rest_routes() {
    register_rest_route("api/v1", "/mail", [
      "methods" => "POST",
      "callback" => [$this, "send_email"],
      "permission_callback" => [$this, "send_email_permission"]
    ]);
    register_rest_route("api/v1", "/mail", [
      "methods" => "GET",
      "callback" => [$this, "get_email"],
      "permission_callback" => [$this, "get_email_permission"]
    ]);
  }

  public function get_email() {
    $senderName = get_option( 'wpde_email_firstname' );
    $senderEmail  = get_option( 'wpde_email_senderEmail' );
    $receiverName = get_option( 'wpde_email_receiverName' );
    $receiverEmail = get_option( 'wpde_email_receiverEmail');
    $subject = get_option( 'wpde_email_subject');
    $body = get_option( 'wpde_email_body');

    $response = [
        'senderName' => $senderName,
        'senderEmail' => $senderEmail,
        'receiverName'  => $receiverName,
        'receiverEmail' => $receiverEmail,
        'subject' => $subject,
        'body' => $body
    ];

    return rest_ensure_response( $response );
  }

  public function get_email_permission() {
    return true;
  }

  public function send_email($req) {
    $senderName = sanitize_text_field( $req['senderName'] );
    $senderEmail  = sanitize_text_field( $req['senderEmail'] );
    $receiverName  = sanitize_text_field( $req['receiverName'] );
    $receiverEmail = sanitize_text_field( $req['receiverEmail'] );
    $subject  = sanitize_text_field( $req['subject'] );
    $body = sanitize_text_field( $req['body'] );
    update_option( 'wpde_email_senderName' , $senderName );
    update_option( 'wpde_email_senderEmail', $senderEmail );
    update_option( 'wpde_email_receiverName', $receiverName );
    update_option( 'wpde_email_receiverEmail', $receiverEmail );
    update_option( 'wpde_email_subject', $subject );
    update_option( 'wpde_email_body', $body );
    return rest_ensure_response( 'success' );
  }

  public function send_email_permission() {
    return true;
  }
};

 new WP_React_Email_Rest_Route();