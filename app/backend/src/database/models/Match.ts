import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './Team';

export default class Match extends Model {
  id!: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  homhomeTeamGoalseTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

// Match.belongsTo(Team, {
//   foreignKey: 'id',
//   as: 'team',
// });

// Team.hasMany(Match, {
//   foreignKey: 'homeTeam' || 'awayTeam',
//   as: 'matches',
// });

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'home_team', as: 'matches' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'matches' });
