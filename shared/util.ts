export function cleanPagePath(path: string): string {
  let res = path;
  res = path.toLowerCase();
  res = res.replace(/\.md/, "");

  return res;
}
