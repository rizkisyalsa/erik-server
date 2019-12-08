const router = require("express").Router();
const Dashboard = require("./repository")

router.get('/lastseven', async (req, res) => {
   const data = await Dashboard.getlastSevenDaysPo();
   res.json(data)
})

module.exports = router;