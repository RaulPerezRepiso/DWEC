<?php

// $login = $_POST["login"];
// $pass = $_POST["pass"];

// $login = $_GET["login"];
// $pass = $_GET["pass"];

$data = file_get_contents('php://input');
// $data = json_decode($data);

$data = json_decode($data, true);
$name = $data["name"];

// $name = $data->name; 

// Ver mañane en clase
// $data['name'] = "Pepito";
// $data['age'] = "99";


echo "Recibido name: " . $name . " en el servidor.";
