const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No authorization token provided"
            });
        }


        // Expected:
        // Authorization: Bearer TOKEN

        const parts = authHeader.split(" ");

        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {
            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }


        const token = parts[1];


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Store admin information in request
        req.admin = decoded;


        // Continue to controller
        next();


    } catch (error) {

        console.error("Authentication error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};


module.exports = protect;