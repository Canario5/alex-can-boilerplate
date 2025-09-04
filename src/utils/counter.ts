/**
 * Increments a counter value with optional step and maximum limit
 * @param currentCount - Current counter value
 * @param step - Step to increment by (default: 1)
 * @param maxCount - Maximum allowed count (default: 100) for testing purposes
 * @returns New counter value, capped at maxCount
 */
export function incrementCounter(currentCount: number, step: number = 1, maxCount: number = 100): number {
  const newCount = currentCount + step;
  return Math.min(newCount, maxCount);
}

/**
 * Formats count display with appropriate singular/plural suffix
 * @param count - The count to format
 * @returns Formatted string with "time" or "times" suffix
 */
export function formatCount(count: number): string {
  return count === 1 ? `${count} time` : `${count} times`;
}
