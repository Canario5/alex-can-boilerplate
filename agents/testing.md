# Testing Agent Documentation

## Documentation References

### Core Testing Libraries
- **Vitest** (`/vitest-dev/vitest`): Core testing APIs, matchers, configuration options, and watch mode functionality
- **Playwright** (`/microsoft/playwright`): Page automation, E2E patterns, test fixtures, and advanced browser automation techniques
- **Vitest Browser React** (`/vitest-dev/vitest-browser-react`): Component rendering utilities, screen queries, and browser-based component testing
- **Jest-Axe** (`/dequelabs/axe-core`): Accessibility rules, violation types, and WCAG compliance checking (project uses jest-axe wrapper)

### Context7 Usage Examples

**Vitest Topics:**
```
/vitest-dev/vitest (topic: 'expect') - Expectation patterns, custom matchers
/vitest-dev/vitest (topic: 'assert') - Assertion best practices
/vitest-dev/vitest (topic: 'browser') - Browser mode specific testing patterns
/vitest-dev/vitest (topic: 'types') - Tests for your types
/vitest-dev/vitest (topic: 'config') - Test configuration, environment setup, and project options
```

**Playwright Topics:**
```
/microsoft/playwright (topic: 'locator') - Locator list, its strategies, element selection, and selector best practices
/microsoft/playwright (topic: 'assertions') - Page assertions, element expectations, and wait strategies
/microsoft/playwright (topic: 'navigation') - Page routing, URL handling, and cross-page workflows
/microsoft/playwright (topic: 'fixtures') - Test fixtures, page objects, and reusable test utilities
/microsoft/playwright (topic: 'debugging') - Test debugging, trace viewer, and troubleshooting techniques
```

**Vitest Browser React:**
```
/vitest-dev/vitest-browser-react - complete docs, they're quite short no need to split
```

**Jest-Axe Topics:**
```
/dequelabs/axe-core (topic: 'accessibility') - Accessibility testing fundamentals and violation detection
/dequelabs/axe-core (topic: 'rules') - Individual accessibility rules, customization, and rule sets
/dequelabs/axe-core (topic: 'configuration') - Axe configuration options, custom rules, and test setup
```

**Benefits of Using Topics:**
- **Focused Results**: Get documentation specific to your immediate testing need instead of general library overview
- **Faster Problem-Solving**: Skip irrelevant sections and jump directly to relevant patterns and examples
- **Context-Aware Help**: Receive information tailored to the specific testing scenario you're implementing
- **Reduced Cognitive Load**: Avoid information overload by focusing on one aspect of the library at a time

**Example Usage Scenarios:**
```
// When writing element selectors for E2E tests:
/microsoft/playwright (topic: 'selectors')

// When setting up accessibility checks:
/dequelabs/axe-core (topic: 'wcag')

// When testing React component interactions:
/vitest-dev/vitest-browser-react (topic: 'events')

// When debugging flaky test assertions:
/vitest-dev/vitest (topic: 'assertions')
```

## Test Placement Decision Tree

```
IS THIS PURE LOGIC OR FUNCTION?
├─ YES → UNIT TEST
└─ NO → IS THIS SINGLE COMPONENT?
   ├─ YES → COMPONENT TEST
   └─ NO → IS THIS MULTI-COMPONENT FLOW?
      ├─ YES → INTEGRATION TEST
      └─ NO → IS THIS END-TO-END USER JOURNEY?
         ├─ YES → E2E TEST
         └─ NO → REEVALUATE REQUIREMENTS
```

## Test Layer Rules

### Unit Tests
**ONLY FOR:**
- Pure functions without dependencies
- Utility functions
- Data transformation logic
- Business rules in isolation

**FORBIDDEN:**
- React component imports
- DOM APIs
- Network calls
- Browser environment

### Component Tests
**ONLY FOR:**
- Single React component behavior
- Component rendering
- Props handling
- Local state changes
- Accessibility of isolated components

**REQUIRED IMPORTS:**
```ts
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
```

