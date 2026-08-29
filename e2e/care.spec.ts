import { expect, test } from "@playwright/test";

test("claiming groceries then opens fairness", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "KinKeep" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alessandro Alghisi");
  await page.getByTestId("claim-groceries").click();
  await page.getByTestId("nav-fair").click();
  await expect(page.getByTestId("fair-alessandro")).toContainText("2");
});
