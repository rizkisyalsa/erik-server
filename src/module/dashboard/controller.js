const router = require("express").Router();
const Dashboard = require("./repository");
const moment = require("moment");

router.get("/lastseven", async (req, res) => {
   let result = await Dashboard.getlastSevenDaysPo();
   // let tgl_po = result.tgl_po.map(e => {
   //    return moment(e.tgl_po).format("DD MMM YYYY");
   // });
   let data = result.data.map(e=>{
      return {
         ...e, tgl_po: `${moment(e.tgl_po).format("DD/MM/YYYY")}`
      }
   })

   res.json(data);
});

module.exports = router;
