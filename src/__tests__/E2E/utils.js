import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "./db.json");
const dbStartStatePath = path.join(__dirname, "./db-start-state.json");

const setupDb = () => {
  fs.copySync(dbStartStatePath, dbPath, { overwrite: true });
};

const teardownDb = () => {
  fs.copySync(dbStartStatePath, dbPath, { overwrite: true });
  // fs.unlinkSync(dbPath);
};

const addProject = async (project) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  project.id = uuidv4();
  db.projects.push(project);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

const addTask = async (task) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  task.id = uuidv4();
  db.tasks.push(task);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

const addTimelog = async (timelog) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  timelog.id = uuidv4();
  db.timelogs.push(timelog);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

export { setupDb, teardownDb, addProject, addTask, addTimelog };
