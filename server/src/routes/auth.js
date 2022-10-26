const express = require('express');
const router = express.Router();

const passport = require('../../config/passport');
const jwt = require("jsonwebtoken");
const secret = require('../../config/default').secretOrKey;
const { verifyToken } = require('../middlewares/authorization');



router.get('/', (req, res) => {
    if (req.cookies.token != null) {
        console.log('path : /auth');
        console.log('req.user : ', req.user);
        console.log('req.cookies : ', req.cookies);
        res.send("로그인 성공");
    } else {
        res.redirect('/auth/login');
    }
});

//! passport-jwt 미들웨어 (인증 확인)
router.get('/auth', passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        console.log("hi");
        try {
            res.json({ result: true });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);


//! 로그인
router.get('/login', (req, res) => {
    console.log('get:/auth/login');

    if (req.query.loginError != null) console.log("***** Error : ", req.query.loginError, "*****");
    res.send(req.query.loginError);
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, svrError) => {  // 사용자 인증
        // 지정전략(strategy)를 사용해 로그인에 성공/실패할경우 이동할 경로와 메시지 설정
        console.log('passport authenticate');
        if (authError) next(authError);  // 클라이언트 에러시 (이메일 또는 비밀번호 틀렸을 때)
        if (!user) {
            console.log('!user', user);
            return res.redirect(`/auth/login?loginError=${svrError.message}`);
        }
        // 로그인 성공시 user에 회원정보 있음 req.login으로 passport 로그인
        return req.login(user, { session: false }, (passportError) => {    // jwt 토큰 이용시 session 사용 종료
            if (passportError || !user) return next(passportError);
            else {
                const token = setUserToken(res, req.user);
                console.log('setUserToken: ', token);
                res.status(201).json({ result: 'ok', token });
            }
        });
    })(req, res, next); // 미들웨어 내의 미들웨어
});


// 구글 간편로그인
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth',
}),
    (req, res) => {
        const token = setUserToken(res, req.user);
        res.status(201).json({ result: 'ok', token });
    }
);

// 네이버 간편로그인
router.get('/naver', passport.authenticate('kakao'));
router.get('/naver/callback', passport.authenticate('naver', {
    failureRedirect: '/auth'
}), (req, res) => {
    const token = setUserToken(res, req.user);
    res.status(201).json({ result: 'ok', token });
}
);

// 카카오 간편로그인
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/auth',
}),
    (req, res) => {
        const token = setUserToken(res, req.user);
        res.status(201).json({ result: 'ok', token });
    }
);


// 로그아웃 
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.cookie('token', null, {
        maxAge: 0,
    });
    res.send('logout');
});


//! jwt토큰 발급
function setUserToken(res, user) {
    user.type = 'JWT';
    const token = jwt.sign(user.toJSON(), secret, {
        expiresIn: '15m', // 만료시간 15분
        issuer: '토큰발급자',
    });
    res.cookie(token);
    return token;
}

module.exports = router;
