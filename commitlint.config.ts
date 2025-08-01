import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

/*?
help:
https://github.com/conventional-changelog/commitlint/#what-is-commitlint

config explained:
https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional
*/

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Error, 'always'], //* changed from warning to error; https://commitlint.js.org/reference/rules.html#body-leading-blank
    'header-max-length': [RuleConfigSeverity.Error, 'always', 100], //* increased from 72 to 100 chars to offset optional (ticket number); https://commitlint.js.org/reference/rules.html#header-max-length
  },
};

export default Configuration;
