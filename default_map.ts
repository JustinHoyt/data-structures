// default map behavior can be achieved with an ordinary objects and nullish syntax sugar

if (import.meta.main) {
  const arr = [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7];

  const idCounts: Record<string, number> = {};
  const idLocations: Record<string, number[]> = {};

  // Use the nullish coalescing operator for primitives
  for (const num of arr.values()) {
    idCounts[num] = (idCounts[num] ?? 0) + 1;
  }

  // Use the nullish coalescing assignment operator for objects
  for (const [i, num] of arr.entries()) {
    (idLocations[num] ??= []).push(i);
  }

  console.log(idCounts);
  console.log(idLocations);
}
