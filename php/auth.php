<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'register') {
        register();
    } elseif ($action === 'login') {
        login();
    } elseif ($action === 'logout') {
        logout();
    } elseif ($action === 'get_user') {
        get_user();
    }
}

function register() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        return;
    }
    
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $password = md5($data['password']);
    $phone = $conn->real_escape_string($data['phone'] ?? '');
    
    // Check if email already exists
    $check = $conn->query("SELECT id FROM users WHERE email = '$email'");
    if ($check->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email already exists']);
        return;
    }
    
    $sql = "INSERT INTO users (name, email, password, phone, role) VALUES ('$name', '$email', '$password', '$phone', 'student')";
    
    if ($conn->query($sql)) {
        $_SESSION['user_id'] = $conn->insert_id;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_role'] = 'student';
        echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $conn->error]);
    }
}

function login() {
    global $conn;
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['email']) || !isset($data['password'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing email or password']);
        return;
    }
    
    $email = $conn->real_escape_string($data['email']);
    $password = md5($data['password']);
    
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['user_email'] = $user['email'];
        
        echo json_encode(['status' => 'success', 'message' => 'Login successful', 'user' => ['id' => $user['id'], 'name' => $user['name'], 'role' => $user['role']]]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
    }
}

function logout() {
    session_destroy();
    echo json_encode(['status' => 'success', 'message' => 'Logout successful']);
}

function get_user() {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $_SESSION['user_id'],
                'name' => $_SESSION['user_name'],
                'role' => $_SESSION['user_role'],
                'email' => $_SESSION['user_email'] ?? ''
            ]
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    }
}
?>
