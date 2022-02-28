const router = require("express").Router();
const authRoutes = require("./auth.routes");
const projectRoutes = require("./project.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


router.use("/auth", authRoutes);
router.use("/projects", projectRoutes)

module.exports = router;