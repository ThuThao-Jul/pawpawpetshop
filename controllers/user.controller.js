const utilHelper = require("../helpers/utils.helper");
const Cart = require("../models/cart");
const Order = require("../models/order");
const User = require("../models/user");

const userController = {};


userController.getProfile = async (req,res,next)=> {
    try {
        let user = await User.findById(req.userId)
        .populate({
            path: 'cart', 
            match: { isDeleted: false },
            populate: {
                path: 'product'
        }})
        .populate({
            path: 'schedule',
            populate: {
                path: 'service'
            }
        })
        .populate({
            path: 'order',
            populate: {
                path: 'order', select: ['product', 'quantity']
            }
        })
        .populate('pet');

        utilHelper.sendResponse(
            res,
            200,
            true,
            {user},
            null,
            "Get single profile successfully."
        )
    } catch (error) {
        next(error)
    }
};

userController.addToCart = async(req,res,next)=> {
    try {
        let productId = req.params.id;
        let {quantity} = req.body;
        quantity = parseInt(quantity);
        let user = await User.findById(req.userId)
        let cartId = '';
          
        // check if there is duplicated product
        let duplicatedProduct = await Cart.find({
            owner: req.userId, 
            product: productId,
            isDeleted: false
    });
        if (duplicatedProduct.length) {
            console.log('there is duplication')
            cartId = duplicatedProduct[0]._id;
            if (quantity<=0) {
                //remove the product if quantity = 0
                user.cart.splice(user.cart.indexOf(cartId), 1);
                await Cart.findByIdAndDelete(cartId);
            } else {
                //update the quantity if that product has been in cart already & quantity > 0
                await Cart.findByIdAndUpdate(cartId, {quantity: quantity});
            } 
        } else {
            console.log('no duplication')
            // create new cart if there is no duplication
           let cart = await Cart.create({
               owner: req.userId,
               product: productId,
               quantity: quantity
           })
           cartId = cart._id;
           user.cart.push(cartId);
        }
        await user.save();
        let cart = await Cart.findById(cartId)
        .populate('product');

        utilHelper.sendResponse(
            res,
            200,
            true,
            {cart},
            null,
            "Update cart successfully."
        )
    } catch (error) {
        next(error)
    }
}


userController.deleteCart = async(req,res,next) => {
    try {
        await Cart.deleteMany({owner: req.userId, isDeleted: false});
        await User.findByIdAndUpdate(req.userId, {cart: []});
        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Cart deleted."
        )
    } catch (error) {
        next(error)
    }
}


userController.order= async(req,res,next) =>{
    try {
        let cart = await Cart.find({owner: req.userId, isDeleted: false})
        .populate('product', 'price');
        let user = await User.findOne({_id: req.userId});
        
        if (cart.length) {
        let totalCost = 0;
        let discount = 0;
        cart.map((c) => totalCost+= c.product.price*c.quantity);
        
        //discount for member
        if (user.tier==='silver'){
            discount = 0.05;
        };
        if(user.tier==='gold'){
            discount = 0.1;
        };
        if(user.tier==='platinum'){
            discount = 0.15;
        }

        // let {
        //     address,
        //     phone
        // } = req.body;
        let finalCost = totalCost*(1-discount);

        let order = await Order.create({
            owner: req.userId,
            order: cart,
            // address,
            // phone,
            totalCost,
            discount,
            finalCost
        });
        
        let orderId = order._id;
        let newOrder = await Order.findById(orderId)
        .populate({
            path: 'order',
            populate: {
                path: 'product'
            }
        });
        //update in user data
        await User.findById(req.userId);
        user.order.push(orderId);
        await user.save();

        //delete cart
        // await Cart.updateMany({owner: req.userId}, {isDeleted: true});
        // await User.findByIdAndUpdate(req.userId, {cart: []});

        utilHelper.sendResponse(
            res,
            200,
            true,
            {newOrder},
            null,
            "Created new order."
        )} else next()
    } catch (error) {
        next(error)
    }
}


userController.deleteOrder= async (req,res,next) => {
    try {
        let orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);

        //update in user data
        let user = await User.findById(req.userId);
        user.order.splice(user.order.indexOf(orderId), 1);
        await user.save();

        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Order deleted."
        )
    } catch (error) {
        next(error)
    }
}


userController.payment= async(req,res,next) => {
    try {
        let orderId = req.params.id;
        let {
            address,
            phone
        } = req.body;
        let paid = await Order.findByIdAndUpdate(orderId, {isPaid: true, address: address, phone: phone})
        .populate('order', ['product', 'quantity']);

        //delete cart
        await Cart.updateMany({owner: req.userId}, {isDeleted: true});
        await User.findByIdAndUpdate(req.userId, {cart: []});

        
        //update user's point
        let order = await Order.findById(orderId);
        let totalCost = order.finalCost;
        utilHelper.updatePoint(req.userId, totalCost);
        
        utilHelper.sendResponse(
            res,
            200,
            true,
            {paid},
            null,
            "Your order has been paid."
        )
    } catch (error) {
        next(error)
    }
}

module.exports = userController