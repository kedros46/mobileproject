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
switch($page) {
    case 'register':

        switch ($_SERVER['REQUEST_METHOD']) {
            case 'POST':
                // Insert new user

                // Get user from $_POST
                $person = array('lastname' => htmlentities($_POST['lastname']), 'firstname' => htmlentities($_POST['firstname']), 'email' => htmlentities($_POST['email']),
                    'password' => sha1($_POST['password'] . $salt), 'gender' => htmlentities($_POST['gender']), 'birthday' => htmlentities($_POST['birthday']));

                try {
                    $sql = " INSERT INTO user(id, lastname, firstname, email, password, gender, birthday) VALUES(id,:lastname,:firstname, :email,:password,:gender,:birthday); ";
                    $stmt = $db->prepare($sql);


                    echo json_encode($stmt->execute(array(':lastname' => $person['lastname'], ':firstname' => $person['firstname'], ':email' => $person['email'], ':password' => $person['password'], ':gender' => $person['gender'], ':birthday' => $person['birthday'])));

                } catch (PDOException $e) {
                    json_encode(var_dump($e));
                }

                break;

        }

        break;

    case 'requestLogin':
        switch ($_SERVER['REQUEST_METHOD']) {

            case 'POST':
                // User is trying to log in
                $person = array('email' => htmlentities($_POST['email']), 'password' => sha1($_POST['password'] . $salt));
                try {
                    $sql = "SELECT id, email, password FROM user WHERE email = :email AND password= :password ";
                    $stmt = $db->prepare($sql);

                    if ($stmt->execute(array(':email' => $person['email'], ':password' => $person['password'])) !== false) {
                        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return false;
                    }
                } catch (PDOException $e) {
                    json_encode(var_dump($e));
                }
        }

        break;
    case 'mymedia':
        switch ($_SERVER['REQUEST_METHOD']) {
            case "POST":
                $person = array("mediaid" => htmlentities($_POST['mediaid']), 'userid' => htmlentities($_POST['userid']));
                try {
                    $sql = " INSERT INTO user2media(userid, mediaid) VALUES (:userid, :mediaid) ";
                    $stmt = $db->prepare($sql);

                    echo json_encode($stmt->execute(array(':userid' => $person['userid'], ':mediaid' => $person['mediaid'])));

                } catch (PDOException $e) {
                    json_encode(var_dump($e));
                }

                break;
                break;
            case 'GET':

                $person_id = explode ('/', $_SERVER['PATH_INFO']);
                if(isset($person_id[2])){
                    $person_id = $person_id[2];
                }

                try {
                    $sql = "SELECT media.* FROM media JOIN user2media on media.id = user2media.mediaid WHERE user2media.userid = :id";
                    $params = array(":id" => $person_id);
                    $stmt = $db->prepare($sql);

                    if ($stmt->execute($params) !== false) {
                        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return false;
                    }
                } catch (PDOException $e) {
                    json_encode(var_dump($e));
                }
        }
        break;
    case "newmedia":
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':

                $person_id = explode ('/', $_SERVER['PATH_INFO']);
                if(isset($person_id[2])){
                    $person_id = $person_id[2];
                }

                try {
                    $sql = "SELECT * FROM media WHERE NOT EXISTS (SELECT * FROM user2media JOIN media on user2media.mediaid = media.id WHERE user2media.userid = :id)";
                    //always returns empty...

                    $params = array('id' => $person_id);
                    $stmt = $db->prepare($sql);

                    if ($stmt->execute($params) !== false) {
                        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
                    } else {
                        return false;
                    }
                } catch (PDOException $e) {
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