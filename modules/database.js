const Sequelize = require('sequelize');
let db = {}

//Define connection
db.connection = new Sequelize (
    process.env.POSTGRESS_DB,
    process.env.POSTGRESS_USER, 
    process.env.POSTGRESS_PASSWORD,
    
    {
        host:'localhost',
        dialect:'postgres'
    }
)

//Model for the user table
db.Users = db.connection.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  description: Sequelize.STRING
}, {
  tableName: 'Users', // this will define the table's name
  //timestamps: false   // this will deactivate the timestamp columns
});

//Model for the house table
db.Houses = db.connection.define('House', {
  description: Sequelize.STRING,
  address: Sequelize.STRING,
  type: Sequelize.STRING,
  //owner_id: Sequelize.STRING
}, {
  tableName: 'Houses', // this will define the table's name
  //timestamps: false   // this will deactivate the timestamp columns
});

//Model for the rentals table
db.Rentals = db.connection.define('Rental', {
  description: Sequelize.STRING,
  start_date: Sequelize.STRING,
  End_date: Sequelize.STRING,
  cost: Sequelize.STRING
}, {
  tableName: 'Rentals', // this will define the table's name
  //timestamps: false   // this will deactivate the timestamp columns
});

//Table associations
db.Users.hasMany(db.Houses)
db.Houses.belongsTo(db.Users)
db.Users.hasMany(db.Rentals)
db.Rentals.belongsTo(db.Users)


db.connection
  .authenticate()
  .then( f => {
    console.log('Connection has been established successfully.');
  }, err => { 
    console.log('Unable to connect to the database:', err);
  })

//Dummy data insertion for test purposes


db.connection
  .sync({ force: true }) //Overwrite
  .then( f => {
    return Promise.all( [
        //Inserting demo users to database
        db.Users.create( {
          username: 'knorgias',
          password: 'knorgias',
          email: 'kostasnorgias@gmail.com',
          name: 'Konstantinos',
          surname: 'Norgias',
          description: 'Demo user for kostas'
        } ),
        db.Users.create( {
          username: 'nardoleon',
          password: 'nardoleon',
          email: 'leonardomocci@gmail.com',
          name: 'Leonardo',
          surname: 'Mocci',
          description: 'Demo user for leo'
        } ),
        db.Users.create( {
          username: 'kbursa',
          password: 'kbursa',
          email: 'kaanbursa@gmail.com',
          name: 'Kaan',
          surname: 'Bursa',
          description: 'Demo user for Kaan'
        } ),
        //Inserting demo houses to database
        db.Houses.create( {
          description: '70sqm beatiful apartment in the Pijp area',
          address: '404 somepijpstreet, Amsterdam ',
          type: 'flat'
        } ),
        db.Houses.create( {
          description: '12sqm cozy room in the the New West area',
          address: '404 somenewweststreet, Amsterdam ',
          type: 'room'
        } ),
        db.Houses.create( {
          description: '100sqm beatiful 2 floor house in Amstelveen',
          address: '404 somesouthstreet, Amstelveen ',
          type: 'house'
        } ),
    ])
  })
  .then( f => { console.log('Database updated successfully!') })
  //In case of any errors
  .catch( console.log.bind( console ) )

  module.exports = db;