const db = require('../database/db')


class LoginModel {
  

  constructor (email){
     this.email = email;
  }



  checkLoginFunction (){
  const sqlQuery =  'SELECT * FROM users WHERE email = ?'
   return new Promise((resolve , reject)=>{
      db.query(sqlQuery , [this.email] , (err , res)=>{
        if(err){
            reject(err)
        }else{
            resolve(res)
        }
      })
   })



  }

}



module.exports = new LoginModel()