# Testing Strategy

This project uses 4-layer testing architecture (unit, component, integration, e2e). Each layer serves a specific purpose.

## File Structure Convention

Tests follow the same directory structure as the source code they test:

```text
src/
├── App.tsx
└── utils/
    └── counter.ts

tests/
├── unit/
│   └── utils/
│       └── counter.test.ts          # Tests src/utils/counter.ts
├── component/
│   └── App.test.tsx                 # Tests src/App.tsx
├── integration/
│   └── App.test.tsx                 # Tests src/App.tsx workflows
└── e2e/
    └── app.spec.ts                  # Tests complete app flows
```

**Naming convention**: 
- `.test.ts/.test.tsx` suffix for Vitest tests (unit, component, integration)
- `.spec.ts` suffix for Playwright E2E tests

**Structure Mirroring Rule**: For every source file `src/path/to/file.ts`, tests are located at `tests/{layer}/path/to/file.test.ts`

### 1. Unit Tests
| **Purpose**: Test individual functions and logic in isolation |
|---------------------------------------------------------------|
| **Environment**: Node.js (no browser or DOM elements)         |
| **Location**: `tests/unit/`                                   |
| **Run with**: `pnpm run test:unit`                            |

Unit tests are the foundation of the testing pyramid. They focus on testing pure functions, utilities, and business logic without any external dependencies or UI rendering. These tests are very fast, reliable, and help catch logic errors early.

**What to test here**:
- Utility functions
- Data transformation logic
- Business rules
- Helper functions

**Example**:
```typescript
// tests/unit/utils/counter.test.ts
import { describe, expect, test } from 'vitest';
import { formatCount, incrementCounter } from '../../../src/utils/counter';

describe('incrementCounter', () => {
  test('increments by 1 by default', () => {
    expect(incrementCounter(5)).toBe(6);
  });

  test('respects default max limit of 100', () => {
    expect(incrementCounter(99)).toBe(100);
    expect(incrementCounter(100)).toBe(100);
  });
});

describe('formatCount', () => {
  test('formats singular and plural counts', () => {
    expect(formatCount(1)).toBe('1 time');
    expect(formatCount(0)).toBe('0 times');
    expect(formatCount(2)).toBe('2 times');
  });
});
```

### 2. Component Tests
| **Purpose**: Test individual React components in isolation |
|------------------------------------------------------------|
| **Environment**: Vitest Browser (Playwright provider)      |
| **Location**: `tests/component/`                           |
| **Run with**: `pnpm run test:component`                    |

Component tests verify individual component behavior, appearance, and accessibility in isolation. These tests use `screen` from `render()` which creates isolated component instances within controlled DOM fragments. This approach is faster because it only renders the specific component without full page context.

**Key difference from Integration Tests**: Uses `screen` object for isolated component testing

**What to test here**:
- Component rendering and appearance
- User interactions within a single component
- Props handling and component state changes
- Accessibility of individual components

**Example**:
```typescript
// tests/component/App.test.tsx
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';

describe('App Component', () => {
  test('should render all UI elements correctly', async () => {
    const screen = await render(<App />);
    
    await expect.element(
      screen.getByRole('heading', { name: 'Vite + React' })
    ).toBeVisible();
    
    await expect.element(
      screen.getByRole('button', { name: /count is 0/ })
    ).toBeVisible();
  });
});
```

### 3. Integration Tests
| **Purpose**: Test interactions between multiple components or systems |
|-----------------------------------------------------------------------|
| **Environment**: Vitest Browser (Playwright provider)                 |
| **Location**: `tests/integration/`                                    |
| **Run with**: `pnpm run test:integration`                             |

Integration tests verify that different parts of your application work together correctly. These tests use `page` from `@vitest/browser/context` which provides full browser page access, enabling testing of cross-component interactions and shared state.

**Key difference from Component Tests**: Uses `page` object for full page context testing

**What to test here**:
- Cross-component interactions and data flow
- Complex user workflows involving multiple components
- State management across component boundaries
- Integration between UI and business logic layers

**Example**:
```typescript
// tests/integration/App.test.tsx
import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../../src/App';

describe('App Integration Flows', () => {
  test('should maintain consistent state across interactions', async () => {
    await render(<App />);
    
    const button = page.getByRole('button', { name: /count is/i });
    
    await button.click();
    await button.click();
    await expect.element(button).toHaveTextContent('count is 2');
    
    // Verify other components still work correctly
    await expect.element(
      page.getByRole('heading', { name: 'Vite + React' })
    ).toBeVisible();
  });
});
```

