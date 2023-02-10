<?php

//database_connection.php
$options = [
    PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
];
//Connect to database
$connect = new PDO("mysql:host=localhost;dbname=project_database", "root", "", $options);
//Get info from form Submit
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$birth_date = $_POST['birth_date'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$desired_course = $_POST['desired_course'];
//Response Array to send back to user
$response = array(
    'status' => 0,
    'message' => 'Form submission failed, please try again.',
    'first_name'=>$first_name,
    'last_name'=>$last_name,
    'birth_date'=>$birth_date,
    'gender'=>$gender,
    'email'=>$email,
    'phone_number'=>$phone_number,
    'desired_course'=>$desired_course
);
//Insert Query to SQL databse
$query = "INSERT INTO users 
                SET
                first_name=:first_name,
                last_name=:last_name,
                birth_date=:birth_date,
                email=:email,
                gender=:gender,
                phone_number=:phone_number,
                desired_course=:desired_course";
//Using Bindparam for saftey using PDO
$stmt = $connect->prepare($query);
$stmt->bindParam(":first_name", $first_name);
$stmt->bindParam(":last_name", $last_name);
$stmt->bindParam(":birth_date", $birth_date);
$stmt->bindParam(":gender", $gender);
$stmt->bindParam(":email", $email);
$stmt->bindParam(":phone_number", $phone_number);
$stmt->bindParam(":desired_course", $desired_course);
if ($stmt->execute()) {
    $response['status'] = 1;
    $response['message'] = 'Form data submitted successfully!';
} else {
    $response['status'] = 0;
    $response['message'] = 'Something went wrong';
}
//Send the results back to user
echo json_encode($response);
