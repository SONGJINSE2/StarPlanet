const router = require("express").Router();
const createError = require("http-errors");
const User = require("../../models/User");

// 회원 조회
router.get("/:_id", (req, res) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    if (err) res.json(err);
    res.json(user);
  });
});

// 비밀번호재설정
// router.put("/:_id", (req, res) => {
//   const _id = req.params._id
//   User.findOne({ userID: req.params._id })
//     .select("hashedPW")
//     .exec((err, user) => {
//       if (err) return res.json(err);

//       user.originPw = user.hashedPW;
//       user.hashedPW = req.body.newPw ? req.body.newPw : user.hashedPW;

//       for (para in req.body) {
//         user[para] = req.body[para];
//       }

//       user.save((err, user) => {
//         if (err) return res.json(err);
//         res.json(user);
//       });
//     });
// });

//~

// 전체 회원조회
router.get("/", (req, res, next) => {
  User.find()
    .select("-pwd")
    .then((r) => {
      res.status(200).send({ success: true, msg: r });
    })
    .catch((e) => {
      res.status(500).send({ msg: e.message });
    });

  // User.find()
  //   .sort({ createdAt: 1 }) // 가입일 기준으로 정렬 (역순 정렬은 -1)
  //   .exec((err, users) => {
  //     if (err) return res.json(err);
  //     res.json(users);
  //   });
});

//! 회원정보수정 로직
router.patch("/", async (req, res) => {
  console.log(req.body);
  const { userID, email, username } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      res.status(500).send({ msg: "duplicate" });
      return false;
    }
    User.findOneAndUpdate(
      { userID },
      { $set: { username: username, email: email } },
      { new: true }
    ).then((r) => {
      res.status(201).send({ success: true, msg: r });
    });
  } catch (e) {
    res.status(500).send({ msg: e.message });
  }
});

//! 회원 탈퇴 로직
router.delete("/:userID", (req, res) => {
  const { userID } = req.params;
  User.deleteOne({ _id: userID })
    .then((r) => {
      res.status(201).send({ success: true, msg: r });
    })
    .catch((e) => {
      res.status(500).send({ msg: e.message });
    });
});

// error handler
router.all("*", function (req, res, next) {
  next(createError(404, "no api"));
});

module.exports = router;
