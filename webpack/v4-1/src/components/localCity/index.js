import './localCity.css';
import html from './localCity.tpl';
import city from './city.json';

export default {
  init(){
    let cityData = city.list;
    document.write('<p>components/localCity/index.js</p>');
    console.log(html);
    
  }
}