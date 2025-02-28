const GlobalSetting = require("../../../models/globalSetting");
module.exports = {
  getAllGlobalSettings: async (req, res) => {
    try {
      const settings = await GlobalSetting.find();
      res.status(200).json(settings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getGlobalSettingById: async (req, res) => {
    try {
      const setting = await GlobalSetting.findById(req.query.id);
      if (!setting) {
        return res.status(404).json({ message: "Global Setting not found" });
      }
      res.status(200).json(setting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createGlobalSetting: async (req, res) => {
    try {
      const {
        logo,
        location,
        phoneNumber,
        email,
        instagram,
        youtube,
        announcementBarText,
        announcementBarTextColor,
        announcementBarBgColor,
        contactBanner,
      } = req.body;
      const newSetting = new GlobalSetting({
        logo,
        location,
        phoneNumber,
        email,
        instagram,
        youtube,
        announcementBarText,
        announcementBarTextColor,
        announcementBarBgColor,
        contactBanner,
      });
      await newSetting.save();
      res.status(200).json(newSetting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateGlobalSetting: async (req, res) => {
    try {
      const {
        logo,
        location,
        phoneNumber,
        email,
        instagram,
        youtube,
        announcementBarText,
        announcementBarTextColor,
        announcementBarBgColor,
        contactBanner,
      } = req.body;
      const updatedSetting = await GlobalSetting.findByIdAndUpdate(
        req.query.id,
        {
          logo,
          location,
          phoneNumber,
          email,
          instagram,
          youtube,
          announcementBarText,
          announcementBarTextColor,
          announcementBarBgColor,
          contactBanner,
        },
        { new: true, runValidators: true }
      );
      if (!updatedSetting) {
        return res.status(404).json({ message: "Global Setting not found" });
      }
      res.status(200).json(updatedSetting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteGlobalSetting: async (req, res) => {
    try {
      const deletedSetting = await GlobalSetting.findByIdAndDelete(
        req.query.id
      );
      if (!deletedSetting) {
        return res.status(404).json({ message: "Global Setting not found" });
      }
      res.status(200).json({ message: "Global Setting deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
