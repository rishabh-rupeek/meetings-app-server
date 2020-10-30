async function uploadData(req,res,next){
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        error.message = "Not Uploaded";
        error.status = 401;
        next( error ); 
    }
}

module.exports = {
    uploadData
}