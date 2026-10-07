import * as migration_20261005_092116_initial from './20261005_092116_initial';
import * as migration_20261007_171832_services_block from './20261007_171832_services_block';

export const migrations = [
  {
    up: migration_20261005_092116_initial.up,
    down: migration_20261005_092116_initial.down,
    name: '20261005_092116_initial',
  },
  {
    up: migration_20261007_171832_services_block.up,
    down: migration_20261007_171832_services_block.down,
    name: '20261007_171832_services_block'
  },
];
