// 1. Funkcja wykonująca operację asynchroniczną (dodawanie)
function asyncAdd(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
}

// 2. Funkcja dodająca dowolną ilość liczb asynchronicznie
async function addNumbersAsync(...numbers) {
  let sum = 0;

  for (const num of numbers) {
    sum = await asyncAdd(sum, num);
  }

  return sum;
}

// 3. Funkcja mierząca czas wykonania
async function measureExecutionTimeAsync(func, ...args) {
  const startTime = performance.now();
  const result = await func(...args);
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return { result, executionTime };
}

// 4. Testowanie dla zbioru danych o wielkości 100 elementów
const data = Array.from({ length: 100 }, (_, index) => index + 1);

measureExecutionTimeAsync(addNumbersAsync, ...data)
  .then(({ result, executionTime }) => {
    console.log(`Wynik dodawania: ${result}`);
    console.log(`Czas wykonania: ${executionTime} ms`);
    console.log(`Ilość operacji asynchronicznych: ${data.length}`);
  })
  .catch((error) => {
    console.error("Wystąpił błąd:", error);
  });
