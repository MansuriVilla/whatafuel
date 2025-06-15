<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mansurivilla.github.io');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Determine content type and fetch inputs
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $data = json_decode(file_get_contents('php://input'), true);
        $fullName = isset($data['fullName']) ? trim($data['fullName']) : '';
        $companyName = isset($data['companyName']) ? trim($data['companyName']) : '';
        $email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL) : false;
        $phone = isset($data['phone']) ? trim($data['phone']) : '';
        $products = isset($data['products']) ? $data['products'] : [];
        $message = isset($data['message']) ? trim($data['message']) : '';
    } else {
        $fullName = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
        $companyName = isset($_POST['companyName']) ? trim($_POST['companyName']) : '';
        $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : false;
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $products = isset($_POST['products']) ? $_POST['products'] : [];
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    }

    // Validate required fields
    if (empty($fullName) || empty($companyName) || !$email || empty($phone) || empty($products)) {
        throw new Exception('Please fill in all required fields.');
    }

    // Validate phone number
    if (!preg_match('/^\+?\d{7,15}$/', preg_replace('/[\s-]/', '', $phone))) {
        throw new Exception('Please enter a valid phone number (7–15 digits, optional +).');
    }

    // Sanitize inputs
    $fullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $companyName = htmlspecialchars($companyName, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $productsStr = is_array($products) ? implode(', ', array_map('htmlspecialchars', $products)) : htmlspecialchars($products);

    // Email configuration
    $to = "mansuriadnan2004@gmail.com";
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