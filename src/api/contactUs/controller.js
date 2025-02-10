const {Contact, Section} = require('../../../models/ContactUs');
module.exports = {
  createContact: async (req, res) => {
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

  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json({ message: 'Contacts retrieved successfully', data: contacts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
  },

  getContactById: async (req, res) => {
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
  },

  createHeaderSection: async (req, res) => {
    try {
      const { title, description, media } = req.body
      const newHeader = new Section({
        title,
        description,
        media
      });
      await Section.save();
      res.status(200).json(newHeader);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateHeaderSection: async (req, res) => {
    try {
      const { title, description, media } = req.body
      const updatedSection = await Section.findByIdAndUpdate(
        req.query.id,
        { title, description, media },
        { new: true, runValidators: true }
      );
      if(!updatedSection){
        return res.status(404).json({message:"Section not found"})
      }
      
      res.status(200).json(updatedSection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSection:async (req, res)=>{
    try {
      const section = await Section.find()
      res.status(200).json(section)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getSectionById :async(req, res)=>{
    try {
      const section  = await Section.findById(req.query.id);
      if(!section){
      return res.status(404).json({message:"section not found"})
    }
    res.status(200).json(section) 
  }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteSection: async (req, res) => {
    try {
      const section = await Section.findByIdAndDelete(
        req.query.id
      );
      if (!section) {
        return res.status(404).json({ message: "Global Setting not found" });
      }
      res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

}