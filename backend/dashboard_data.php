<?php
// Database credentials
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "admin_dashboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch data
$data = [];

// Online Users
$result = $conn->query("SELECT COUNT(*) AS count FROM online_users WHERE status='online'");
$row = $result->fetch_assoc();
$data['online_users'] = $row['count'];

// Uploaded Missing Items
$result = $conn->query("SELECT COUNT(*) AS count FROM missing_items WHERE status='uploaded'");
$row = $result->fetch_assoc();
$data['uploaded_items'] = $row['count'];

// Claimed Missing Items
$result = $conn->query("SELECT COUNT(*) AS count FROM claimed_missing_items WHERE status='claimed'");
$row = $result->fetch_assoc();
$data['claimed_items'] = $row['count'];

// Reported Posts
$result = $conn->query("SELECT COUNT(*) AS count FROM reported_posts WHERE status='active'");
$row = $result->fetch_assoc();
$data['reported_posts'] = $row['count'];

$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
