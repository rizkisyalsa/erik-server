const router = require("express").Router();
const Po = require("./repository")

router.get('/', async (req, res) => {
   const { limit, page, search} = req.query;
   const data = await Po.getPo(parseInt(limit), parseInt(page), search);
   res.json(data)
})

router.get('/search', async (req, res) => {
   const {start, status, end} = req.query;
   const data = await Po.getSearchPo(start, status, end);
   res.json(data)
})

router.get('/last30Days', async (req, res) => {
   const data = await Po.getlast30Days();
   res.json(data)
})

router.post('/', async (req, res) => {
   const data = await Po.addPo(req.body);
   res.json(data)
})

router.put('/:id', async (req, res) => {
   let {status, namaBarang, jumlah} = req.body
   let stok = await Po.getJumlahBarang(namaBarang)
   let stokBarang = stok.data[0].accept
   let data = await Po.updatePo(req.params.id, status, jumlah, stokBarang, namaBarang);
   res.send(data)
 })

router.delete('/:id', async (req, res) => {
   const data = await Po.deletePo(req.params.id);
   res.json(data)
})

module.exports = router;