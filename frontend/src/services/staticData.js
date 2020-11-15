export default {
  getGameModeLevel() {
    return [
      { value: 0, label: 'Fácil' },
      { value: 1, label: 'Média' },
      { value: 2, label: 'Difícil' },
    ];
  },
  getGameModeType() {
    return [
      { value: 'o', label: 'Oficial' },
      { value: 'c', label: 'Comunidade' },
    ];
  },
};
