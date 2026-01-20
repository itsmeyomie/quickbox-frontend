# EmailJS Setup Guide

This guide will help you set up EmailJS to send emails from your QuickBox website to `info@quickboxcourier.co.ke`.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.) or use **Custom Service**
4. Follow the setup instructions for your email provider
5. Note your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Templates

### Contact Form Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: "Contact Form"
4. Use this template:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} ({{from_email}})
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

5. Set **To Email** to: `info@quickboxcourier.co.ke`
6. Note your **Template ID** (e.g., `template_xxxxxxx`)

### Quote Request Template

1. Create another template named "Quote Request"
2. Use this template:

```
Subject: New Quote Request from {{from_name}}

Contact Information:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{contact_number}}

Service Details:
Service Type: {{service_type}}
Pickup Location: {{pickup_location}}
Delivery Destination: {{delivery_destination}}
Package Weight: {{package_weight}}
Additional Services: {{additional_services}}

---
Reply to: {{reply_to}}
```

3. Set **To Email** to: `info@quickboxcourier.co.ke`
4. Note your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** > **General** in EmailJS dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy it

## Step 5: Update Email Service Configuration

1. Open `quickbox-angular/src/app/services/email.service.ts`
2. Replace the placeholder values:

```typescript
private readonly SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
private readonly TEMPLATE_ID_CONTACT = 'YOUR_CONTACT_TEMPLATE_ID'; // Replace with Contact Template ID
private readonly TEMPLATE_ID_QUOTE = 'YOUR_QUOTE_TEMPLATE_ID'; // Replace with Quote Template ID
private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

3. Save the file

## Step 6: Test

1. Submit a contact form on your website
2. Check your email `info@quickboxcourier.co.ke`
3. Check Firebase to verify data was saved
4. Check browser console for any errors

## Troubleshooting

### Emails not sending?
- Check browser console for errors
- Verify all IDs are correct in `email.service.ts`
- Check EmailJS dashboard for delivery status
- Ensure email service is connected properly

### Rate Limits
- Free tier: 200 emails/month
- Upgrade to paid plan for more emails
- Consider using Firebase Cloud Functions for higher limits (requires backend)

## Alternative: Using Firebase Cloud Functions

If you need more emails or want server-side email sending, you can use Firebase Cloud Functions with Nodemailer or SendGrid. However, this requires a backend setup.

## Current Setup

✅ Contact form → Firebase + Email
✅ Quote request → Firebase + Email  
✅ Partnership request → Firebase + Email

All forms now send to both Firebase and `info@quickboxcourier.co.ke` simultaneously!
