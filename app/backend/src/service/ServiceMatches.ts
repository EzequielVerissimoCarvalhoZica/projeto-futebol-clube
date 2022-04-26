import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../Interfaces';

export default class ServiceMatches {
  public findAll = async () => {
    const matches = await Match.findAll({
      include:
      [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  public findAllFilter = async (inProgress: 'true' | 'false') => {
    const bool = inProgress === 'true';

    const matches = await Match.findAll({
      where: { inProgress: bool },
      include:
      [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  public create = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IMatch,
  ): Promise<IMatch | null> => {
    const firtTeam = await Team.findByPk(homeTeam);
    const secondTeam = await Team.findByPk(awayTeam);

    if (!firtTeam || !secondTeam) return null;

    const match = await Match
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return match;
  };

  public finishMatch = async (id: number) => {
    const match = await Match.update(
      { inProgress: false },
      { where: { id } },
    );

    return match;
  };
}
