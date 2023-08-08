exports.userLogout = async (req, res) => {
    try {
        res.clearCookie('weblearningtoken')
        console.log(`out`)
        return res.send({ continueWork: false, isLogin: false }).status(httpCodes.OK)
    } catch (error) {
        console.error('UserCont.js line:132 function userLogout', error);
        return res.send({ message: "Server Feiled, try again" }).status(httpCodes.SERVER_ERROR)
    }
}