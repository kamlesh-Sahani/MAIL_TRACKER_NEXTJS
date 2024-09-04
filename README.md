# Email Tracking System

## Description

A Next.js application integrated with MongoDB, Nodemailer, and Auth.js v5. This project allows you to send emails with tracking capabilities. By embedding tracking pixels in emails, it monitors email opens using unique IDs. The system includes authentication features and a backend for managing email campaigns and user data.


## Features

- **Email Sending**: Send emails using Nodemailer.
- **Email Tracking**: Track email opens with unique tracking pixels.
- **Authentication**: Secure user authentication using Auth.js v5.
- **Data Storage**: Store and manage email logs and user data with MongoDB.

## Technologies

- **Next.js**: Framework for server-rendered React applications.
- **MongoDB**: NoSQL database for data storage.
- **Nodemailer**: Email sending module for Node.js.
- **Auth.js v5**: Authentication library for secure user management.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/email-tracking-system.git
   cd email-tracking-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   SENDER_EMAIL=your_sender_email@example.com
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application** at `http://localhost:3000`.

## Usage

1. Navigate to the main page to send an email.
2. The email will contain a hidden tracking pixel.
3. When the email is opened, the pixel will be loaded, and the open event will be logged on the server.

## Contributing

Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License.

![Screenshot from 2024-09-05 00-17-56](https://github.com/user-attachments/assets/8459a024-3348-4c9f-8fb6-99cf8e61c7f3)
![Screenshot from 2024-09-05 00-19-45](https://github.com/user-attachments/assets/be311227-4433-404d-b6ee-ea1efbc6bfc6)
![Screenshot from 2024-09-05 00-19-52](https://github.com/user-attachments/assets/e80309d1-40a1-45d9-818a-2b5519814c33)
![Screenshot from 2024-09-05 00-20-10](https://github.com/user-attachments/assets/20ccaf4c-da1a-48cc-85db-d511fc7677e1)
![Screenshot from 2024-09-05 00-22-35](https://github.com/user-attachments/assets/707d7579-4ab3-48c7-b01d-177f747bd705)
