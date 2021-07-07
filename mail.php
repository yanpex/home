<?php
$email = $_POST['con_email'];
$name = $_POST['con_name'];
$mess = $_POST['con_message'];




$to = 'themewar@gmail.com';
$subject = 'Agency User Query';

$message = '<strong>Name : </strong>'.$name.'<br/><br/>';
$message .= $mess.'<br/>';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'.$email.'>' . "\r\n";

mail($to,$subject,$message,$headers);
echo 1;