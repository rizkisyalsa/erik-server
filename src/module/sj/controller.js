const router = require("express").Router();
const Sj = require("./repository")

router.get('/', async (req, res) => {
   const { limit, page, search} = req.query;
   const data = await Sj.getSj(parseInt(limit), parseInt(page), search);
   res.json(data)
})

module.exports = router;