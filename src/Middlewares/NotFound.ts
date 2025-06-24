import { Request, Response ,NextFunction} from "express";

class NotFound{
    
    static handel(req:Request, res:Response , next:NextFunction){

        if (req.originalUrl.startsWith('/api')) {
            res.status(404).json({
                 error: "Not Found",
                 message: "The requested resource was not found."
            })
        }   
        return res.status(404).render("not-found", {
            error: "Not Found",
            message: "The requested resource was not found."
        });
        next();
}
}
export default NotFound;
