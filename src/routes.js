const express = require('express');
const router = express.Router();


const AdminRoutes = require('../src/api/admin/route'); // Correct path
const photographyRoutes = require('../src/api/photography/route');
const uploadRoutes = require('../src/api/upload/route');
const homepageRoutes = require('../src/api/homepage/route');
const filmsRoutes = require('../src/api/films/route');
const contactUsRoutes = require('../src/api/contactUs/route');
const editorialRoutes = require('../src/api/editorial/route');
const photographyInvestmentRoutes = require('../src/api/photography-investment/route');
const cinematographyInvestmentRoutes  = require('../src/api/cinematography-investment/route');
const careerRoutes = require('../src/api/careers/route')
const aboutRoutes = require('../src/api/about/route');
const faqRoutes = require('../src/api/faq/route');
const globalSettingsRoutes = require('../src/api/globalSettings/route')




router.use('/auth', AdminRoutes);
router.use('/photography', photographyRoutes);
router.use('/', uploadRoutes);
router.use('/homepage', homepageRoutes);
router.use('/films', filmsRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/editorial', editorialRoutes);
router.use('/photography-investment', photographyInvestmentRoutes);
router.use('/cinematography-investment', cinematographyInvestmentRoutes);
router.use('/careers',careerRoutes );
router.use('/about', aboutRoutes);
router.use('/faqs', faqRoutes);
router.use('/global-settings', globalSettingsRoutes);


module.exports = router;

