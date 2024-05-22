const User = require('./../models/user')

exports.getLogin = (req, res, next) => {
    //const isLoggedIn = req.get('Cookie').split(';')[2].trim().split("=")[1] === 'true'
    console.log(req.session.isLoggedIn);

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (req, res, next) => {


    User.findById('6649ea3df1aa32a4e58db468')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/')
        })
        .catch(err => console.log(err));

    //res.setHeader('Set-Cookie', "loggedIn=true;Max-Age=10")



}