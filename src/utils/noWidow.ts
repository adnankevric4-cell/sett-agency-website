export function noWidow(str: string): string {
  if (!str) return str ?? '';
  const i = str.lastIndexOf(' ');
  if (i === -1) return str;
  return str.slice(0, i) + ' ' + str.slice(i + 1);
}
