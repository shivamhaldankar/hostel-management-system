<?php
// debug.php

// Debugging information

// Capture the login status
$login_status = isset($_SESSION['logged_in']) ? $_SESSION['logged_in'] : 'Not logged in';

// Log the current date and time
$current_time = '2026-02-22 14:46:30';

// Output the debug information
file_put_contents('debug_log.txt', "Debug Info:\nLogin Status: $login_status\nCurrent Date and Time: $current_time\n======================\n", FILE_APPEND);

// Display debugging information
echo "<h3>Debugging Information</h3>";

// Add more debug information as needed
?>