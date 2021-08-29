const categotyController = {};


categotyController.getAll =(req,res,next) => {
    try {
        console.log('get all category')
    } catch (error) {
        next(error)
    }
};

module.exports = categotyController;