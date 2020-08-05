const express = require('express')
const router = express.Router();
const { db,User,Page } = require('../models/index')
const views = require('../views')

router.get('/', async (req, res, next) => {
  try {
      const users = await User.findAll()
      res.send(views.userList(users))
  }
  catch(ex) {
      next(ex);
  }
})

router.get('/:id', async (req, res, next) => {
  const user = await User.findOne({
      where: {id: req.params.id}
    })

  const pages = await Page.findAll({
      where: {authorId: req.params.id}
    })
  //res.json(page)
  res.send(views.userPages(user, pages))
});

module.exports = router
