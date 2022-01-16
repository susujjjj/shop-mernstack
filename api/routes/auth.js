const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASS_SEC
      ).toString(), //PASS_SEC는 .env에 설정해줌 
    });
 
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async(req, res) => {
    try {
      const user = await User.findOne({username: req.body.username});
      !user && res.status(401).json("Wrong credentials!")
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      Originalpassword !== req.body.password && 
        res.status(401).json("Wrong credentials!");

        const accessToken = jwt.sign(
          {
            id: user._id, 
            isAdmin: user.isAdmin,
          }, 
          process.env.JWT_SEC,
          {expiresIn: "3d"}
        )

        const {password, ...others} = user._doc;  

        res.status(200).json({...others, accessToken});
      } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// {
//     "others": {
//         "_id": "61a90e6724851c6325f16731",
//         "username": "nerd",
//         "email": "nerd@gmail.com",
//         "isAdmin": false,
//         "createdAt": "2021-12-02T18:20:23.992Z",
//         "updatedAt": "2021-12-02T18:20:23.992Z",
//         "__v": 0
//     },
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTkwZTY3MjQ4NTFjNjMyNWYxNjczMSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mzg2MTEwMDEsImV4cCI6MTYzODg3MDIwMX0.l2v4XRwaZ9Jpg52e0AiT0IQZ-FhrOaQU2O0OqZ_9DRw"
// }