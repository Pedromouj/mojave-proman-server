const EmployeModel = require("../models/EmployeModel");
const authenticateToken = require("../Tools/authanticateToken");

class EmployeController {
  async fetchAllEmploye(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
      const offset = (page - 1) * limit;
      // const clt = new ClientModel()
      await authenticateToken(req, res, async () => {
        const data = await EmployeModel.AllEmployeModelFunction(limit, offset);
        res.json(data);
      });
    } catch (error) {
      console.error("Error getting Employe :", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async InsertEmployes(req, res) {
    const {
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
    } = req.body;
    try {
      await authenticateToken(req, res, async () => {
        const data = await EmployeModel.InsertEmploye(
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
        );
        res.json(data);
      });
    } catch (error) {
      console.error("Error insert Employe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async UpdateEmployes(req, res) {
    const matricule = req.params.matricule;
    const {
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
    } = req.body;
    EmployeModel.matricule = matricule;

    try {
      await authenticateToken(req, res, async () => {
        const data = await EmployeModel.UpdateEmploye(
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
        );
        res.json(data);
      });
    } catch (error) {
      console.error("Error insert Employe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async countAllFolders(req, res) {
    try {
      const data = await EmployeModel.countFoldersModal();
      res.json(data[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async searchAllEmployes(req, res) {
    try {
      const { libelle } = req.body;
      if (libelle !== "") {
        const data = await EmployeModel.SearchEmployes(libelle);
        res.json(data);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new EmployeController();
