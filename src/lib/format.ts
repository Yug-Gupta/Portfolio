/**
 * "AWS (EC2, S3, …)" reads better as "AWS" in scannable lists and
 * terminal output. The full name stays available via the `title` attr
 * in the skills matrix.
 */
export function shortSkillName(name: string): string {
  return name.split(' (')[0];
}
