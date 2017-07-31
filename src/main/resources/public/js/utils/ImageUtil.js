export const displayDefaultImage = (target, defaultImage) => () => {
    alert(defaultImage);
    target.src = defaultImage
};
