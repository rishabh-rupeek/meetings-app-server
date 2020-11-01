const mongoose = require( 'mongoose' );
const Notification = mongoose.model( 'notification' );

async function getNotificationsForUser( req, res, next ) {  
    Notification.find({"email":req.body.email})
        .then((notificationsForUser) => {
            res.json(notificationsForUser); 
        }).catch((error) => {
            error.status = 500;
            return next(error);
        })
}

async function addNotification( req, res, next ) {  
    Notification.create(req.body, (error, addedNotification) => {
        if(error){
            error.status = 500;
            return next(error);
        }
        res.status(200).json(addedNotification);
    })
}

module.exports = {
    getNotificationsForUser,
    addNotification
}