import { test, expect } from '@playwright/test'

test.describe('Coming-soon guard', () => {
  test('QA technical-skill shows placeholder and no Writing Code link', async ({ page }) => {
    await page.goto('/qa/technical-skill')
    await expect(page.getByText(/coming soon/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /writing code/i })).not.toBeVisible()
  })

  test('Data technical-skill shows placeholder', async ({ page }) => {
    await page.goto('/data/technical-skill')
    await expect(page.getByText(/coming soon/i)).toBeVisible()
  })

  test('AI technical-skill shows placeholder', async ({ page }) => {
    await page.goto('/ai/technical-skill')
    await expect(page.getByText(/coming soon/i)).toBeVisible()
  })

  test('Dev technical-skill shows Writing Code link and no placeholder', async ({ page }) => {
    await page.goto('/dev/technical-skill')
    await expect(page.getByRole('link', { name: /writing code/i })).toBeVisible()
    await expect(page.getByText(/coming soon/i)).not.toBeVisible()
  })
})
