const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const EmployeController = require("./controllers/EmployeController");
const LoginController = require("./controllers/LoginController");
const TranslationController = require("./controllers/TranslationController");
const { CountparMoisController } = require("./controllers/DashboardController");
const {
  ContratInsertController,
  selectAllContrat,
} = require("./controllers/ContratController");
app.use(cors());
app.use(express.json());
const PORT = process.env.NODE_DB_PORT || 5000;

app.post("/api/login", LoginController.checkLoginBymail);
app.get("/all/employes", EmployeController.fetchAllEmploye);
app.get("/all/contrat", selectAllContrat);
app.post("/create/employes", EmployeController.InsertEmployes);
app.post("/employes/search", EmployeController.searchAllEmployes);
app.post("/create/contrat", ContratInsertController);
app.put("/update/employes/:matricule", EmployeController.UpdateEmployes);
app.get(
  "/locales/:lang/translation",
  TranslationController.getRequestController
);
app.get("/count/folders", EmployeController.countAllFolders);
app.put("/count/foldersByMonth", CountparMoisController);

app.listen(PORT, () => {
  console.log(`server runing in  ${PORT}`);
});
