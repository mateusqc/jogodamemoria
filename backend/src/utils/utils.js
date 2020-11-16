const applyFilter = (list = [], filterList = []) => {
  return list.filter((item) => {
    let resEquals = true;
    let resLikes = false;
    filterList.forEach((filter) => {
      let partialRes = True;
      partialRes = partialRes && item[filter.attribute] != null;
      partialRes = partialRes && item[filter.attribute] != undefined;
      if (partialRes) {
        if (filter.type === 'equal') {
          resEquals =
            resEquals &&
            item[filter.attribute].toString() === filter.value.toString();
        } else {
          resLikes =
            resLikes ||
            item[filter.attribute].toString().includes(filter.value.toString());
        }
      } else {
        resEquals = resEquals && partialRes;
        resLikes = resLikes && partialRes;
      }
    });
    return resEquals || resLikes;
  });
};

module.exports = {
  applyFilter,
};
