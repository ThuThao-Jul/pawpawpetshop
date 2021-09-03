const utilHelper = require("../helpers/utils.helper");
const Products = require("../models/product");

const productController = {};

productController.getAll = async (req,res,next) => {
    try {
        let {page, limit, from, to, ...filter} = {...req.query};
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 20;
        from = parseInt(from) || 0;
        to = parseInt(to) || 50000000;

        const totalProducts = await Products.countDocuments({
            ...filter,
            $and: [{price: {$gte: from}}, {price: {$lte: to}}],
        });
        const totalPages = Math.ceil(totalProducts/limit);
        const offset = limit*(page -1);

        const products = await Products.find({...filter})
        .sort({createAt: "desc"})
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

productController.createNew = async (req,res,next) => {
    try {
        let {
           name,
           category,
           price,
           images,
           stock,
           ...info
        } = {...req.body}

        let product = await Products.create({
            name,
            category,
            price,
            images,
            stock,
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