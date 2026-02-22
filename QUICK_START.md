# Quick Start Guide

## Setup Instructions (Windows with XAMPP)

### 1. Copy Project Files
```
C:\xampp\htdocs\hostel_management\
```

### 2. Create Database

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL**
3. Open browser: `http://localhost/phpmyadmin`
4. Create new database: `hostel_management`
5. Go to the Import tab
6. Select `database.sql` file from the project
7. Click **Go** to import

### 3. Verify Configuration
- Open `php/config.php`
- Default settings should work for XAMPP:
  ```php
  define('DB_HOST', 'localhost');
  define('DB_USER', 'root');
  define('DB_PASS', '');
  define('DB_NAME', 'hostel_management');
  ```

### 4. Access Application
```
http://localhost/hostel_management/
```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hostel.com | admin123 |
| Student | john@example.com | password123 |
| Student | jane@example.com | password123 |

## File Structure Overview

```
hostel_management/
├── index.html              ← Login page (start here)
├── dashboard.html          ← Main dashboard after login
├── browse-rooms.html       ← Room browsing
├── my-bookings.html        ← User bookings
├── profile.html            ← User profile
├── database.sql            ← Database schema
├── README.md              ← Full documentation
├── QUICK_START.md         ← This file
├── css/                   ← Stylesheets
│   ├── style.css
│   ├── dashboard.css
│   ├── browse-rooms.css
│   ├── bookings.css
│   └── profile.css
├── js/                    ← JavaScript files
│   ├── main.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── browse-rooms.js
│   ├── bookings.js
│   └── profile.js
└── php/                   ← Backend PHP
    ├── config.php
    ├── auth.php
    └── bookings.php
```

## Common Issues

### "Connection failed" error
- **Solution**: Ensure MySQL is running in XAMPP

### Blank page after login
- **Solution**: Check browser console for JavaScript errors (F12)

### Rooms not showing
- **Solution**: Verify database.sql was imported successfully

### Forms not submitting
- **Solution**: Ensure PHP files exist in `php/` folder

## Features to Try

1. **Register**: Create a new student account
2. **Browse**: Explore available rooms with filters
3. **Book**: Select a room and book with dates
4. **Dashboard**: View booking statistics
5. **Profile**: Update your information

## Development Tips

- **Inspect Elements**: Press F12 to open developer tools
- **Network Tab**: Check API calls (Network tab in DevTools)
- **Console**: View JavaScript errors and logs
- **Responsive**: Press F12 → Toggle device toolbar to test mobile view

## Next Steps

1. Test all features
2. Try different user accounts
3. Explore the database in phpMyAdmin
4. Review the code structure
5. Customize styling in CSS files
6. Extend functionality in PHP files

## Support Resources

- Check README.md for full documentation
- Review code comments in each file
- Test with browser DevTools (F12)
- Verify database records in phpMyAdmin

---

**Happy Coding!** 🎉
