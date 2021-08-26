const serviceController = {};

serviceController.getInfo = (req,res,next) => {
    try {
        console.log('spa service')
    } catch (error) {
        next(error)
    }
};

serviceController.booking = (req,res,next) => {
    try {
        console.log('create a new spa service or combo')
    } catch (error) {
        next(error)
    }
};

serviceController.updateBooking = (req,res,next) => {
    try {
        console.log('update spa available time')
    } catch (error) {
        next(error)
    }
};

serviceController.dashboard = (req,res,next) => {
    try {
        console.log('get spa dashboard')
    } catch (error) {
        next(error)
    }
}



module.exports = serviceController;