**FORBIDDEN:**
- Multiple component interactions
- Cross-component state sharing
- Real backend calls
- Complex user workflows

### Integration Tests
**ONLY FOR:**
- Multi-component interactions
- Cross-component state flows
- Complex user interaction patterns
- Component + service interactions

**REQUIRED IMPORTS:**
```ts
import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
```

**FORBIDDEN:**
- Pure logic testing
- Single component behavior
- Full application workflows
- Backend service testing

### E2E Tests
**ONLY FOR:**
- Complete user journeys
- Critical business flows
- Cross-page navigation
- Test environment with seeded data; mock or route third-party calls

**REQUIRED IMPORTS:**
```ts
import { expect, test } from '@playwright/test';
```

## Accessibility Testing

All component and integration tests MUST include accessibility checks:

```ts
import { expectAccessible } from '../utils/accessibility';

// In test:
const element = screen.getByTestId('component-root');
await expectAccessible(element);
```

## Code Patterns

### Unit Test Template
```ts
import { expect, test } from 'vitest';
import { functionToTest } from '../src/path/to/module';

test('should [describe behavior]', () => {
  const result = functionToTest(input);
  expect(result).toBe(expected);
});
```


### Component Test Template
```ts
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { expectAccessible } from '../utils/accessibility';
import Component from '../../src/path/Component';

describe('Component Name', () => {
  test('should [describe behavior]', async () => {
    const screen = await render(<Component />);
    
    // GOOD: Semantic selector - tests what users actually see/interact with
    const button = screen.getByRole('button', { name: /click me/i });
    
    // AVOID: Implementation-specific selector (brittle)
    // const button = screen.locator('.css-button-class');
    
    await expect.element(button).toBeVisible();
  });

  test('is accessible', async () => {
    const screen = await render(<Component />);
    const element = screen.getByTestId('component-root');
    await expectAccessible(element);
  });
});
```


### Integration Test Template
```ts
import { page } from '@vitest/browser/context';
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import ParentComponent from '../../src/path/ParentComponent';

describe('Component Interaction Flow', () => {
  test('should [describe interaction]', async () => {
    await render(<ParentComponent />);
    
    const button = page.getByRole('button', { name: /submit/i });
    await button.click();
    
    await expect.element(
      page.getByText(/success/i)
    ).toBeVisible();
  });
});
```

### E2E Test Template
```ts
import { expect, test } from '@playwright/test';

test('should [describe user journey]', async ({ page }) => {
  await page.goto('/path');
  
  await page.getByRole('button', { name: /submit/i }).click();
  
  await expect(
    page.getByText(/confirmation/i)
  ).toBeVisible();
});
```


## Selector Hierarchy (Strict Order)

**WHY SEMANTIC SELECTORS?**
- **Accessibility**: Tests verify that assistive technologies can interact with elements
- **Stability**: Semantic selectors survive UI refactoring and styling changes
- **User-focused**: Tests reflect how real users interact with the application
- **Maintainability**: Changes to implementation don't break tests

1. `getByRole('button', { name: /text/i })` - Most accessible, reflects screen reader experience
2. `getByLabel(/label text/i)` - Tests form accessibility and labeling
3. `getByAltText('image description')` - Ensures images have proper descriptions
4. `getByText(/exact or partial text/i)` - Tests visible content users see
5. `getByTestId('unique-identifier')` - For accessibility testing and when semantic selectors impossible

**FORBIDDEN SELECTORS (Implementation-Specific):**
These selectors are brittle because they depend on implementation details rather than user behavior:

- `locator('.class-name')` - CSS classes change with styling refactors
- `locator('div:nth-child(2)')` - DOM structure changes break these selectors
- `locator('[data-custom-attr]')` - Custom attributes are implementation details
- `locator('#id')` - IDs are internal identifiers, not user-facing

**PRINCIPLE**: Avoid selectors that test "how it's built" instead of "how it behaves for users"

