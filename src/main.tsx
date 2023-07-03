//@ts-nocheck
import { define } from 'uelements'
import  App  from './app'
import "./app.css"


define(
	"charm-plugin",
	(el: any ) => <App dataURL={(el.getAttribute("dataURL") || "")}  
	/>,
	["dataURL" ],
	() => console.log("F22 Plugin cleanup")
);
