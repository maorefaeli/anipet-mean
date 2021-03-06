const FB = require('fb');
const keys = require('../config/keys');

FB.setAccessToken(keys.facebookPageAccessToken)

exports.postToPage = (message) => {
    FB.api(`/${keys.facebookPageId}/feed`, 'POST', { message },
        function(response) {
            console.log(response);
        }
    );
}
