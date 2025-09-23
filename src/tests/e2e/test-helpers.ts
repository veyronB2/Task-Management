// src/tests/e2e/test-helpers.ts

import { test as base } from "@playwright/test";

base.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: `
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
    }
  ` });
});

export { base as test };
export { expect } from "@playwright/test";