### 4. End-to-End (E2E) Tests
| **Purpose**: Test complete user journeys in a real browser    |
|---------------------------------------------------------------|
| **Environment**: Real browser (headed in dev, headless in CI) |
| **Location**: `tests/e2e/`                                    |
| **Run with**: `pnpm run test:e2e`                             |

E2E tests simulate real user scenarios in a complete browser environment. They verify that the entire application works together as expected from the user's perspective, including backend interactions.

**What to test here**:
- Complete user journeys
- Critical business flows
- Cross-page navigation
- Real backend integration
- Production-like scenarios

**Example**:
```typescript
// tests/e2e/app.spec.ts
import { expect, test } from '@playwright/test';

test('should increment counter on button click', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: /count is/ });
  
  await expect(button).toHaveText('count is 0 times');
  await button.click();
  await expect(button).toHaveText('count is 1 time');
});
```

## Tooling Choices & Benefits

### Vitest
- Fast test execution via Vite's build system
- Native TypeScript support
- Excellent watch mode

### Playwright (via Vitest Browser)
- Reliable cross-browser testing
- Semantic selectors
- Auto-waiting mechanisms

### Playwright (Standalone in e2e)
- Real browser automation for E2E tests
- Network interception capabilities
- Rich debugging tools

### Jest-Axe
- Automated WCAG compliance checking
- Detailed violation reporting
- Helps build accessible applications by default

## When to Use Each Testing Approach

### Use Unit Tests When:
- Testing pure functions or utilities
- Verifying business logic
- You need maximum test speed
- Testing algorithmic correctness

### Use Component Tests When:
- Testing a single component's behavior
- Verifying component rendering
- Testing user interactions within one component
- Checking accessibility of isolated components

### Use Integration Tests When:
- Testing interactions between components
- Verifying complex workflows
- Testing state management across components
- You need real browser environment but not full app

### Use E2E Tests When:
- Testing complete user journeys
- Verifying critical business flows
- Testing with real backend services
- You need production-like environment

## Selector Best Practices

We follow a hierarchy of reliable selectors:

```typescript
// ✅ PREFERRED - Semantic and accessible
// Tests what users actually see and interact with
page.getByRole('button', { name: /count is/ })                // Button with accessible name
page.getByText('Click on the Vite logos')                     // Visible text content
page.getByLabel('Email')                                      // Form labels
page.getByPlaceholder("Your email").fill('test@email.com')    // Input placeholders
page.getByAltText('Vite logo')                                // Image alt text
page.getByTitle("Issues count").toHaveText('25 issues')       // Title attributes

// ✅ ACCEPTABLE - For specific test cases
// Use data-testid for accessibility testing or when semantic selectors impossible
page.getByTestId('app-root')                        // data-testid="app-root"

// ❌ AVOID - Brittle and implementation-specific
// These break when CSS classes or structure changes
page.locator('.css-class-name')                     // CSS class names
page.locator('div:nth-child(2) > span')             // DOM structure selectors
```

docs: Playwright locators https://playwright.dev/docs/locators

## Common Pitfalls & Troubleshooting

### 1. Tests are slow
- **Problem**: Overusing E2E tests for simple logic or component testing
- **Solution**: Move pure logic to unit tests, use component tests for UI behavior

### 2. Tests are flaky
- **Problem**: Using unreliable selectors or not properly waiting for elements
- **Solution**: Use semantic selectors (getByRole, getByText), leverage Playwright's auto-waiting mechanisms

### 3. Tests break after UI changes
- **Problem**: Using implementation-specific selectors (CSS classes, DOM structure)
- **Solution**: Use role-based and text-based selectors that reflect user experience

### 4. Accessibility issues not caught
- **Solution**: Use `getByRole` selectors and include `expectAccessible()` checks in component tests

### 5. Confusion between screen vs page context
- **Problem**: Using wrong context object (screen for integration tests or page for component tests)
- **Solution**: 
  - Component tests: Use `screen` from `render()` for isolated testing
  - Integration tests: Use `page` from context for full page testing

## Running Tests

```bash
# Run all tests
pnpm run test

# Run specific test types
pnpm run test:unit
pnpm run test:component
pnpm run test:integration
pnpm run test:e2e

# Run with coverage
pnpm run test:unit:coverage
pnpm run test:component:coverage
pnpm run test:integration:coverage

# Run in watch mode
pnpm run test:unit:watch
pnpm run test:component:watch
pnpm run test:integration:watch

# Run E2E with UI
pnpm run test:e2e:ui
```

