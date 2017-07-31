export default {
    displayDefaultImage: function (target, defaultImage) {
        return function() {
            target.src = defaultImage;
        }
    }
};
