import type { JestAxeConfigureOptions } from 'jest-axe';
import { axe } from 'jest-axe';
import { expect } from 'vitest';

/**
 * Tests accessibility of a DOM element using axe-core through jest-axe
 *
 * @param container - HTML element to test for accessibility violations
 * @param options - Axe configuration options for customizing the accessibility check
 * @param message - Custom error message to display if violations are found
 * @returns Promise resolving to axe results containing accessibility test data
 *
 * @example
 * ```typescript
 * // Basic usage
 * await expectAccessible(container);
 *
 * // With WCAG 2.0 AA only
 * await expectAccessible(container, {
 *   runOnly: { type: 'tag', values: ['wcag2aa'] }
 * });
 *
 * // With custom message
 * await expectAccessible(container, undefined, 'Modal accessibility check');
 * ```
 */
export async function expectAccessible(
  container: HTMLElement,
  options?: JestAxeConfigureOptions,
  message?: string,
) {
  const results = await axe(container, options);
  expect(results, message).toHaveNoViolations();
  return results;
}
