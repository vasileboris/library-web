export default {
    previewUrl: function (url) {
        return url.replace(/(http[s]?\:\/\/)(.*)(\/.*)/ig, '$1...$3');
    }
};
