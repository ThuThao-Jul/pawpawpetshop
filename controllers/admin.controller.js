const utilHelper = require('../helpers/utils.helper');
const Order = require('../models/order')
const adminController = {};


adminController.putDelivery = async (req,res,next) => {
    try {
        let orderId = req.params.id;
        await Order.findByIdAndUpdate(orderId, {isDelivered: true});
        let order = await Order.findById(orderId);

        utilHelper.sendResponse(
            res,
            200,
            true,
            {order},
            null,
            "Deleveried successfully."
        )
        
    } catch (error) {
        next(error)
    }
};

adminController.getRevenue = async (req,res,next) => {
    try {
        let revenue = await Order.aggregate([
            {$match: {isPaid: true}},
            {$group: {_id: "$isPaid", total: {$sum: "$finalCost"}}}
        ])

        utilHelper.sendResponse(
            res,
            200,
            true,
            {revenue},
            null,
            null
        )
    } catch (error) {
       next(error) 
    }
}

adminController.getPaidOrders = async (req,res,next) => {
    try {
        let {page , limit} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const totalOrders = await Order.countDocuments({isPaid: true});
        const totalPages = Math.ceil(totalOrders/limit);
        const offset = limit*(page -1);

        const orders = await Order.find({isPaid: true, isDelivered: false})
        .populate('owner')
        .sort({updatedAt: -1})
        .skip(offset)
        .limit(limit)

        utilHelper.sendResponse(
            res,
            200,
            true,
            {orders, totalPages},
            null,
            "Get paid orders successfully."
        )
    } catch (error) {
        next(error)
    }
}
module.exports = adminController;