module.exports = {
  async getMoney(connection, user) {
    const consulta = () => {
      return new Promise((resolve, reject) => {
        connection.query(`SELECT money FROM users where iduser = '${user.id}'`, (err, result) => {
          if (err) {
            return reject(err);
          }
          if(result[0] === undefined) {
            connection.query(`insert into users (iduser) values ('${user.id}');`, async err => {
              if (err) return console.log(err.stack)
              result = await this.getMoney(connection, user);
            })
          }
          return resolve(result);
        })
      })
    }
    let res;
    await consulta().then(result => {
      if(result[0] === undefined)return;
      res = result[0].money
    }).catch(err => {
      throw err;
    });
    return res
  },
  async getBankMoney(connection, user) {
    const consulta = () => {
      return new Promise((resolve, reject) => {
        connection.query(`SELECT bankmoney FROM users where iduser = '${user.id}'`, (err, result) => {
          if (err) {
            return reject(err);
          }
          if(result[0] === undefined) {
            connection.query(`insert into users (iduser) values ('${user.id}');`, async err => {
              if (err) return console.log(err.stack)
              result = await this.getBankMoney(connection, user);
            })
          }
          return resolve(result);
        })
      })
    }
    let res;
    await consulta().then(result => {
      if(result[0] === undefined)return;
      res = result[0].bankmoney
    }).catch(err => {
      throw err;
    });
    return res
  }
}