**Playwright Selector Documentation:**
- `/microsoft/playwright` (topic: 'selectors') - Comprehensive guide to locator strategies and best practices

## Component vs Integration Tests

**Component Tests** use `screen` from `render()` - isolated component rendering:
```ts
const screen = await render(<Component />);
const element = screen.getByRole('button');
```

**Integration Tests** use `page` from context - full browser page context:
```ts
await render(<Component />);
const element = page.getByRole('button', { name: /submit/i });
```

**Key Difference**: `screen` = isolated fragment, `page` = full document

**Test Data Principle**: Use realistic but minimal data. Test edge cases (0, null, max values) explicitly.

## Validation Checklists

### Unit Test Checklist
- [ ] No React imports
- [ ] No DOM APIs
- [ ] Pure input/output testing
- [ ] No async/await unless required

### Component Test Checklist
- [ ] Single component under test
- [ ] Uses render() from vitest-browser-react
- [ ] Semantic selectors first; test ids or stable IDs only when needed
- [ ] Accessibility verified with expectAccessible()
- [ ] Tests rendering and basic interactions

### Integration Test Checklist
- [ ] Multiple component interactions
- [ ] Uses page from @vitest/browser/context
- [ ] Tests cross-component state flows
- [ ] Complex interaction patterns
- [ ] Accessibility verified where relevant

### E2E Test Checklist
- [ ] Complete user journey
- [ ] Uses Playwright page object
- [ ] Tests critical business flows
- [ ] Realistic data scenarios
- [ ] Navigation between pages


## Common Mistake Prevention

### Incorrect vs Correct Examples

**WRONG (Unit Test with Component):**
```ts
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('should render', () => {
  render(<MyComponent />);
  // This belongs in component tests
});
```

**RIGHT (Unit Test):**
```ts
import { expect, test } from 'vitest';

test('should calculate total', () => {
  const result = calculateTotal(10, 5);
  expect(result).toBe(15);
});
```

**WRONG (Component Test with Multiple Components):**
```ts
import { render } from 'vitest-browser-react';
import UserForm from './UserForm'; // Contains multiple child components

test('should handle form submission with validation', async () => {
  const screen = await render(<UserForm />);
  
  // Testing interactions between multiple components
  await screen.getByLabel('Email').fill('invalid-email');
  await screen.getByLabel('Password').fill('123');
  await screen.getByRole('button', { name: 'Submit' }).click();
  
  // This tests cross-component interaction - belongs in integration tests
  await expect.element(screen.getByText('Email is invalid')).toBeVisible();
  await expect.element(screen.getByText('Password too short')).toBeVisible();
});
```

**RIGHT (Component Test):**
```ts
import { render } from 'vitest-browser-react';
import Button from './Button';

test('should show label and handle click', async () => {
  const screen = await render(<Button label="Click me" onClick={mockFn} />);
  
  const button = screen.getByRole('button', { name: 'Click me' });
  await expect.element(button).toBeVisible();
  
  await button.click();
  expect(mockFn).toHaveBeenCalledOnce();
});
```

## Constraints Summary

### File Structure
Tests mirror the exact directory structure of source code:
- Unit: `tests/unit/utils/helper.test.ts` → `src/utils/helper.ts`
- Component: `tests/component/Button.test.tsx` → `src/Button.tsx`
- Integration: `tests/integration/UserFlow.test.tsx` → `src/UserFlow.tsx`
- E2E: `tests/e2e/checkout.spec.ts` → Complete user journeys

**Structure Mirroring Rule**: For every source file `src/path/to/file.ts`, tests are located at `tests/{layer}/path/to/file.test.ts`

### Import Constraints
- Unit tests: vitest imports
- Component tests: vitest + vitest-browser-react
- Integration tests: vitest + vitest-browser-react + @vitest/browser/context
- E2E tests: Only @playwright/test

### Execution Commands
- Unit: `pnpm run test:unit`
- Component: `pnpm run test:component`
- Integration: `pnpm run test:integration`
- E2E: `pnpm run test:e2e`
