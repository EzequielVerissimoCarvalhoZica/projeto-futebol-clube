import { Request, Response } from 'express';
import { ServiceMatches } from '../service';

export default class ControllerMatches {
  constructor(private _ServiceMatches: ServiceMatches) {}

  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'false' || inProgress === 'true') {
      const matches = await this._ServiceMatches.findAllFilter(inProgress);
      return res.status(200).json(matches);
    }

    const matches = await this._ServiceMatches.findAll();
    return res.status(200).json(matches);
  };
}
