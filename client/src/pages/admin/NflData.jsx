const data = {
    nflTeams: {
      'team-1': {id: 'team-1', name: 'Arizona Cardinals', teamAlias: 'ari', logo: 'ari2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West'},
      'team-2': {id: 'team-2', name: 'Atlanta Falcons', teamAlias: 'atl', logo: 'atl3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South'},
      'team-3': {id: 'team-3', name: 'Baltimore Ravens', teamAlias: 'bal', logo: 'bal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North'},
      'team-4': {id: 'team-4', name: 'Buffalo Bills', teamAlias: 'buf', logo: 'buf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East'},
      'team-5': {id: 'team-5', name: 'Carolina Panthers', teamAlias: 'car', logo: 'car', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South'},
      'team-6': {id: 'team-6', name: 'Chicago Bears', teamAlias: 'chi', logo: 'chi2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North'},
      'team-7': {id: 'team-7', name: 'Cincinnati Bengals', teamAlias: 'cin', logo: 'cin', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North'},
      'team-8': {id: 'team-8', name: 'Cleveland Browns', teamAlias: 'cle', logo: 'cle3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North'},
      'team-9': {id: 'team-9', name: 'Dallas Cowboys', teamAlias: 'dal', logo: 'dal2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East'},
      'team-10': {id: 'team-10', name: 'Denver Broncos', teamAlias: 'den', logo: 'den', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West'},
      'team-11': {id: 'team-11', name: 'Detroit Lions', teamAlias: 'det', logo: 'det3', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North'},
      'team-12': {id: 'team-12', name: 'Green Bay Packers', teamAlias: 'gb', logo: 'gb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North'},
      'team-13': {id: 'team-13', name: 'Houston Texans', teamAlias: 'hou', logo: 'hou2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South'},
      'team-14': {id: 'team-14', name: 'Indianapolis Colts', teamAlias: 'ind', logo: 'ind2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South'},
      'team-15': {id: 'team-15', name: 'Jacksonville Jaguars', teamAlias: 'jac', logo: 'jac', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South'},
      'team-16': {id: 'team-16', name: 'Kansas City Chiefs', teamAlias: 'kc', logo: 'kc', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West'},
      'team-17': {id: 'team-17', name: 'Los Angeles Chargers', teamAlias: 'lac', logo: 'lac2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West'},
      'team-18': {id: 'team-18', name: 'Los Angeles Rams', teamAlias: 'la', logo: 'la', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West'},
      'team-19': {id: 'team-19', name: 'Miami Dolphins', teamAlias: 'mia', logo: 'mia2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East'},
      'team-20': {id: 'team-20', name: 'Minnesota Vikings', teamAlias: 'min', logo: 'min2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC North'},
      'team-21': {id: 'team-21', name: 'New England Patriots', teamAlias: 'ne', logo: 'ne', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East'},
      'team-22': {id: 'team-22', name: 'New Orleans Saints', teamAlias: 'no', logo: 'no', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South'},
      'team-23': {id: 'team-23', name: 'New York Giants', teamAlias: 'nyg', logo: 'nyg', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East'},
      'team-24': {id: 'team-24', name: 'New York Jets', teamAlias: 'nyj', logo: 'nyj', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC East'},
      'team-25': {id: 'team-25', name: 'Oakland Raiders', teamAlias: 'oak', logo: 'oak', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC West'},
      'team-26': {id: 'team-26', name: 'Philadelphia Eagles', teamAlias: 'phi', logo: 'phi', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East'},
      'team-27': {id: 'team-27', name: 'Pittsburgh Steelers', teamAlias: 'pit', logo: 'pit', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC North'},
      'team-28': {id: 'team-28', name: 'Seattle Seahawks', teamAlias: 'sea', logo: 'sea', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West'},
      'team-29': {id: 'team-29', name: 'San Francisco 49ers', teamAlias: 'sf', logo: 'sf', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC West'},
      'team-30': {id: 'team-30', name: 'Tampa Bay Buccaneers', teamAlias: 'tb', logo: 'tb', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC South'},
      'team-31': {id: 'team-31', name: 'Tennessee Titans', teamAlias: 'ten', logo: 'ten', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'AFC South'},
      'team-32': {id: 'team-32', name: 'Washington Redskins', teamAlias: 'was', logo: 'was2', status: 'secondary', valueWeek: 0, value: 0, tier: 0, homeGames: [], awayGames: [], division: 'NFC East'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: "Heroes",
        teamIds: ['team-1','team-2','team-3','team-4','team-5','team-6','team-7','team-8','team-9','team-10','team-11','team-12','team-13','team-14','team-15','team-16','team-17','team-18','team-19','team-20','team-21','team-22','team-23','team-24','team-25','team-26','team-27', 'team-28','team-29','team-30','team-31','team-32']
      },
      'column-2': {
        id: 'column-2',
        title: 'Tier 1',
        teamIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Tier 2',
        teamIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'Tier 3',
        teamIds: [],
      },
      'column-5': {
        id: 'column-5',
        title: 'Tier 4',
        teamIds: [],
      },
      'column-6': {
        id: 'column-6',
        title: 'Tier 5',
        teamIds: [],
      },
      'column-7': {
        id: 'column-7',
        title: 'Tier 6',
        teamIds: [],
      }
    },
    columnsort: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7'],
  }
  export default data;