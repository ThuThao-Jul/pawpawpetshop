const utilHelper = require("../helpers/utils.helper");
const Products = require("../models/product");

const categotyController = {};


categotyController.getAll = async (req,res,next) => {
    try {
        const allProducts = await Products.find();
        const categories = allProducts.map((p) => p.category)

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
};

module.exports = categotyController;