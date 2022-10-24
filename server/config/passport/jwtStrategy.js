const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');


const { User } = require('../../src/models/User');
const secret = require('../../config/default').secretOrKey;


module.exports = new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),// header의 bearer스키마에 담겨온 토큰 해석
    secretOrKey: secret,    // 복호화 방식
}, async (payload, done) => {
    console.log("payload");
    try {         // palyload의 id값으로 유저의 데이터 조회 ( id까지 저장한다면 )
        console.log("payload");
        const exUser = await User.findOne({ userID: payload.id })
        if (exUser) { done(null, exUser); return; }
        else done(null, false, { reason: '올바르지 않은 인증정보입니다.' });  // 유저 데이터가 없을 경우 에러 표시å
    } catch (error) {
        console.error(error);
        done(error);
    }
});
