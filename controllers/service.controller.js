const utilHelper = require('../helpers/utils.helper');
const Schedule = require('../models/schedule');
const Service = require('../models/service');
const User = require('../models/user');
const serviceController = {};

serviceController.getInfo = async (req,res,next) => {
    try {
        let {from, to,...filter} = {...req.query};
        from = parseInt(from) || 0;
        to = parseInt(to) || 50000000;

        const service = await Service.find({...filter})
        .sort({createAt: "desc"})
        .populate('isBooked')
        .where('price')
        .gte(from)
        .lte(to)

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

serviceController.newService = async (req,res,next)=> {
    try {
        let {
            name,
            type,
            price,
            description,
            ...data
        } = {...req.body};

        let service = await Service.create({
            name,
            type,
            price,
            description,
            ...data
        })
        utilHelper.sendResponse(
            res,
            200,
            true,
            {service},
            null,
            "Create new service successfully."
        )
    } catch (error) {
        next(error)
    }
}

serviceController.booking = async (req,res,next) => {
    try {
        let serviceId = req.params.id;
        let {
            date,
            time,
        } = req.body;

        let schedule = await Schedule.create({
            owner: req.userId,
            service: serviceId,
            date,
            time,
        });
        let scheduleId = await schedule._id;
        let newSchedule = await Schedule.findById(scheduleId)
        .populate('service');
                
        //update in user
        let user = await User.findById(req.userId);
        user.schedule.push(scheduleId);
        await user.save();

        utilHelper.sendResponse(
            res,
            200,
            true,
            { newSchedule },
            null,
            "Create new schedule successfully."
        )
    } catch (error) {
        next(error)
    }
};

serviceController.updateBooking = async (req,res,next) => {
    try {
        let bookingId = req.params.id;
        let { totalCost, isDone } = req.body;
        let booking = await Schedule.findById(bookingId);
        let userId = booking.owner;

        //update user's point
        if(isDone) {
            utilHelper.updatePoint(userId, totalCost);
        };

        let service = await Schedule.findByIdAndUpdate(bookingId, { totalCost, isDone });
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