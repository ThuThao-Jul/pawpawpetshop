const utilHelper = require('../helpers/utils.helper');
const Competition = require('../models/competition');
const Order = require('../models/order');

const competitionController = {};

competitionController.getProfiles = async(req,res,next) => {
    try {
        let {startDate, endDate, qty} = req.query;
        let min = new Date(startDate);
        let max = new Date(endDate);
        let quantity = parseInt(qty);

        let allProfiles = await Order.aggregate([
            {$match: {isPaid: true, updatedAt: { $gte: min, $lte: max}}},
            {$group: {_id: '$owner', total: {$sum: "$finalCost"}}},
            {$sort: {total: -1}},
            {$limit: quantity}
        ])

        utilHelper.sendResponse(
            res,
            200,
            true,
            {allProfiles},
            null,
            "Get profiles successfully."
        )
    } catch (error) {
        next(error)
    }
};

competitionController.getAll=async(req,res,next)=>{
    try {
        let {page, limit} = {...req.query};
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const totalCompetitions = await Competition.countDocuments();
        const totalPages = Math.ceil(totalCompetitions/limit);
        const offset = limit*(page-1);

        const competitions = await Competition.find()
        .sort({createAt: -1})
        .skip(offset)
        .limit(limit)

        utilHelper.sendResponse(
            res,
            200,
            true,
            {competitions, totalPages},
            null,
            "Get all competitions successfully."
        )
    } catch (error) {
        next(error)
    }
};

competitionController.getSingleCompetition =async(req,res,next)=>{
    try {
        let competitionId = req.params.id;
        let competition = await Competition.findById(competitionId);

        utilHelper.sendResponse(
            res,
            200,
            true,
            {competition},
            null,
            "Get single competition successfully."
        )
    } catch (error) {
        
    }
};

competitionController.createNewCompetition = async(req,res,next)=>{
    try {
        let {
            name,
            pets,
            from,
            to,
        } = req.body;
        let competitors = pets.map((p) => {return {"pet": p, "vote": 0}})
        
        let competition = await Competition.create({
            name,
            competitors: competitors,
            from,
            to
        })

        utilHelper.sendResponse(
            res,
            200,
            true,
            {competition},
            null,
            "Create new competition successfully."
        )
    } catch (error) {
        next(error)
    }
};


competitionController.updateVote = async(req,res,next)=> {
    try {
        let [{
            pet,
            numberOfVote 
        }] = req.body;
        let competitionId = req.params.id;

        //check if these votes are in time
        let competition = await Competition.findOne({_id: competitionId});
        console.log('compare 1',new Date() >= competition.from);
        console.log('compare 2',new Date() <= competition.to)
        if (new Date() >= competition.from && new Date() <= competition.to){
            req.body.map((v) =>
                competition.competitors.map((c) => c.pet==v.pet ? c.vote+=v.numberOfVote : c.vote+=0)
            )
            await competition.save();
            utilHelper.sendResponse(
                res,
                200,
                true,
                null,
                null,
                "Voted successfully."
            );
        } else next(new Error('This competition has been closed.'))
    } catch (error) {
        next(error)
    }
};

competitionController.getRanking = async(req,res,next)=>{
    try {
        let competitionId = req.params.id;
        let competition = await Competition.findOne({_id: competitionId});
       
        //sort by desc num of vote
        let competitors = competition.competitors.sort(function(a,b){
            return b.vote - a.vote;
        });

        
        utilHelper.sendResponse(
            res,
            200,
            true,
            {competitors},
            null,
            "You found the winner."
        )
    } catch (error) {
        next(error)
    }
};

competitionController.updateWinner = async(req,res,next)=>{
    try {
        let competitionId = req.params.id;
        let {winner} = req.body;
        await Competition.findByIdAndUpdate(competitionId,{result: winner});
        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Update winner successfully."
        )
    } catch (error) {
        next(error)
    }
}

module.exports = competitionController;