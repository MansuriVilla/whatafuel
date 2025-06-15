<?php
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Fetch raw POST inputs
    $fullName = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
    $companyName = isset($_POST['companyName']) ? trim($_POST['companyName']) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $products = isset($_POST['products']) ? $_POST['products'] : [];

    // Validate required fields
    if (empty($fullName) || empty($companyName) || !$email || empty($phone) || empty($products)) {
        throw new Exception('Please fill in all required fields.');
    }

    // Sanitize inputs (safe for email body)
    $fullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $companyName = htmlspecialchars($companyName, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $productsStr = is_array($products) ? implode(', ', array_map('htmlspecialchars', $products)) : htmlspecialchars($products);

    // Email configuration
    $to = "mansuriadnan2004@gmail.com"; // TODO: Add recipient email
    $subject = "New Quote Request from $companyName";
    $messageBody = "New quote request received:\n\n";
    $messageBody .= "Full Name: $fullName\n";
    $messageBody .= "Company: $companyName\n";
    $messageBody .= "Email: $email\n";
    $messageBody .= "Phone: $phone\n";
    $messageBody .= "Products: $productsStr\n";
    if ($message) {
        $messageBody .= "Additional Message: $message\n";
    }

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (!mail($to, $subject, $messageBody, $headers)) {
        throw new Exception('Failed to send email.');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Your quote request has been sent successfully!'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
