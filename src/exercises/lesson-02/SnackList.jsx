function SnackList() {
  const snacks = [
    { name: 'Salami', rank: 5 },
    { name: 'Grapes', rank: 4 },
    { name: 'Cheese', rank: 3 },
    { name: 'Nuts', rank: 2 },
    { name: 'Apple', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.name}>{snack.name}</li>
      ))}
    </ol>
  );
}

export default SnackList;
