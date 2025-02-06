const Contact = require('../../../models/ContactUs'); 
module.exports = {
createContact : async (req, res) => {
  try {
    const { name, email, phone, estimatedGuestCount, eventFlow, location, eventDates, services } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      phone,
      estimatedGuestCount,
      eventFlow,
      location,
      eventDates,
      services
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
},

getAllContacts : async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: 'Contacts retrieved successfully', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
},

getContactById : async (req, res) => {
  try {
    const { id } = req.query;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact retrieved successfully', data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact', error: error.message });
  }
}
}