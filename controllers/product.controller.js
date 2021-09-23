const utilHelper = require("../helpers/utils.helper");
const Products = require("../models/product");

const productController = {};

productController.getAll = async (req,res,next) => {
    try {
        let {page, limit, from, to, sort, name, ...filter} = {...req.query};
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;
        from = parseInt(from) || 0;
        to = parseInt(to) || 2000000;
        sort = sort || '';
        
        const totalProducts = await Products.countDocuments({
            ...filter,
            name: { $regex: new RegExp(name, "i") },
            $and: [{price: {$gte: from}}, {price: {$lte: to}}],
        });
        const totalPages = Math.ceil(totalProducts/limit);
        const offset = limit*(page -1);

        const products = await Products.find({...filter, name: { $regex: new RegExp(name, "i") } })
        .sort({price: sort})
        .skip(offset)
        .limit(limit)
        .where('price')
        .gte(from)
        .lte(to)

        utilHelper.sendResponse(
            res,
            200,
            true,
            {products, totalPages},
            null,
            "Get all products successfully."
        )

    } catch (error) {
        next(error)
    }
};

productController.getAllCategories = async(req,res,next)=>{
    try {
        const categories = ['food', 'snack & milk', 'toy', 'pet care', 'beauty']

        utilHelper.sendResponse(
            res,
            200,
            true,
            { categories },
            null,
            "Get all categories successfully."
        )
    } catch (error) {
        next(error)
    }
}

productController.getSingleProduct = async(req,res,next)=> {
    try {
        let productId = req.params.id;
        let product = await Products.findById(productId);
        utilHelper.sendResponse(
            res,
            200,
            true,
            {product},
            null,
            "Get single product successfully."
        )
    } catch (error) {
        next(error)
    }
}

productController.createNew = async (req,res,next) => {
    try {
        let {
           name,
           category,
           price,
           images,
           ...info
        } = {...req.body}

        let product = await Products.create({
            name,
            category,
            price,
            images,
            ...info
        });
        utilHelper.sendResponse(
            res,
            200,
            true,
            {product},
            null,
            "Created a new product successfully."
        )
    } catch (error) {
        next(error)
    }
};

productController.editProduct = async (req,res,next) => {
    try {
        console.log('edit an existed product')
    } catch (error) {
        next(error)
    }
};

productController.deleteProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        await Products.findByIdAndDelete(id);
        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Deleted successfully."
        )
    } catch (error) {
        next(error)
    }
};




module.exports = productController;