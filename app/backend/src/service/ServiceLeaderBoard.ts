import TeamStatistic from '../helper/classes/TeamStatistic';
import Team from '../database/models/Team';
import ServiceMatches from './ServiceMatches';
import { orderLeaderBoard } from '../helper';

export default class ServiceLeaderBoard {
  public static async home() {
    const matches = await ServiceMatches.findAllFilter('false');
    const teams = await Team.findAll();

    const leaderBoard = teams.map((team) => {
      const matchDetails = matches
        .filter(({ homeTeam }) => homeTeam === team.id)
        .map(({ homeTeamGoals, awayTeamGoals }) => ({
          goalsFavor: homeTeamGoals, goalsOwn: awayTeamGoals }));

      const teamDetail = new TeamStatistic(team.teamName, matchDetails);
      return teamDetail;
    });
    return orderLeaderBoard(leaderBoard);
  }

  public static async away() {
    const matches = await ServiceMatches.findAllFilter('false');
    const teams = await Team.findAll();

    const leaderBoard = teams.map((team) => {
      const matchDetails = matches
        .filter(({ awayTeam }) => awayTeam === team.id)
        .map(({ homeTeamGoals, awayTeamGoals }) => ({
          goalsFavor: awayTeamGoals, goalsOwn: homeTeamGoals }));

      const teamDetail = new TeamStatistic(team.teamName, matchDetails);
      return teamDetail;
    });
    return orderLeaderBoard(leaderBoard);
  }
}
