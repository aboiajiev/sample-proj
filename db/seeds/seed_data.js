module.exports = async function seedData(knex) {
  // Delete existing data
  await knex('TimeLog').del();
  await knex('User').del();
  await knex('Project').del();

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min, max, precision) {
    const factor = 1 / precision;
    return Math.round((Math.random() * (max - min) + min) * factor) / factor;
  }

  function getRandomDate(pastYears = 1) {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setFullYear(today.getFullYear() - pastYears);
    return new Date(pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime()));
  }

  // Seed Users
  const users = [];
  const firstNames = [
    'John',
    'Gringo',
    'Mark',
    'Lisa',
    'Maria',
    'Sonya',
    'Philip',
    'Jose',
    'Lorenzo',
    'George',
    'Justin',
  ];
  const lastNames = [
    'Johnson',
    'Lamas',
    'Jackson',
    'Brown',
    'Mason',
    'Rodriguez',
    'Roberts',
    'Thomas',
    'Rose',
    'McDonalds',
  ];
  const domains = ['hotmail.com', 'gmail.com', 'live.com'];

  for (let i = 0; i < 100; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(domains)}`;

    users.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  }

  await knex.batchInsert('User', users, 50);

  // Seed Projects
  const projects = [{ name: 'My own' }, { name: 'Free Time' }, { name: 'Work' }];
  await knex.batchInsert('Project', projects, 50);

  // Fetch inserted User & Project IDs
  const userIds = await knex('User').pluck('idUser');
  const projectIds = await knex('Project').pluck('idProject');

  // Create time logs ensuring every user does not work more than 8 hours a day
  const timeLogs = [];

  for (const userId of userIds) {
    const numDays = getRandomNumber(5, 30);

    for (let day = 0; day < numDays; day++) {
      const workDate = getRandomDate();
      let totalHoursForDay = 0;

      while (totalHoursForDay < 8) {
        const remainingHours = 8 - totalHoursForDay;
        const logHours = getRandomFloat(0.25, Math.min(8, remainingHours), 0.25);

        timeLogs.push({
          user_id: userId,
          project_id: getRandomElement(projectIds),
          date: workDate,
          hours: logHours,
        });

        totalHoursForDay += logHours;
      }
    }
  }

  // Insert in chunks to avoid performance issues and mssql limitations
  const chunkSize = 500;
  for (let i = 0; i < timeLogs.length; i += chunkSize) {
    await knex.batchInsert('TimeLog', timeLogs.slice(i, i + chunkSize), chunkSize);
  }
};
