const successPrint = require('../helpers/debug/debughelpers').successPrint;
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;

const routeProtectors = {};

// exp-recv-requst -> middleware1 -> mw2 -> ..
routeProtectors.userIsLoggedIn = function(req, resp, next) {
    if(req.session.username){
        successPrint('User is loggin in');
        next();
    }else {
        errorPrint('User is not logged in -> /login.html');
        resp.redirect('/login');
    }
}

module.exports = routeProtectors;