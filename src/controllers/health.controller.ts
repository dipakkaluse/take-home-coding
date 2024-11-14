import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).send({
            status: 'OK',
        });
    } catch (error) {
        // Ensure error is typed properly
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Unknown error occurred',
            });
        }
    }
};
