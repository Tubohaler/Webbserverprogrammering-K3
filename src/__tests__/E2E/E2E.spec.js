// @ts-check
import { test, expect } from "@playwright/test";
// import { setupMSW, getNewWorker, getNewPage } from "playwright-msw";
// import { handlers } from "../Integrationstest/Integrations.test";
import { getByText } from "@testing-library/dom";
import { setupDb, teardownDb } from "./utils";
import { exec } from "child_process";

let server;
const TESTOS = "aftonbon";

const pause = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

test.beforeAll(async () => {
  setupDb();
});

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:5173");
});

test.describe("Projects", () => {
  test("new project", async ({ page }) => {
    await page.getByRole("link", { name: "overview" }).click();
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill(TESTOS);
    await page.getByRole("button", { name: "Add Project" }).click();
    await expect(page.getByText(TESTOS)).toBeVisible();
  });

  test("delete project", async ({ page }) => {
    await page.getByRole("link", { name: "overview" }).click();
    await expect(page.getByText("rhodos")).toBeVisible();
    await page.getByRole("button", { name: "Delete" }).nth(1).click();
    await expect(page.getByText("rhodos")).not.toBeVisible();
  });
});

test.describe("Tasks", () => {
  test("new Task", async ({ page }) => {
    await page.getByRole("link", { name: "overview" }).click();
    await page.getByRole("button", { name: "Todos" }).click();
    await page.getByRole("button", { name: "Create new Todo" }).click();
    await page.locator("#todos").click();
    await page.locator("#todos").fill("tada");
    await page.getByRole("button", { name: "Create", exact: true }).click();
    await page.getByText("X").click();
    await page.getByRole("link", { name: "timer" }).click();
    await expect(page.getByText("tada")).toBeVisible();
  });

  test("delete Task", async ({ page }) => {
    await page.getByRole("link", { name: "overview" }).click();
    await page.getByRole("button", { name: "Todos" }).click();
    await page
      .getByRole("listitem")
      .filter({ hasText: "....testDelete" })
      .getByRole("button", { name: "Delete" })
      .click();
    await expect(page.getByText("test")).not.toBeVisible();
  });
});

test.describe("Timers", () => {
  test("run timer for 3 seconds", async ({ page }) => {
    await page.getByRole("button", { name: "Start" }).first().click();
    await pause(3000);
    await page.getByRole("button", { name: "Stop" }).first().click();
    await expect(page.getByText("00:00:03")).toBeVisible();
  });

  test("remove timer", async ({ page }) => {
    await expect(page.getByText("tajm")).toBeVisible();
    await page.getByRole("button", { name: "Del" }).nth(1).click();
    await expect(page.getByText("tajm")).not.toBeVisible();
  });
});

test.afterAll(async () => {
  teardownDb();
});

test.afterEach(async () => {});
