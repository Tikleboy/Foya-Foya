<?php
function sanitize($conn, $data) {
  return mysqli_real_escape_string($conn, htmlspecialchars(trim($data)));
}

function responseJson($status, $message, $data = []) {
  header('Content-Type: application/json');
  echo json_encode([
      'status' => $status,
      'message' => $message,
      'data' => $data
  ]);
  exit;
}
?>