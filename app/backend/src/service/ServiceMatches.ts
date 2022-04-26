import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
}
