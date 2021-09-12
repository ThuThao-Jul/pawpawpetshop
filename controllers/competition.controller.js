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
        let competition = await Competition.findOne({_id: competitionId});
        req.body.map((v) =>
            competition.competitors.map((c) => c.pet==v.pet ? c.vote+=v.numberOfVote : c.vote+=0)
        )
        await competition.save()
        
        utilHelper.sendResponse(
            res,
            200,
            true,
            null,
            null,
            "Voted successfully."
        )
        
    } catch (error) {
        next(error)
    }
};

competitionController.updateWinner = async(req,res,next)=>{
    try {
        let competitionId = req.params.id;
        let competition = await Competition.findOne({_id: competitionId});
        let winner = '';
        let maxVote = 0;
        competition.competitors.map((c)=> {
            if(c.vote > maxVote){
                maxVote = c.vote;
                winner = c.pet;
            }
        });

        let update = await Competition.findByIdAndUpdate(competitionId, {result: {winner, vote: maxVote}});
        let result = await Competition.findById(update._id)
        utilHelper.sendResponse(
            res,
            200,
            true,
            {result},
            null,
            "You found the winner."
        )
    } catch (error) {
        next(error)
    }
};

module.exports = competitionController;