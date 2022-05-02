import { Request, Response } from 'express';
import { ServiceMatches } from '../service';

export default class ControllerMatches {
  public findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'false' || inProgress === 'true') {
      const matches = await ServiceMatches.findAllFilter(inProgress);
      return res.status(200).json(matches);
    }

    const matches = await ServiceMatches.findAll();
    return res.status(200).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const match = await ServiceMatches
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    if (!match) return res.status(404).json({ message: 'There is no team with such id!' });

    return res.status(201).json(match);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const match = await ServiceMatches.finishMatch(Number(id));

    if (match) {
      return res.status(200).json({ message: 'The referee ends the match successfully' });
    }

    return res.status(400).json({ message: 'Error in end match' });
  };

  public update = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const match = await ServiceMatches
      .update(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    if (match) {
      return res.status(200).json({ message: 'Match updated' });
    }
    return res.status(400).json({ message: 'Error in update match' });
  };
}
