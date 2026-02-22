# Hostel Management System

A complete web-based hostel management system built with HTML, CSS, JavaScript, PHP, and MySQL. This system allows students to browse hostels, book rooms, and manage their reservations.

## Features

### User Features
- **User Authentication**: Registration and secure login system
- **Room Browsing**: Browse available hostels and rooms with filtering options
- **Room Booking**: Easy room booking with date selection
- **My Bookings**: View and manage all bookings
- **Profile Management**: Update personal information and change password
- **Dashboard**: Overview of bookings and statistics

### Admin Features (Can be extended)
- Hostel management
- Room management
- Booking management
- Payment tracking

## System Architecture

### Frontend
- **HTML**: Semantic markup for all pages
- **CSS**: Modern, responsive design with animations
- **JavaScript**: Interactive features, form validation, API communication

### Backend
- **PHP**: Server-side logic and API endpoints
- **MySQL**: Database for storing all data

## Project Structure

```
hostel_management/
├── index.html                 # Login/Registration page
├── dashboard.html             # User dashboard
├── browse-rooms.html          # Room browsing page
├── my-bookings.html           # User bookings page
├── profile.html               # User profile page
├── database.sql               # Database schema
├── css/
│   ├── style.css              # Global styles
│   ├── dashboard.css          # Dashboard styles
│   ├── browse-rooms.css       # Browse rooms styles
│   ├── bookings.css           # Bookings page styles
│   └── profile.css            # Profile page styles
├── js/
│   ├── main.js                # Common JavaScript functions
│   ├── auth.js                # Authentication logic
│   ├── dashboard.js           # Dashboard functionality
│   ├── browse-rooms.js        # Room browsing logic
│   ├── bookings.js            # Bookings management
│   └── profile.js             # Profile page logic
└── php/
    ├── config.php             # Database configuration
    ├── auth.php               # Authentication endpoints
    └── bookings.php           # Bookings endpoints
```

## Installation & Setup

### Prerequisites
- PHP 7.0 or higher
- MySQL 5.7 or higher
- A web server (Apache/Nginx)
- A local development environment (XAMPP, WAMP, or MAMP)

### Step-by-Step Installation

1. **Copy Files to Web Root**
   - Copy the `hostel_management` folder to your web root:
     - XAMPP: `C:\xampp\htdocs\`
     - WAMP: `C:\wamp\www\`
     - MAMP: `/Applications/MAMP/htdocs/`

2. **Create Database**
   - Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`
   - Create a new database named `hostel_management`
   - Import the `database.sql` file:
     - Click on the `hostel_management` database
     - Go to Import tab
     - Select `database.sql` and click Import

3. **Configure Database Connection**
   - Open `php/config.php`
   - Update database credentials if needed:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'root');
     define('DB_PASS', '');
     define('DB_NAME', 'hostel_management');
     ```

4. **Start Services**
   - Start Apache and MySQL from your local server control panel

5. **Access the Application**
   - Open your browser and navigate to: `http://localhost/hostel_management/`

## Default Login Credentials

### Admin Account
- **Email**: admin@hostel.com
- **Password**: admin123

### Student Accounts
- **Email**: john@example.com / jane@example.com
- **Password**: password123

## Database Schema

### Tables
1. **users** - User accounts and authentication
2. **hostels** - Hostel information
3. **rooms** - Room details and availability
4. **bookings** - Booking records
5. **payments** - Payment tracking
6. **complaints** - User complaints/issues
7. **maintenance** - Room maintenance records

## API Endpoints

### Authentication
- `POST /php/auth.php?action=register` - User registration
- `POST /php/auth.php?action=login` - User login
- `POST /php/auth.php?action=logout` - User logout
- `GET /php/auth.php?action=get_user` - Get current user info

### Bookings
- `GET /php/bookings.php?action=get_hostels` - Get all hostels
- `GET /php/bookings.php?action=get_rooms?hostel_id=ID` - Get rooms by hostel
- `GET /php/bookings.php?action=get_available_rooms` - Get available rooms
- `GET /php/bookings.php?action=get_room_details?room_id=ID` - Get room details
- `POST /php/bookings.php?action=create_booking` - Create a new booking
- `GET /php/bookings.php?action=get_my_bookings` - Get user's bookings
- `POST /php/bookings.php?action=cancel_booking` - Cancel a booking

## Features in Detail

### Dashboard
- Shows key statistics:
  - Total hostels available
  - Available rooms
  - User's total bookings
  - Total amount spent
- Displays recent bookings
- Quick access to main features

### Browse Rooms
- Filter rooms by:
  - Hostel
  - Room type (Single, Double, Triple, Quad)
  - Price range
- View detailed room information
- Book rooms with date selection
- Responsive design with room cards

### My Bookings
- View all bookings
- Filter by booking status:
  - All
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- View booking details
- Cancel pending bookings

### Profile
- View/update personal information
- Change password
- Secure password change with confirmation

## UI Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Animations**: Smooth transitions and hover effects
- **Color Scheme**: Professional blue theme with supporting colors
- **Accessibility**: Proper form labels and semantic HTML
- **Dark Elements**: Sufficient contrast for readability

## Security Considerations

Current implementation includes:
- Password hashing using MD5 (Note: In production, use bcrypt or similar)
- Session-based authentication
- SQL connection escaping
- CORS headers setup

### For Production:
- Use bcrypt for password hashing
- Implement CSRF tokens
- Add input validation on both frontend and backend
- Use prepared statements for all database queries
- Implement rate limiting
- Add API authentication tokens
- Use HTTPS

## Future Enhancements

1. **Payment Integration**
   - Stripe or PayPal integration
   - Online payment processing

2. **Email Notifications**
   - Booking confirmations
   - Password reset emails

3. **Admin Dashboard**
   - Hostel management
   - Room management
   - Booking management
   - User management

4. **Advanced Features**
   - Room reviews and ratings
   - Complaint management system
   - Maintenance tracking
   - Multi-language support

5. **Mobile App**
   - React Native or Flutter mobile app
   - Push notifications

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check database credentials in `php/config.php`
- Verify database exists

### Login Not Working
- Clear browser cookies
- Check if database tables are properly created
- Verify user account exists

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Delete)
- Ensure all CSS files are linked correctly
- Check browser console for errors

### File Not Found Errors
- Verify all files are in correct directories
- Check file permissions
- Ensure URL is correct

## Support & Contact

For issues, questions, or suggestions, please refer to the code comments or create an issue in your development environment.

## License

This project is provided as-is for educational and development purposes.

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Built with**: HTML5, CSS3, JavaScript (ES6), PHP 7+, MySQL 5.7+
