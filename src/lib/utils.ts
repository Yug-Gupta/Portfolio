/**
 * Lightweight class-name concatenation utility.
 *
 * Joins class names while filtering out falsy values.
 * For projects without clsx/tailwind-merge, this is a minimal drop-in.
 */
export function cn(
  ...inputs: (string | false | null | undefined | 0)[]
): string {
  return inputs.filter(Boolean).join(' ');
}
