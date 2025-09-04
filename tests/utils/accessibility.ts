import type { Locator } from '@vitest/browser/context';
import type { JestAxeConfigureOptions } from 'jest-axe';
import { axe } from 'jest-axe';
import { expect } from 'vitest';

/**
 * Tests accessibility of a DOM element using axe-core through jest-axe
 *
 * @param target - Locator for the target element to be checked for a11y violations
 * @param options - Optional axe configuration for customizing the accessibility check
 * @param message - Optional custom error message to display if violations are found
 * @returns Promise resolving to axe results containing accessibility test data
 *
 * @example
 * ```typescript
 * // Basic usage with Locator
 * await expectAccessible(target);
 *
 * // With WCAG 2.0 AA only
 * await expectAccessible(target, {
 *   runOnly: { type: 'tag', values: ['wcag2aa'] }
 * });
 *
 * // With custom message
 * await expectAccessible(target, undefined, 'Modal accessibility check');
 * ```
 */
export async function expectAccessible(target: Locator, options?: JestAxeConfigureOptions, message?: string) {
  const container = target.element();
  const results = await axe(container, options);
  expect(results, message).toHaveNoViolations();
  return results;
}
