// TBD
import got from "got"
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs = require('fs');
var fileName = __dirname + "/parse.html";

const cssRootClass = "ZINbbc xpd O9g5cc uUPGi"
const cssMainRefClass = "kCrYT"
const cssTitleClass = "BNeawe vvjwJb AP7Wnd"


const parseAndSearch = async (searchString, site="", dateRange="", page ) => {


    const googleUrl = `https://www.google.com/search?q=${searchString}${dateRange ? `+daterange%3A${dateRange}` : ""}${site ? `+site%3A${site}` : ""}&start=${page}`
    const response = await got(googleUrl)
    const stream = fs.createWriteStream(fileName);

    stream.once("open", () => {
      stream.end(response.body)
    })

       let parser_result = []

       const dom = new JSDOM(response.body)
       const nodeArray = Array.from(dom.window.document.getElementsByClassName(cssRootClass))
       nodeArray.forEach( (a:HTMLDivElement) => {
         const children = Array.from(a.getElementsByClassName(cssMainRefClass))

         if (children[0] && children[1] && children[0].querySelector("a") && children[0].querySelector("a").href) {
              let parse_obj = {}
              let url = decodeURI(decodeURI(children[0].querySelector("a").href))
              
              if (!url) return 

              let str = url.match(/http(.+)/i)[0]
              
              parse_obj["url"] =  str.substring(0, str.indexOf('&sa') + '&sa'.length).slice(0, -3);
              parse_obj["title"] = children[0].getElementsByClassName(cssTitleClass)[0].textContent
              parse_obj["description"] = children[1].textContent
                
              parser_result.push(parse_obj)
           }
         }
       )
       return parser_result
}

export default parseAndSearch