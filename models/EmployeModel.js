const db = require("../database/db");
const addZeroPrefix = require("./addZeroPrefix");
class EmployeModel {
  constructor(matricule, nom) {
    this.nom = nom;
    this.matricule = matricule;
  }

  AllEmployeModelFunction(limit, offset) {
    const sqlQuery = `SELECT * FROM employes LIMIT ${limit} OFFSET ${offset}`;
    return new Promise((resolve, reject) => {
      db.query(sqlQuery, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  InsertEmploye(
    CIN,
    DateExpiration,
    Nom,
    Prenom,
    Date_naissance,
    situation_familiale,
    nbr_enfant,
    Tel,
    Adresse,
    Cnss,
    Ville,
    RIB
  ) {
    var currentDate = new Date();

    // Get the full date components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Note: Month is zero-based, so add 1
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format the date components as needed
    const fullDate =
      year +
      "-" +
      addZeroPrefix(month) +
      "-" +
      addZeroPrefix(day) +
      " " +
      addZeroPrefix(hours) +
      ":" +
      addZeroPrefix(minutes) +
      ":" +
      addZeroPrefix(seconds);

    const sqlQuery =
      "INSERT INTO employes  (CIN ,DateExpiration , Nom  , Prenom , Date_naissance , situation_familiale , nbr_enfant ,  Tel , Adresse , Cnss   , Ville , RIB ,  created_at ) VALUES ( ? , ? , ? , ? , ?, ? , ? , ? , ?  ,?  , ?  , ? , ? )";
    return new Promise((resolve, reject) => {
      db.query(
        sqlQuery,
        [
          CIN,
          DateExpiration,
          Nom,
          Prenom,
          Date_naissance,
          situation_familiale,
          nbr_enfant,
          Tel,
          Adresse,
          Cnss,
          Ville,
          RIB,
          fullDate,
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

  UpdateEmploye(
    CIN,
    DateExpiration,
    Nom,
    Prenom,
    Date_naissance,
    situation_familiale,
    nbr_enfant,
    Tel,
    Adresse,
    Cnss,
    Ville,
    RIB
  ) {
    const sqlQuery =
      "UPDATE employes set  CIN = ? , DateExpiration = ? , Nom = ?  , Prenom = ? , Date_naissance = ? , situation_familiale = ? , nbr_enfant=? , Tel = ? , Adresse = ? , Cnss=? , Ville = ? , RIB = ?   WHERE  matricule = ? ";
    return new Promise((resolve, reject) => {
      db.query(
        sqlQuery,
        [
          CIN,
          DateExpiration,
          Nom,
          Prenom,
          Date_naissance,
          situation_familiale,
          nbr_enfant,
          Tel,
          Adresse,
          Cnss,
          Ville,
          RIB,
          this.matricule,
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

  countFoldersModal() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT count(*) as countDossiers From employes";
      db.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  SearchEmployes(libelle) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * From employes WHERE  matricule  = ?  OR  CIN like ?  OR  Nom like ?  OR Prenom like ? `;
      const searchTerm = `%${libelle}%`;

      db.query(
        sql,
        [libelle, searchTerm, searchTerm, searchTerm],
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
}

module.exports = new EmployeModel();
