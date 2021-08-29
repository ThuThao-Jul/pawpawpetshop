const utilHelper = require('../helpers/utils.helper');
const Service = require('../models/service')
const serviceController = {};

serviceController.getInfo = async (req,res,next) => {
    try {
        let type = req.params.type;
        let {from, to,...filter} = {...req.query};
        from = parseInt(from) || 0;
        to = parseInt(to) || 50000000;

        const service = await Service.find({type: type, filter})
        .sort({createAt: "desc"})
        .populate('isBooked')
        .gte({price: from})
        .lte({price: to})

        utilHelper.sendResponse(
            res,
            200,
            true,
            {service},
            null,
            "Get service info successfully."
        )

    } catch (error) {
        next(error)
    }
};

serviceController.booking = async (req,res,next) => {
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