const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: Sequelize.ENUM('open','closed')
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, { as: 'author' });
Page.beforeValidate(async (page)=>{
  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
})

const initialSeed = async () => {
  try{
    const pages = [{
      title: 'Die Hard',
      content: 'Die Hard is an awesome movie starring Bruce Willis.'
    },{
      title: 'Armaggedon',
      content: 'Armaggedon is a crappy movie starring Bruce Willis.'
    }]
    const author = await User.create({name: 'John McClane', email: 'yippeekiy@y.com'})
    for ( let i = 0; i < pages.length; i++) {
      const page = await Page.create(pages[i]);
      await page.setAuthor(author);
    }
    console.log('It seeded!')
  } catch(er) {
    console.log(er)
  }
}

db.initialSync = async (seedOrNot) => {
  try{
    await db.sync({force:true});
    console.log('It synced!')
    seedOrNot ? initialSeed() : console.log('No seeding');
  } catch(er) {
    console.log(er)
  }
}

module.exports = {
  db,
  Page,
  User
}
