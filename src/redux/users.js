const users = [
    {
      username: 'admin1',
      role: 'admin',
      managedEmployees: ['employee1', 'employee2'],
      seniors: [], // admin1 no seniors
    },
    {
      username: 'admin2',
      role: 'admin',
      managedEmployees: [],
      seniors: ['admin1'], // admin2' senior  admin1
    },
    {
      username: 'employee1',
      role: 'employee',
      managedEmployees: [],
      seniors: ['admin1'], // employee1 senior admin1
    },
    {
      username: 'employee2',
      role: 'employee',
      managedEmployees: [],
      seniors: ['admin2'], // employee2 senior  admin2
    },
    
  ];
  
  export default users;
  