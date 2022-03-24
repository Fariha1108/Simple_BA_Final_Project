const userAdmin = (req, res, next)=>{
    try
    {
        console.log(req.body.admin);
        if(req.body.admin === "true")
        {
            console.log(req.body);
            next();
        }
        else throw new Error("User not admin")
    }
    catch (err)
    {
        next(err)
    }
   
};

module.exports = userAdmin;