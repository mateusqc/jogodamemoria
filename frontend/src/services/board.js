export default {
  getRandomBoard: () =>
    fetch('http://localhost:8000/boards/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
