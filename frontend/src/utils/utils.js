export default {
  getListWithKey: (list = []) =>
    list.map((item, idx) => {
      if (!item.key) {
        item.key = idx;
      }
      return item;
    }),
};
