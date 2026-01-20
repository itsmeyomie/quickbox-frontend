import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

/**
 * Email Service
 * Sends emails using EmailJS (client-side email service)
 * Works on shared hosting without backend
 * 
 * SETUP REQUIRED:
 * 1. Create EmailJS account at https://www.emailjs.com/
 * 2. Create email service and templates
 * 3. Update the IDs below with your actual EmailJS credentials
 * 4. See EMAILJS_SETUP.md for detailed instructions
 */
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // TODO: Replace these with your actual EmailJS credentials
  private readonly SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
  private readonly TEMPLATE_ID_CONTACT = 'YOUR_CONTACT_TEMPLATE_ID'; // Replace with your contact template ID
  private readonly TEMPLATE_ID_QUOTE = 'YOUR_QUOTE_TEMPLATE_ID'; // Replace with your quote template ID
  private readonly PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

  private initialized = false;

  constructor() {
    // Initialize EmailJS with your public key
    if (this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.PUBLIC_KEY);
      this.initialized = true;
    } else {
      console.warn('EmailJS not configured. Please update email.service.ts with your EmailJS credentials.');
    }
  }

  /**
   * Send contact form email
   */
  async sendContactEmail(contact: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<void> {
    if (!this.initialized || this.SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.warn('EmailJS not configured. Skipping email send.');
      return;
    }

    try {
      const templateParams = {
        from_name: contact.name,
        from_email: contact.email,
        phone: contact.phone || 'Not provided',
        subject: contact.subject,
        message: contact.message,
        to_email: 'info@quickboxcourier.co.ke',
        reply_to: contact.email
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID_CONTACT,
        templateParams,
        this.PUBLIC_KEY
      );
      
      console.log('Contact email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send contact email:', error);
      // Don't throw - allow form submission to succeed even if email fails
    }
  }

  /**
   * Send quote request email
   */
  async sendQuoteEmail(quote: {
    name: string;
    email: string;
    contactNumber: string;
    serviceType?: string;
    pickupLocation?: string;
    deliveryDestination?: string;
    packageWeight?: string;
    additionalServices?: string;
  }): Promise<void> {
    if (!this.initialized || this.SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.warn('EmailJS not configured. Skipping email send.');
      return;
    }

    try {
      const templateParams = {
        from_name: quote.name,
        from_email: quote.email,
        contact_number: quote.contactNumber,
        service_type: quote.serviceType || 'Not specified',
        pickup_location: quote.pickupLocation || 'Not specified',
        delivery_destination: quote.deliveryDestination || 'Not specified',
        package_weight: quote.packageWeight || 'Not specified',
        additional_services: quote.additionalServices || 'Not specified',
        to_email: 'info@quickboxcourier.co.ke',
        reply_to: quote.email
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID_QUOTE,
        templateParams,
        this.PUBLIC_KEY
      );
      
      console.log('Quote email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send quote email:', error);
      // Don't throw - allow form submission to succeed even if email fails
    }
  }

  /**
   * Send partnership request email
   */
  async sendPartnershipEmail(partnership: {
    companyName: string;
    contactPerson: string;
    email: string;
    country: string;
    shippingNeeds: string;
  }): Promise<void> {
    if (!this.initialized || this.SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.warn('EmailJS not configured. Skipping email send.');
      return;
    }

    try {
      const templateParams = {
        company_name: partnership.companyName,
        contact_person: partnership.contactPerson,
        from_name: partnership.contactPerson,
        from_email: partnership.email,
        country: partnership.country,
        shipping_needs: partnership.shippingNeeds,
        to_email: 'info@quickboxcourier.co.ke',
        reply_to: partnership.email
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID_QUOTE, // Reuse quote template or create a new one
        templateParams,
        this.PUBLIC_KEY
      );
      
      console.log('Partnership email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send partnership email:', error);
      // Don't throw - allow form submission to succeed even if email fails
    }
  }
}
