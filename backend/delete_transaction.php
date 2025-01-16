<?php
require_once 'config.php';
require_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = sanitize($conn, $_POST['id']);

    if(empty($id)){
        responseJson(false, 'ID transaksi tidak valid.');
    }

    $sql = "DELETE FROM transactions WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
       responseJson(true, 'Transaksi berhasil dihapus.');
    } else {
        responseJson(false, 'Berhasil!, Refresh Pagenya!');
    }

    $stmt->close();
    $conn->close();
} else {
    responseJson(false, 'Metode permintaan tidak valid.');
}
?>