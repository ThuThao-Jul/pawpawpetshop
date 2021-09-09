const utilHelper = require("../helpers/utils.helper");
const Pet = require("../models/pet");
const User = require('../models/user');

const petController = {};

petController.getPets = async(req,res,next)=> {
    try {
        let pets = await Pet.find({owner: req.userId});

        utilHelper.sendResponse(
            res,
            200,
            true,
            {pets},
            null,
            "Get all your pets successfully."
        )
    } catch (error) {
        next(error)
    }
};


petController.getSinglePet=async(req,res,next)=> {
    try {
        let petId = req.params.id;
        let pet = await Pet.findById(petId);

        utilHelper.sendResponse(
            res,
            200,
            true,
            {pet},
            null,
            "Get single pet successfully."
        )
    } catch (error) {
        next(error)
    }
};

petController.createNewPet=async(req,res,next)=>{
    try {
        let {
           name,
           type,
           ...data 
        } = {...req.body};

        let newPet = await Pet.create({
            owner: req.userId,
            name,
            type,
            ...data
        });
        let petId = newPet._id;

        //update in user profile
        let user = await User.findById(req.userId);
        user.pet.push(petId);
        await user.save();

        utilHelper.sendResponse(
            res,
            200,
            true,
            {newPet},
            null,
            "Create new pet successfully."
        )
    } catch (error) {
        next(error)
    }
};

petController.updatePet=async(req,res,next)=>{
    try {
        let petId = req.params.id;
        let {...update} = {...req.body};
        let updatedPet = await Pet.findByIdAndUpdate(petId, {...update});
        utilHelper.sendResponse(
            res,
            200,
            true,
            {updatedPet},
            null,
            "Update your pet successfully."
        )
    } catch (error) {
        next(error)
    }
};


petController.deletePet=async(req,res,next)=>{
    try {
        let petId = req.params.id;
        await Pet.findByIdAndDelete(petId);

        //update in user profile
        let user = await User.findById(req.userId);
        user.pet.splice(user.pet.indexOf(petId),1);
        await user.save();

        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Pet deleted successfully."
        )
    } catch (error) {
        next(error)
    }
};

module.exports = petController;