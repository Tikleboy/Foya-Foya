<?php
$host = "localhost";  // Ganti dengan host database Anda
$username = "root";   // Ganti dengan username database Anda
$password = "";   // Ganti dengan password database Anda
$database = "simple_saving";  // Ganti dengan nama database Anda

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
  die("Koneksi database gagal: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>