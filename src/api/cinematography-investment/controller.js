
const cinematographyInvestment = require('../../../models/Cinematography_Investment ');

module.exports = {
    createcinematographyInvestment :async (req, res)=> {
        try {
        const investment = await cinematographyInvestment.create(req.body);
        return res.send(investment);
        } catch (err) {
        return res.status(400).send({ error: err.message });
        }
    },
    getAllcinematographyInvestments: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.find();
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    getcinematographyInvestmentById: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.findById(req.query.id);
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    updatecinematographyInvestment: async (req, res) => {
        try {
            const investment = await cinematographyInvestment.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    deletecinematographyInvestment: async (req, res) => {
        try {
            await cinematographyInvestment.findByIdAndDelete(req.query.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }


};
