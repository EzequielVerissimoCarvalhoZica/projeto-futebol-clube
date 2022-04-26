import { ITeam } from '../Interfaces';
import Team from '../database/models/Team';

export default class ServiceTeams {
  public findAll = async (): Promise<ITeam[]> => {
    const teams = Team.findAll();

    return teams;
  };

  public findOne = async (id: number): Promise<ITeam | null> => {
    const team = Team.findByPk(id);

    return team;
  };
}
