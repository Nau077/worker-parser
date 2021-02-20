// TBD
import got from "got"
import cheerio from 'cheerio';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs = require('fs');
var fileName = __dirname + "/parse.html";

// import { google } from "googleapis"
// const key = "AIzaSyBv4HslhbU_GTDCHv7A5Ky9OKReeU4rdWU"
// const search = google.customsearch("v1")
// search.context._options.auth = key

const parseAndSearch = async (searchString, site="") => {
    const googleUrl = `https://www.google.com/search?q=${searchString}${site ? `+site%3A${site}` : ""}`
    const sample = "https://www.npmjs.com/package/cheerio"
    const response = await got(googleUrl)
    const stream = fs.createWriteStream(fileName);
    stream.once("open", () => {
      stream.end(response.body)
    })

       let parser_result = []

       const dom = new JSDOM(response.body)
       const nodeArray = Array.from(dom.window.document.getElementsByClassName("ZINbbc xpd O9g5cc uUPGi"))
       nodeArray.forEach( (a:HTMLDivElement) => {
         const children = Array.from(a.getElementsByClassName("kCrYT"))
         if (children[0] && children[1]) {
           let parse_obj = {}
   
           if (children[0].querySelector("a") && children[0].querySelector("a").href) {
             parse_obj["url"] = children[0].querySelector("a").href
             parse_obj["title"] = children[0].getElementsByClassName("BNeawe vvjwJb AP7Wnd")[0].textContent
             }

             const description = children[1].getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0] 
   
            // if (children[1].querySelector("a") && description && description.textContent && description.textContent.length) { 
               parse_obj["description"] = children[1].textContent
            // }
   
             parser_result.push(parse_obj)
           }
           
           // console.log(children[1].getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0].textContent)
         }
       )
   
       return parser_result
    
}

export default parseAndSearch