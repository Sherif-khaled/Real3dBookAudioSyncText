<?php
/**
 * Plugin Name: Real3DBook - Audio Sync Text
 * Plugin URI: https://github.com/Sherif-khaled/Real3dBookAudioSyncText
 * Description: Support Audio Sync Text To Real3DBook Plugin
 * Version: 1.1
 * Author: Sherif Khaled
 * Author URI: https://github.com/Sherif-khaled
 * License: GPL2
 * Text Domain: R3DB_AST
 **/
define('R3DB_AST_PLUGIN_URL', untrailingslashit(plugin_dir_url(__FILE__)));

register_activation_hook(__FILE__, 'R3DBAST_activate');
register_deactivation_hook(__FILE__, 'R3DBAST_deactivate');

add_action('wp_enqueue_scripts', 'register_script');
//add_action('admin_enqueue_scripts', 'register_script');

function register_script()
{
    wp_enqueue_script('booked-bbb-bootstrap', R3DB_AST_PLUGIN_URL.'/assets/js/real3dbook-audio-sync-text.js', ['jquery'], '1.1', false);
}
function R3DBAST_activate()
{
}
function R3DBAST_deactivate()
{
}
