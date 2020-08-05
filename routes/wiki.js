const express = require('express')
const { db,User,Page } = require('../models/index')
const router = express.Router();
const views = require('../views')

router.get('/', async (req, res, next) => {
    try {
        const wikis = await Page.findAll()
        res.send(views.main(wikis))
    }
    catch(ex) {
        next(ex);
    }
})


router.post('/', async (req, res, next) => {

    try {
        const [ user, created ] = await User.findOrCreate({
            where: {name: req.body.authorName, email: req.body.authorEmail}
        })
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content
        });

        await page.setAuthor(user)

        await page.save();
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { next(error) }
})

router.get('/add', async (req, res, next) => {
    try {
        res.send(views.addPage())
    }
    catch(ex) {
        next(ex);
    }
})

router.get('/:slug', async (req, res, next) => {
    const page = await Page.findOne({
        where: {slug: req.params.slug}
      })

    const author = await page.getAuthor();

    res.send(views.wikiPage(page, author))
});

module.exports = router
