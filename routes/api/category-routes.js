const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg:"Unable to find Categories",err})
})
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include:[{
      model:Product
    }]
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg:"Unable to find Category",err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    categoryName:req.body.categoryName
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg:"Error no category could be created",err})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  },{
    where: {id:req.params.id}
  }).then(resp=>{
    res.json(resp);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id:req.params.id}
  }).then(resp=>{
    res.json(resp)
  })
});

module.exports = router;
