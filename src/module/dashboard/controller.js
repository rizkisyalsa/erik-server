const router = require("express").Router();
const Dashboard = require("./repository");
const moment = require("moment");

router.get("/lastseven", async (req, res) => {
   let result = await Dashboard.getlastSevenDaysPo();
  // data = data.map(row => {
  //    return {
  //       tgl_po: moment(row.tgl_po).format('DD MMM YYYY'),
  //       jumlah: row.jumlah,
  //       status: row.status
  //    }
  // })
  console.log(result.data)
   let tgl_po = result.tgl_po.map(e => {
      return moment(e.tgl_po).format("DD MMM YYYY");
   });

   res.json({ tgl_po, result: result.data });
});

module.exports = router;
