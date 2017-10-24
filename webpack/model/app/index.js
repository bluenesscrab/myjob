let [a,b,c] = ['aa','bb','cc'];
let jsons = {
  a,b,c
};
{
  console.log('a');
}

import Config from './config';
Config.str();
import {str} from './b';
str('options_');


console.log(`${a},${b},${c}`)