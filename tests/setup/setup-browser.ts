// Add global configs for component and integration tests later.
//* references below are currently correct https://vitest.dev/guide/browser/#typescript

/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />
/// <reference types="jest-axe" />

import { toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';

expect.extend(toHaveNoViolations);
