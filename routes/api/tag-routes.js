const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg: "Error", err})
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findByPk(req.params.id);
  if (!tagData) {
    res.status(404).json({msg: "Unable to find product"});
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tag => {
    res.json(tag);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name: req.body.tag_name }, {
    where: { id: req.params.id }
  }).then(tag => {
    res.json(tag);
  });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(tag=>{
    if(!tag){
      return res.status(404).json({msg:"No tag"})
    }
    res.json(tag)
  }).catch(err=>{
    res.status(500).json({msg:"Error",err})
  })
});

module.exports = router;
