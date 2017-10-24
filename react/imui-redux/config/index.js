import * as cConfig from './c'; 
import * as bConfig from './b'; 
import * as hConfig from './h'; 

export default function getConfig(env = 'c'){
  switch(env.toLowerCase()){
    case 'c':
      return cConfig;
    case 'b':
      return bConfig;
    case 'h':
      return hConfig;
  }
}