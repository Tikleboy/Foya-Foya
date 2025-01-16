<?php
require_once 'config.php';
require_once 'functions.php';

$sql = "SELECT * FROM transactions ORDER BY transaction_date DESC";
$result = $conn->query($sql);

$transactions = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
responseJson(true, 'Transaksi berhasil ditemukan', $transactions);
} else {
   responseJson(false, 'Tidak ada transaksi yang ditemukan.', []); // Ensure this returns an empty array
}
$conn->close();
?>