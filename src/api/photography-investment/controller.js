const photographyInvestment = require('../../../models/Photography_Investment');

module.exports = {
    createPhotographyInvestment :async (req, res)=> {
        try {
        const investment = await photographyInvestment.create(req.body);
        return res.send(investment);
        } catch (err) {
        return res.status(400).send({ error: err.message });
        }
    },
    getAllPhotographyInvestments: async (req, res) => {
        try {
            const investment = await photographyInvestment.find();
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    getPhotographyInvestmentById: async (req, res) => {
        try {
            const investment = await photographyInvestment.findById(req.params.id);
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    updatePhotographyInvestment: async (req, res) => {
        try {
            const investment = await photographyInvestment.findByIdAndUpdate(req.query.id, req.body, { new: true });
            return res.send(investment);
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    },
    deletePhotographyInvestment: async (req, res) => {
        try {
            await photographyInvestment.findByIdAndDelete(req.params.id);
            return res.send();
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }


};
