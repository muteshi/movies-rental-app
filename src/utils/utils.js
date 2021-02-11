import _ from "lodash";
export function paginate(items, pageNumber, itemsPerPage) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return _(items).slice(startIndex).take(itemsPerPage).value();
}

export function getVisibleMenus(menus, user) {
  return user
    ? menus.filter((menu) => menu.showToLoggedInUser === true)
    : menus.filter((menu) => menu.private === false);
}
