const db = require("../database/db");

class DashboardModal {
  countFolderByMonth(date) {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT count(*) as CountFolder from  employes where Month(created_at) = ? and Year(created_at) = ? ";

      db.query(sql, [month, year], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new DashboardModal();
