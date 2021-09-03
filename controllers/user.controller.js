const userController = {};


userController.getProfile = async (req,res,next)=> {
    try {
        console.log('get single profile')
    } catch (error) {
        next(error)
    }
};


userController.addToCart = async(req,res,next)=> {
    try {
        console.log('add to cart')
    } catch (error) {
        next(error)
    }
}