
// idMiddleware.js
const idMiddleware = (req, res, next) => {
    try {
        const userId = 'kinjalkhunt@gmail.com';
        if (req.body.id !== userId) {
            res.send("ID is required");
            console.log("ID is present");
        }
        next();
    } catch (error) {
        console.log("Error:", error);
      
    }
};

export default idMiddleware;
