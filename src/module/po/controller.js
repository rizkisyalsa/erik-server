const router = require("express").Router();
const Po = require("./repository")

router.get('/', async (req, res) => {
   const { limit, page, search} = req.query;
   const data = await Po.getPo(parseInt(limit), parseInt(page), search);
   res.json(data)
})

router.post('/', async (req, res) => {
   const data = await Po.addPo(req.body);
   res.json(data)
})

router.put('/:id', async (req, res) => {
   let data = await Po.updatePo(req.params.id, req.body);
   res.send(data)
 })

router.delete('/:id', async (req, res) => {
   const data = await Po.deletePo(req.params.id);
   res.json(data)
})

module.exports = router;