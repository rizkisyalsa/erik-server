const router = require("express").Router();
const { passwordIsMatch, getLoggedIn, createNewUser, upload } = require("./service");
const {setFoto, getAllUser, deleteUser} = require("./repository");

const auth = require("./auth");

// @route      GET api/user/auth
// @desc       Get logged in user
// @access     Private
router.get("/auth", auth, async (req, res) => {
  let result = await getLoggedIn(req.user.id);
  res.status(result.sts).json(result.user);
});

// @route      GET api/user
// @desc       Get all User
// @access     Private
router.get("/", async (req, res) => {
  let result = await getAllUser();
  res.status(200).json(result);
});

// @route      POST api/user/auth
// @desc       Auth user & get token
// @access     Public
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;

  let result = await passwordIsMatch(username, password);
  res.status(result.sts).json(result.user);
});

// @route      POST api/user/register
// @desc       Register New User
router.post("/register", async (req, res) => {
  const { name, username, password, role } = req.body;

  let result = await createNewUser(username, password, name, role);
  res.status(result.sts).json(result.user);
});

// @route      POST api/user/foto
// @desc       edit Foto
router.put("/foto/:id", (req, res) => {
  upload(req, res, function (err) {
     if(err){
        console.log(err)
        res.status(400).send({msg: 'upload Foto failed'})
        return
     }
     setFoto(req.file.filename, req.params.id)
    //  const foto = Foto.getFoto()
     res.status(201).send({msg: 'upload foto success'});
  })
});

// @route      POST api/user/:id
// @desc       delete User
router.delete('/:id', async (req, res) => {
  const user = await deleteUser(req.params.id);
  res.json(user)
})

module.exports = router;
