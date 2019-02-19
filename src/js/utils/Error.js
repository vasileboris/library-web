export const getReason = function (error) {
    let reason = error;
    if(error.response) {
        reason = error.response;
        if(error.response.status) {
            reason = error.response.status;
        }
    }
    return reason;
};