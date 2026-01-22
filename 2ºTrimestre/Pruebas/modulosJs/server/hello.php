<?php

// $login = $_POST["login"];
// $pass = $_POST["pass"];

// $nombre = $_GET["login"];
// $pass = $_GET["pass"];

$data = file_get_contents('php://input');
// $data = json_decode($data);

$data = json_decode($data, true);
// $data = json_decode($data, false);
// $name = $data["name"];

// $name = $data->name; 

// Ver mañane en clase
$data2['name'] = "Pepito";
$data2['age'] = "99";

echo "Recibido name: " . $data->name    . " en el servidor.";
// echo "Recibido name: " . json_encode($data2)     . " en el servidor.";
echo json_encode($data2);
// echo "El nombre es: " . $nombre . "y el pass: " . $pass;
