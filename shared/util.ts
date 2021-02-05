export function cleanPagePath(path: string) {
  let res = path;
  res = path.toLowerCase();
  res = res.replace(/\.md/, "");

  return res;
}
