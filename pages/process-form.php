<?php
// Get form data
$fullName = $_POST['fullName'];
$companyName = $_POST['companyName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$products = $_POST['products'];
$contactMethod = $_POST['contactMethod'];

// Email configuration
$to = "mansuriadnan2004@gmail.com";
$subject = "New Quote Request from $companyName";
$message = "New quote request received:\n\n";
$message .= "Full Name: $fullName\n";
$message .= "Company: $companyName\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
$message .= "Products: $products\n";
$message .= "Preferred Contact: $contactMethod";

// Send email
$headers = "From: $email";

if(mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>