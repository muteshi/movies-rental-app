import _ from "lodash";
export function paginate(items, pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return _(items).slice(startIndex).take(itemsPerPage).value();
}
