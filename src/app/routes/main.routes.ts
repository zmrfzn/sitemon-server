import Router, { Request, Response } from 'express';
import * as MainController from '../controllers/main.controller'
import { siteStatus } from '../models/sitedata.model';

const mainRoutes = Router();

mainRoutes.get("/", (req: Request, res:Response) => {

    // const data = await MainController.testMethod();
    const data = "test1";
    res.status(200).send(data);
});

mainRoutes.get("/healthcheck", async(req: Request, res:Response) => {

    const data :siteStatus[] = await MainController.testMethod();
   
    res.status(200).send(data);
});

export default mainRoutes;