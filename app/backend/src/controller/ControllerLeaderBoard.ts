import { Request, Response } from 'express';
import { ServiceLeaderBoard } from '../service';

export default class ControllerLeaderBoard {
  public home = async (req: Request, res: Response) => {
    const list = await ServiceLeaderBoard.home();

    return res.status(200).json(list);
  };

  public away = async (req: Request, res: Response) => {
    const list = await ServiceLeaderBoard.away();

    return res.status(200).json(list);
  };
}
