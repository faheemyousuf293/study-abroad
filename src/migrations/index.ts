import * as migration_20261005_092116_initial from './20261005_092116_initial';

export const migrations = [
  {
    up: migration_20261005_092116_initial.up,
    down: migration_20261005_092116_initial.down,
    name: '20261005_092116_initial'
  },
];
