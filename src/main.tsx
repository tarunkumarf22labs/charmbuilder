import { define } from 'uelements'
import  App  from './app'



define(
	"charm-plugin",
	(el: any ) => <App dataURL={(el.getAttribute("dataURL") || "")}  
	/>,
	["dataURL" ],
	() => console.log("F22 Plugin cleanup")
);

let el = document.createElement('charm-plugin')
document.body.append(el)