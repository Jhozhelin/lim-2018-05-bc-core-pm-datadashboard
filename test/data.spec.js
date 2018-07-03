describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
    

      const processed = computeUsersStats(users, progress, courses);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });
    
    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    }); 

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
      
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;


    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const orderBy = "name";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].name,'adriana vizcarra paitán')
      
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const orderBy = "name";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].name,'Zurisadai Rosas Aramburú')
    
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const orderBy = "percent";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const orderBy = "percent";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.percent,100);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const orderBy = "cExercises";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.exercises.completed,0);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      const orderBy = "cExercises";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.exercises.completed,2);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje de ejercicios completados ASC', () => {
      const orderBy = "pExercises";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.exercises.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje ejercicios completados DESC', () => {
      const orderBy = "pExercises";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.exercises.percent,100);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje de quizzes completados ASC', () => {
      const orderBy = "pquizes";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje de quizzes completados DESC', () => {
      const orderBy = "pquizes";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.percent,100);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      const orderBy = "cquizes";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.completed,0);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      const orderBy = "cquizes";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.completed,3);
    });

    it('debería retornar arreglo de usuarios ordenado por suma de score en quizzes completados ASC', () => {
      const orderBy = "pquizesssum";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.scoreSum,0);
    });
    it('debería retornar arreglo de usuarios ordenado por por suma descore en quizzes completados DESC', () => {
      const orderBy = "pquizesssum";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.scoreSum,296);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      const orderBy = "pquizesavg";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.scoreAvg,0);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      const orderBy = "pquizesavg";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.quizzes.scoreAvg,80);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje de lecturas (reads) completadas ASC', () => {
      const orderBy = "pReads";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.reads.percent,0);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje de lecturas (reads) completadas DESC', () => {
      const orderBy = "pReads";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.reads.percent,100);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      const orderBy = "cReads";
      const orderDirection = "ASC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.reads.completed,0);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      const orderBy = "cReads";
      const orderDirection = "DESC";
      const result = sortUsers(users, orderBy, orderDirection);
      assert.equal(result[0].stats.reads.completed,11);
    });

  
  });

  describe('filterUsers(users, filterBy)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      
      const result = filterUsers(users, 'DEV');
      assert.equal(result[0].name, 'Devora Alexandra Miñano Vejarano');
      
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      let opt = {
        cohort: courses,
        cohortData: {
          users: users,
          progress: progress
        },
        orderBy: 'name',
        orderDirection: 'ASC',
        search: 'DEV'
      }

      const result = processCohortData(opt);

      const userFinal = {
        name: "Devora Alexandra Miñano Vejarano",
        stats: {}
      };

      assert.equal(result[0].name, userFinal.name)
    });
    it('debería retornar arreglo de usuarios para processCohortData', () => {
      let opt = {
        cohort: courses,
        cohortData: {
          users: users,
          progress: progress
        },
        orderBy: 'name',
        orderDirection: 'ASC',
        search: ''
      }

      const result = processCohortData(opt);
      assert.isArray(result, 'es array')
    });
  });
});
