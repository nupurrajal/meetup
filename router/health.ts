import express from 'express';

const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
    const response = {
        "status": "Running"
    };
    res.send(response);
})

export default healthRouter;