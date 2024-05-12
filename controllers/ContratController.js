const {
  insertContrat,
  allContrat,
  contratByMatricule,
} = require("../models/ContratModal");

class ContratController {
  async ContratInsertController(req, res) {
    try {
      const {
        raison_sociale,
        Debut_contart,
        Fin_contrat,
        Fonction,
        Salaire,
        Type_paie,
        id_employe,
      } = req.body;

      await insertContrat(
        raison_sociale,
        Debut_contart,
        Fin_contrat,
        Fonction,
        Salaire,
        Type_paie,
        id_employe
      );
      res.json({ message: "Contrat inserted successfully" });
      //   const isExist = await contratByMatricule(id_employe);
      //   if (isExist.length > 0) {
      //     res.json({ message: "Contrat with this employe already exist" });
      //   } else {

      //   }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }

  async selectAllContrat(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
      const offset = (page - 1) * limit;
      const data = await allContrat(limit, offset);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = new ContratController();
