const db = require("../database/db");
class ContratModal {
  insertContrat(
    raison_sociale,
    Debut_contart,
    Fin_contrat,
    Fonction,
    Salaire,
    Type_paie,
    id_employe
  ) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO  contrats (raison_sociale , Debut_contart , Fin_contrat , Fonction , Salaire , Type_paie , id_employe ) VALUES(? ,? ,? , ? ,? ,? ,?)";

      db.query(
        sql,
        [
          raison_sociale,
          Debut_contart,
          Fin_contrat,
          Fonction,
          Salaire,
          Type_paie,
          id_employe,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  allContrat(limit, offset) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT contrats.*, Nom, Prenom FROM contrats INNER JOIN employes ON contrats.id_employe = employes.matricule LIMIT ${limit} OFFSET ${offset}`;
      db.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  contratByMatricule(matricule) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM contrats where id_employe  = ?";
      db.query(sql, [matricule], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = new ContratModal();
