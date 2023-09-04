const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/',  async (req, res) => {
  try {
    let newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.delete('/:id',  async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
