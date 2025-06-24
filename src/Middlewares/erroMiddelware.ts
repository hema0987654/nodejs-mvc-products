import { Response,Request,NextFunction } from "express";

class ErroMiddleWare{
    
    static handel(err:Error,req:Request, res:Response , next:NextFunction){

        if (req.originalUrl.startsWith('/api')) {
            res.status(500).json({
                error:  "internal server Error",
                message:"jjk",
                stack:err.stack
            })
        }
        return;  
    
        res.status(500).render("error", {
            error: "internal server Error",
            message: "bk",
            stack: err.stack
        });
        next();
    }

    

    
}

export default ErroMiddleWare;