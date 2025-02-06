const career = require('../../../models/careers');

module.exports = {
    createCareer:async (req, res)=>{
        try {
            const careers = await career.create(req.body);
            return res.status(201).json(careers);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    getAllCareers: async(req, res)=> {
        try {
            const careers = await career.find();
            return res.status(200).json(careers);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    getCareerById: async (req, res) => {
        try {
            const careers = await career.findById(req.query.id);
            return res.status(200).json(careers);
        } catch (err) {
            return res.status(400).json(err);
        }
    },
    // updateCareer :  async (req, res) =>{
    //     try {
    //         const careers = await career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //         return res.status(200).json(careers);
    //     } catch (err) {
    //         return res.status(400).json(err);
    //     }
    // },
    // deleteCareer: async (req, res)=> {
    //     try {
    //         await career.findByIdAndDelete(req.params.id);
    //         return res.status(204).json();
    //     } catch (err) {
    //         return res.status(400).json(err);
    //     }
    // }
};