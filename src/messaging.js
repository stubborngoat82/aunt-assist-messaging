const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

class AuntAssistMessaging {
  constructor(firebaseConfig) {
    // Initialize Firebase if not already initialized
    if (!admin.apps.length) {
      admin.initializeApp(firebaseConfig);
    }
    this.db = admin.firestore();

    // Email transporter setup
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'auntassist@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  }

  // Carrier-specific SMS email gateways
  getCarrierGateways() {
    return {
      verizon: '@vtext.com',
      att: '@txt.att.net',
      boost: '@myboostmobile.com',
      tmobile: '@tmomail.net',
      sprint: '@messaging.sprintpcs.com',
      cox: '@sms.mycoxmail.com',
      cricket: '@sms.cricketwireless.net'
    };
  }

  // Predefined message categories with remote control mapping
  getMessageCategories() {
    return {
      'UP': {
        id: 'help', 
        label: 'Need Assistance', 
        message: 'I need immediate help.',
        icon: '🆘'
      },
      'DOWN': {
        id: 'social', 
        label: 'Want to Chat', 
        message: 'Would you like to talk?',
        icon: '💬'
      },
      'LEFT': {
        id: 'medical', 
        label: 'Medical Concern', 
        message: 'I have a medical issue.',
        icon: '🩺'
      },
      'RIGHT': {
        id: 'happy', 
        label: 'Feeling Good', 
        message: 'I am feeling great today!',
        icon: '😊'
      }
    };
  }

  // Add a new contact
  async addContact(contactDetails) {
    try {
      // Validate carrier
      const carriers = Object.keys(this.getCarrierGateways());
      if (!carriers.includes(contactDetails.carrier)) {
        throw new Error('Invalid carrier');
      }

      // Sanitize phone number
      const sanitizedPhone = contactDetails.phone.replace(/\D/g, '');

      // Validate phone number format
      if (!/^\d{10}$/.test(sanitizedPhone)) {
        throw new Error('Invalid phone number format');
      }

      // Add contact to Firestore
      const contactRef = await this.db.collection('contacts').add({
        name: contactDetails.name,
        phone: sanitizedPhone,
        carrier: contactDetails.carrier,
        relationship: contactDetails.relationship || 'Unknown',
        createdAt: new Date()
      });

      return { 
        success: true, 
        contactId: contactRef.id 
      };
    } catch (error) {
      console.error('Contact addition error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Send message via email-to-SMS
  async sendMessage(remoteControlInput, contactId) {
    try {
      // Fetch contact details
      const contactDoc = await this.db
        .collection('contacts')
        .doc(contactId)
        .get();
      
      const contact = contactDoc.data();

      // Get message based on remote control input
      const messageCategories = this.getMessageCategories();
      const selectedCategory = messageCategories[remoteControlInput];

      if (!selectedCategory) {
        throw new Error('Invalid remote control input');
      }

      // Determine carrier gateway
      const carrierGateways = this.getCarrierGateways();
      const carrierGateway = carrierGateways[contact.carrier];

      if (!carrierGateway) {
        throw new Error('Unsupported carrier');
      }

      // Send email-to-SMS
      await this.transporter.sendMail({
        from: 'auntassist@gmail.com',
        to: `${contact.phone}${carrierGateway}`,
        subject: '', 
        text: selectedCategory.message
      });

      // Log message send attempt
      await this.db.collection('message_logs').add({
        contactId,
        message: selectedCategory.message,
        carrier: contact.carrier,
        timestamp: new Date(),
        remoteControlInput
      });

      return { 
        success: true, 
        message: 'Message sent successfully',
        details: selectedCategory
      };
    } catch (error) {
      console.error('Message sending error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // List all contacts
  async listContacts() {
    try {
      const snapshot = await this.db.collection('contacts').get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error listing contacts:', error);
      return [];
    }
  }
}

module.exports = AuntAssistMessaging;