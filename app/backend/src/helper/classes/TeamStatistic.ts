import { ITeamStatistic } from '../../Interfaces';

export default class TeamStatistic {
  public name: string;

  public totalPoints: number;

  public totalGames: number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor(teamName: string, teamStatistic: ITeamStatistic[]) {
    this.name = teamName;
    this.totalPoints = TeamStatistic.getPoints(teamStatistic);
    this.totalGames = teamStatistic.length;
    this.totalVictories = TeamStatistic.getVictories(teamStatistic);
    this.totalDraws = TeamStatistic.getDraws(teamStatistic);
    this.totalLosses = TeamStatistic.getLosses(teamStatistic);
    this.goalsFavor = TeamStatistic.getGoalsFavor(teamStatistic);
    this.goalsOwn = TeamStatistic.getGoalsOwn(teamStatistic);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = TeamStatistic.getEfficiency(this.totalPoints, this.totalGames);
  }

  private static getPoints(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((points, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) return points + 3;
      if (goalsFavor === goalsOwn) return points + 1;
      return points;
    }, 0);
  }

  private static getVictories(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((victories, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) return victories + 1;
      return victories;
    }, 0);
  }

  private static getDraws(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((draws, { goalsFavor, goalsOwn }) => {
      if (goalsFavor === goalsOwn) return draws + 1;
      return draws;
    }, 0);
  }

  private static getLosses(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((losses, { goalsFavor, goalsOwn }) => {
      if (goalsFavor < goalsOwn) return losses + 1;
      return losses;
    }, 0);
  }

  private static getGoalsFavor(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((acc, { goalsFavor }) => acc + goalsFavor, 0);
  }

  private static getGoalsOwn(teamStatistic: ITeamStatistic[]): number {
    return teamStatistic.reduce((acc, { goalsOwn }) => acc + goalsOwn, 0);
  }

  private static getEfficiency(P: number, J: number): number {
    return Number(((P * 100) / (J * 3)).toFixed(2)) || 0;
  }
}
