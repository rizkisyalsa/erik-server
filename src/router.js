
const registerRoute = (app) => {
  app.use("/api/user", require("./core/auth/controller"))
  app.use("/api/barang", require("./module/barang/controller"))
  app.use("/api/po", require("./module/po/controller"))
  app.use("/api/sj", require("./module/sj/controller"))
  app.use("/api/dashboard", require("./module/dashboard/controller"))
}

module.exports = {
  registerRoute
}