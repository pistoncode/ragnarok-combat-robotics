/**
 * Utility function to merge class names
 * Filters out falsy values and joins with space
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date string into a readable format
 * @param dateString - ISO date string (e.g., "2024-03-15")
 * @param format - 'short' (Mar 15, 2024) or 'long' (March 15, 2024)
 * @returns Formatted date string
 */
export function formatDate(dateString: string, format: 'short' | 'long' = 'long'): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

/**
 * Calculate win percentage
 * @param wins - Number of wins
 * @param losses - Number of losses
 * @returns Win percentage as a string with one decimal place
 */
export function calculateWinPercentage(wins: number, losses: number): string {
  const total = wins + losses;
  if (total === 0) return '0.0';

  const percentage = (wins / total) * 100;
  return percentage.toFixed(1);
}

/**
 * Generate a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add if truncated (default: '...')
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Get robot by slug
 * @param slug - Robot slug
 * @param robots - Array of robots
 * @returns Robot object or undefined
 */
export function getRobotBySlug<T extends { slug: string }>(slug: string, items: T[]): T | undefined {
  return items.find(item => item.slug === slug);
}

/**
 * Sort items by date (newest first)
 * @param items - Array of items with date property
 * @returns Sorted array
 */
export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
