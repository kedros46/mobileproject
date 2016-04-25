<?php
/**
 * Created by PhpStorm.
 * User: jillvandendriessche
 * Date: 2/29/16
 * Time: 8:27 PM
 */

/*
 * DISCLAIMER:
 * This file is all kinds of dirty I don't even know where to begin, please NEVER EVER code like this
 * This is for demonstration purposes only, trying to keep an exercise in "Mobile Web Apps" simple, serving no other purpose
 * DO NOT use this code in production. EVER!
 * It is pure evil
 * ~ JVD ~
 * */

$salt = 'sfsdfs dfsd fsdfsd fs dfsdfsf';
$page = ( isset( $_SERVER['PATH_INFO'] ) ) ? explode('/',$_SERVER['PATH_INFO'])[1] : null;

$db = new PDO(
    'mysql:host=localhost;port=3306;dbname=mobileweb-amazeme',
    'usramazeme',
    'Am@Z3mE'
);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


//var_dump($page,explode('/',$_SERVER['PATH_INFO']));
switch($page){
    case 'register':

        switch($_SERVER['REQUEST_METHOD']){
            case 'POST':
                // Insert new user

                // Get user from $_POST
                $person = array('name' => htmlentities($_POST['name']),'email' => htmlentities($_POST['email']),'password' => sha1($_POST['password'] . $salt));

                try {
                    $sql = " INSERT INTO person(name,email,password) VALUES(:name,:email,:password); ";
                    $stmt = $db->prepare($sql);

                    echo json_encode($stmt->execute(array(':name'=>$person['name'],':email'=>$person['email'],':password'=>$person['password'])));

                }  catch(PDOException $e){
                   json_encode(var_dump($e));
                }

                break;

        }

        break;

    case 'login':
        switch($_SERVER['REQUEST_METHOD']){

            case 'POST':
                // User is trying to log in
                $person = array('email' => htmlentities($_POST['email']),'password' => sha1($_POST['password'] . $salt));
                try {
                    $sql = "SELECT id, name,email FROM person WHERE email = :email AND password= :password ";
                    $stmt = $db->prepare($sql);

                    if($stmt->execute(array(':email'=>$person['email'],':password'=>$person['password'])) !== false) {
                        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return false;
                    }
                }  catch(PDOException $e){
                    json_encode(var_dump($e));
                }
        }

        break;
}

/*
if($_SERVER['REQUEST_METHOD'] == "POST"){
    echo 'Will insert new record';
} else if($_SERVER['REQUEST_METHOD'] == "GET") {
    echo 'Will look for record';
} else if($_SERVER['REQUEST_METHOD'] == "PUT") {
    echo 'Will update record';
}else if($_SERVER['REQUEST_METHOD'] == "DELETE") {
    echo 'Will delete record';
} else {
    echo 'illegal request';
}*/
?>