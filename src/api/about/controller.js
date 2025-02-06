const About = require('../../../models/about');

module.exports = {
    createAbout:async (req, res)=>{
        try {
            const abouts = await About.create(req.body);
            return res.status(200).json({data:abouts});
        } catch (err) {
            return res.status(400).json({error:err.messsage});
        }
    },
    getAllAbouts: async(req, res)=> {
        try {
            const abouts = await About.find();
            return res.status(200).json({data:abouts});
        } catch (err) {
            return res.status(400).json({error:err.messsage});
        }
    },
    // getAboutById: async (req, res) => {
    //     try {
    //         const abouts = await About.findById(req.params.id);
    //         return res.status(200).json({data:abouts});
    //     } catch (err) {
    //         return res.status(400).json({error:err.messsage});
    //     }
    // },
    updateAbout :  async (req, res) =>{
        try {
            const abouts = await About.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res.status(200).json({data:abouts});
        } catch (err) {
            return res.status(400).json({error:err.messsage});
        }
    },
    deleteAbout: async (req, res)=> {
        try {
            await About.findByIdAndDelete(req.query.id);
            return res.status(200).json({message:'About deleted'});                                                                                                                 
        } catch (err) {
            return res.status(400).json({error:err.messsage});
        }
    }
};