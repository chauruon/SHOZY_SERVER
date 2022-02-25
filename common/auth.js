var jwt = require('jsonwebtoken')

// toastr.options = {
//     "closeButton": true,
//     "debug": false,
//     "newestOnTop": false,
//     "progressBar": true,
//     "positionClass": "toast-top-right",
//     "preventDuplicates": false,
//     "onclick": null,
//     "showDuration": "300",
//     "hideDuration": "1000",
//     "timeOut": "10000",
//     "extendedTimeOut": "10000",
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "slideDown",
//     "hideMethod": "fadeOut",
// };

exports.toastrwarning  = function (mess) {
    toastr.warning(mess);
}
exports.toastrsuccess  = function (mess) {
    toastr.success(mess);
}
exports.toastrerror  = function (mess) {
    toastr.error(mess);
}

exports.check = function (req, res, next) {
    let { token } = req.session
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                res.redirect('/login')
            } else {
                next()
            }
        });
    } else {
        res.redirect('/login')
    }
}