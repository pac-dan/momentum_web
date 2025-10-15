# Email Setup Instructions

## Setting up Gmail for Contact Form Submissions

To receive contact form submissions at **devvsman@gmail.com**, you need to set up a Gmail App Password.

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the steps to enable it if not already enabled

### Step 2: Create an App Password

1. Go to https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords (at the bottom)
2. Select app: **Mail**
3. Select device: **Other (Custom name)** → Type "Momentum Website"
4. Click **Generate**
5. Google will show you a 16-character password (like `abcd efgh ijkl mnop`)
6. **Copy this password**

### Step 3: Update .env File

Open the `.env` file in your project root and replace:

```
EMAIL_PASSWORD=your_app_password_here
```

With your generated app password (remove the spaces):

```
EMAIL_PASSWORD=abcdefghijklmnop
```

### Step 4: Install Dependencies and Restart

Run these commands:

```bash
npm install
npm start
```

### Step 5: Test the Form

1. Open your website at http://localhost:3000
2. Fill out the contact form
3. Submit it
4. Check **devvsman@gmail.com** for the email!

---

## Troubleshooting

**Error: "Invalid login"**
- Make sure you used an App Password, not your regular Gmail password
- Ensure 2-Step Verification is enabled on your Google Account

**Error: "Username and Password not accepted"**
- Double-check that `EMAIL_USER=devvsman@gmail.com` in .env
- Make sure the App Password has no spaces

**Not receiving emails?**
- Check your spam/junk folder
- Check the server console for error messages
- Verify the email address in server.js line 39

---

## Security Notes

- ✅ The `.env` file is already in `.gitignore` (it should never be committed to Git)
- ✅ Never share your App Password publicly
- ✅ You can revoke App Passwords anytime from your Google Account settings

