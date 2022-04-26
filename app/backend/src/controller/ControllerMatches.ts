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

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(400)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const match = await this._ServiceMatches
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return res.status(201).json(match);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const match = await this._ServiceMatches.finishMatch(Number(id));

    if (match[0] === 1) {
      return res.status(200).json({ message: 'The referee ends the match successfully' });
    }

    return res.status(400).json({ message: 'Error in end match' });
  };
}
