import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Team from '../database/models/Team';
import User from '../database/models/User';
import { ServiceTeams, AuthService, ServiceMatches } from '../service';
import * as jwt from 'jsonwebtoken';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Services', () => {
  describe('ServiceTeams', () => {
    describe('findAll', () => {
      const serviceTeams = new ServiceTeams();
      const teamsMock = [{
        "id": 1,
        "teamName": "santos"
      }];
  
      before(async () => {
        sinon.stub(Team, "findAll").resolves(teamsMock as Team[]);
      });
  
      after(() => {
        (Team.findAll as sinon.SinonStub).restore();
      })
  
      it('findAllTeams', async () => {
        const teams = await serviceTeams.findAll()
  
        expect(teams).to.deep.eq(teamsMock);
      });
    })

    describe('findOne', () => {
      const serviceTeams = new ServiceTeams();
      const teamsMock = {
        "id": 1,
        "teamName": "santos"
      };
  
      before(async () => {
        sinon.stub(Team, "findByPk").resolves(teamsMock as Team);
      });
  
      after(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      })
  
      it('findOneTeam', async () => {
        const teams = await serviceTeams.findOne(1)
  
        expect(teams).to.deep.eq(teamsMock);
      });
    })
  })

  describe('AuthService', () => {
    const authService = new AuthService();
    const secretMock = 'super_senha';
    const userMock = {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com",
    };
    const signOptions: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
    const token = jwt.sign({ data: userMock }, secretMock, signOptions);

    describe('auth', () => {

      const responseMock = {
        "token": token,
        "user": {
          "id": 1,
          "username": "Admin",
          "role": "admin",
          "email": "admin@admin.com",
        }
      };

      it('sucess', async () => {
        const response = await authService.auth('admin@admin.com', 'secret_admin')
  
        expect(response).to.deep.eq(responseMock);
      });

      it('test wrong email', async () => {
        const response = await authService.auth('false@email.com', 'secret_admin')
  
        expect(response).to.be.null;
      });

      it('test wrong password', async () => {
        const response = await authService.auth('admin@admin.com', 'false_password')
  
        expect(response).to.be.null;
      });
    });
    describe('verify', () => {
      it('sucess', async () => {
        const response = authService.verify(token)
    
        expect(response).to.deep.eq("admin");
      });
      it('test send wrong token', async () => {
        const response = authService.verify("wrong token")
    
        expect(response).to.be.false;
      });
    });
  });

  describe('ServiceMatches', () => {
    describe('findAll', () => {
      const matchesMock = [{
        "id": 42,
        "homeTeam": 6,
        "homeTeamGoals": 3,
        "awayTeam": 1,
        "awayTeamGoals": 1,
        "inProgress": true,
        "teamHome": {
          "teamName": "Ferroviária"
        },
        "teamAway": {
          "teamName": "Avaí/Kindermann"
        }
      }];
  
      before(async () => {
        sinon.stub(Match, "findAll").resolves(matchesMock as unknown as Match[]);
      });
  
      after(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })

      it('list all matches', async() => {
        const response = await ServiceMatches.findAll();
        expect(response).to.deep.eq(matchesMock);
      });
    });
  });
});
