import { Request, Response } from 'express';
import { ServiceTeams } from '../service';

export default class ControllerTeams {
  constructor(private _ServiceTeams: ServiceTeams) {}

  public findAll = async (req: Request, res: Response) => {
    const teams = await this._ServiceTeams.findAll();

    return res.status(200).json(teams);
  };

  public findOne = async (req: Request, res: Response) => {
    const teams = await this._ServiceTeams.findOne();

    return res.status(200).json(teams);
  };
}
