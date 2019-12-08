const router = require("express").Router();
const Barang = require("./repository")

router.get('/', async (req, res) => {
   const { limit, page, search} = req.query;
   const data = await Barang.getBarang(parseInt(limit), parseInt(page), search);
   res.json(data)
})

router.get('/namaBarang', async (req, res) => {
   const data = await Barang.getNamaBarang();
   res.json(data)
})

router.post('/', async (req, res) => {
   const data = await Barang.addBarang(req.body);
   res.json(data)
})

router.put('/:id', async (req, res) => {
   let data = await Barang.updateBarang(req.params.id, req.body);
   res.send(data)
 })

router.delete('/:id', async (req, res) => {
   const data = await Barang.deleteBarang(req.params.id);
   res.json(data)
})

module.exports = router;