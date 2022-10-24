const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../../src/models/User');

// UserID, password가 서버에 저장된 정보와 일치하는지 확인 후 로그인 승인
module.exports = new LocalStrategy(
    {
        userIDField: 'userID',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    },
    async (userID, password, done) => {    // verify
        try {           // DB에서 사용자 검색
            const exUser = await User.findOne({
                userID: userID, provider: 'local'
            });

            if (userID == exUser.userID) {
                if (password == exUser.hashedPW) {
                    console.log("*****Login Success*****")
                    done(null, exUser);
                } else {
                    console.log("*****Password Invalid*****");
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
                // if (exUser) {
                //     console.log('exUser', exUser);
                //     done(null, exUser);

                //     return User.checkPassword(
                //         exUser.salt, password, (passwordError, isMatch) => {
                //             if (isMatch) return done(null, exUser);
                //             return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                //         }
                //     )
            } else {
                console.log("*****UserID invalid*****");
                return done(null, false, { message: '아이디가 존재하지 않습니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
);
