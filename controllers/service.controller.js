const utilHelper = require('../helpers/utils.helper');
const Schedule = require('../models/schedule');
const Service = require('../models/service')
const serviceController = {};

serviceController.getInfo = async (req,res,next) => {
    try {
        let {type, from, to,...filter} = {...req.query};
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
        let {
            owner,
            service,
            date,
            time,
        } = req.body;

        let schedule = await Schedule.create({
            owner,
            service,
            date,
            time,
        });

        utilHelper.sendResponse(
            res,
            200,
            true,
            { schedule },
            null,
            "Create new schedule successfully."
        )
    } catch (error) {
        next(error)
    }
};

serviceController.updateBooking = async (req,res,next) => {
    try {
        let serviceId = req.params.id;
        let { isDone } = req.body;

        let service = await Schedule.findByIdAndUpdate(serviceId, { isDone });
        utilHelper.sendResponse(
            res,
            200,
            true,
            {service},
            null,
            "Update schedule status successfully."
        )
    } catch (error) {
        next(error)
    }
};

// serviceController.dashboard = (req,res,next) => {
//     try {
//         console.log('get spa dashboard')
//     } catch (error) {
//         next(error)
//     }
// }



module.exports = serviceController;