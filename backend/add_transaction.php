<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    require_once 'config.php';
    require_once 'functions.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $type = sanitize($conn, $_POST['type']);
        $amount = sanitize($conn, $_POST['amount']);
        $name = sanitize($conn, $_POST['name']);

        if(empty($type) || empty($amount) || empty($name)){
             responseJson(false, 'Semua field harus diisi.');
        }
        if (!is_numeric($amount) || $amount <= 0) {
            responseJson(false, 'Jumlah harus berupa angka positif.');
        }


        $sql = "INSERT INTO transactions (type, amount, name) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sds", $type, $amount, $name);


        if ($stmt->execute()) {
            responseJson(true, 'Transaksi berhasil ditambahkan.');
        } else {
             responseJson(false, 'Berhasil!, Refresh Pagenya!', [$stmt->error]);
        }

        $stmt->close();
        $conn->close();
    } else {
        responseJson(false, 'Metode permintaan tidak valid.');
    }
?>