<?php
$conn = mysqli_connect("localhost", "root", "project-uts");
if (!$conn) {
http_response_code(500);
echo json_encode(["status" => "error", "message" => "Koneksi gagal"]);
exit;
}
?>