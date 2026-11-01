import * as migration_20261005_092116_initial from './20261005_092116_initial';
import * as migration_20261007_171832_services_block from './20261007_171832_services_block';
import * as migration_20261023_171843_brand_name from './20261023_171843_brand_name';
import * as migration_20261023_175720_founder_block from './20261023_175720_founder_block';
import * as migration_20261023_183523_hero_highlight from './20261023_183523_hero_highlight';
import * as migration_20261023_191753_header_hidden from './20261023_191753_header_hidden';
import * as migration_20261025_085820_footer_offices from './20261025_085820_footer_offices';
import * as migration_20261025_151453_service_cards from './20261025_151453_service_cards';
import * as migration_20261025_154052_services_show_image from './20261025_154052_services_show_image';
import * as migration_20261026_180935_card_accent_navy from './20261026_180935_card_accent_navy';
import * as migration_20261026_195810_logo_carousel from './20261026_195810_logo_carousel';
import * as migration_20261026_201447_block_hidden_carousel_subtitle from './20261026_201447_block_hidden_carousel_subtitle';
import * as migration_20261026_203946_destinations_block from './20261026_203946_destinations_block';
import * as migration_20261029_182842_student_login from './20261029_182842_student_login';
import * as migration_20261029_200730_student_destination from './20261029_200730_student_destination';
import * as migration_20261029_201919_destination_pakistan from './20261029_201919_destination_pakistan';
import * as migration_20261029_203343_student_study_level from './20261029_203343_student_study_level';
import * as migration_20261029_205108_student_study_area from './20261029_205108_student_study_area';
import * as migration_20261029_210825_student_city from './20261029_210825_student_city';
import * as migration_20261030_201520_student_office_staff from './20261030_201520_student_office_staff';

export const migrations = [
  {
    up: migration_20261005_092116_initial.up,
    down: migration_20261005_092116_initial.down,
    name: '20261005_092116_initial',
  },
  {
    up: migration_20261007_171832_services_block.up,
    down: migration_20261007_171832_services_block.down,
    name: '20261007_171832_services_block',
  },
  {
    up: migration_20261023_171843_brand_name.up,
    down: migration_20261023_171843_brand_name.down,
    name: '20261023_171843_brand_name',
  },
  {
    up: migration_20261023_175720_founder_block.up,
    down: migration_20261023_175720_founder_block.down,
    name: '20261023_175720_founder_block',
  },
  {
    up: migration_20261023_183523_hero_highlight.up,
    down: migration_20261023_183523_hero_highlight.down,
    name: '20261023_183523_hero_highlight',
  },
  {
    up: migration_20261023_191753_header_hidden.up,
    down: migration_20261023_191753_header_hidden.down,
    name: '20261023_191753_header_hidden',
  },
  {
    up: migration_20261025_085820_footer_offices.up,
    down: migration_20261025_085820_footer_offices.down,
    name: '20261025_085820_footer_offices',
  },
  {
    up: migration_20261025_151453_service_cards.up,
    down: migration_20261025_151453_service_cards.down,
    name: '20261025_151453_service_cards',
  },
  {
    up: migration_20261025_154052_services_show_image.up,
    down: migration_20261025_154052_services_show_image.down,
    name: '20261025_154052_services_show_image',
  },
  {
    up: migration_20261026_180935_card_accent_navy.up,
    down: migration_20261026_180935_card_accent_navy.down,
    name: '20261026_180935_card_accent_navy',
  },
  {
    up: migration_20261026_195810_logo_carousel.up,
    down: migration_20261026_195810_logo_carousel.down,
    name: '20261026_195810_logo_carousel',
  },
  {
    up: migration_20261026_201447_block_hidden_carousel_subtitle.up,
    down: migration_20261026_201447_block_hidden_carousel_subtitle.down,
    name: '20261026_201447_block_hidden_carousel_subtitle',
  },
  {
    up: migration_20261026_203946_destinations_block.up,
    down: migration_20261026_203946_destinations_block.down,
    name: '20261026_203946_destinations_block',
  },
  {
    up: migration_20261029_182842_student_login.up,
    down: migration_20261029_182842_student_login.down,
    name: '20261029_182842_student_login',
  },
  {
    up: migration_20261029_200730_student_destination.up,
    down: migration_20261029_200730_student_destination.down,
    name: '20261029_200730_student_destination',
  },
  {
    up: migration_20261029_201919_destination_pakistan.up,
    down: migration_20261029_201919_destination_pakistan.down,
    name: '20261029_201919_destination_pakistan',
  },
  {
    up: migration_20261029_203343_student_study_level.up,
    down: migration_20261029_203343_student_study_level.down,
    name: '20261029_203343_student_study_level',
  },
  {
    up: migration_20261029_205108_student_study_area.up,
    down: migration_20261029_205108_student_study_area.down,
    name: '20261029_205108_student_study_area',
  },
  {
    up: migration_20261029_210825_student_city.up,
    down: migration_20261029_210825_student_city.down,
    name: '20261029_210825_student_city',
  },
  {
    up: migration_20261030_201520_student_office_staff.up,
    down: migration_20261030_201520_student_office_staff.down,
    name: '20261030_201520_student_office_staff'
  },
];
