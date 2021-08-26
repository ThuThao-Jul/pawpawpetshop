const productController = {};

productController.getAll = (req,res,next) => {
    try {
        console.log('get all products')
    } catch (error) {
        next(error)
    }
};

productController.createNew = (req,res,next) => {
    try {
        console.log('create a new product')
    } catch (error) {
        next(error)
    }
};

productController.editProduct = (req,res,next) => {
    try {
        console.log('edit an existed product')
    } catch (error) {
        next(error)
    }
};

productController.deleteProduct = (req, res, next) => {
    try {
        console.log('delete a product')
    } catch (error) {
        next(error)
    }
};




module.exports = productController;