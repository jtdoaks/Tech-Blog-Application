const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    let posts = await Post.findAll()

    posts = posts.map(post => post.get({ plain: true }))

    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {

    let postData = await Post.findByPk(req.params.id,{
      include: [{ model: User }, {model: Comment}]
    })

    let post = postData.get({ plain: true });
console.log(post)
    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ['title', 'description'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
      ],
    });

    user = post => post.get({ plain: true });

    res.render('user', { user, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    console.log(userData);

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
