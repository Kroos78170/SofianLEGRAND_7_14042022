const jwt = require('jsonwebtoken');

exports.getUserIdToken = (authorizationBearer) => {
    const token = authorizationBearer.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    return decodedToken.userId;
};