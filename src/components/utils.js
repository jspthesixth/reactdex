export const getPokemonStats = stats => {
  let hp, attack, defense, specialAttack, specialDefense, speed;
  stats.forEach(item => {
    switch (item.stat.name) {
      case 'hp':
        hp = item.base_stat;
        break;
      case 'attack':
        attack = item.base_stat;
        break;
      case 'defense':
        defense = item.base_stat;
        break;
      case 'special-attack':
        specialAttack = item.base_stat;
        break;
      case 'special-defense':
        specialDefense = item.base_stat;
        break;
      case 'speed':
        speed = item.base_stat;
        break;
      default:
        return null;
    }
  });

  return { hp, attack, defense, specialAttack, specialDefense, speed };
};
