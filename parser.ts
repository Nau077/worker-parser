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

const parseAndSearch = async () => {
    const googleUrl = "https://www.google.com/search?q=котопес"
    const sample = "https://www.npmjs.com/package/cheerio"
    const response = await got(googleUrl)
    const stream = fs.createWriteStream(fileName);
    stream.once("open", () => {
      stream.end(response.body)
    })

    /*
    const $ = cheerio.load(response.body)
    const $results = $('body').find(".ZINbbc.xpd.O9g5cc.uUPGi").filter()

    $results.each((i,result:any) => {
       
      //console.log(`${i}. ${result.childNodes}`)

        //console.log(result.children[0].children[0].data)
        if (i===0) {
          console.log(result)
        }
    })
        */

       let parser_result = []

       const dom = new JSDOM(response.body)
       // dom.window.document.querySelectorAll('h3').forEach((a) => {
       //   console.log(a.textContent)
       // })
       const nodeArray = Array.from(dom.window.document.getElementsByClassName("ZINbbc xpd O9g5cc uUPGi"))
       nodeArray.forEach( (a:HTMLDivElement) => {
         const children = Array.from(a.getElementsByClassName("kCrYT"))
         if (children[0] && children[1]) {
           let parse_obj = {}
   
           if (children[0].querySelector("a") && children[0].querySelector("a").href) {
             parse_obj["title"] = children[0].querySelector("a").href
             parse_obj["url"] = children[0].getElementsByClassName("BNeawe vvjwJb AP7Wnd")[0].textContent
             }
   
             // console.log(children[0].querySelector("a").href)
             // console.log(children[0].getElementsByClassName("BNeawe vvjwJb AP7Wnd")[0].textContent)
             const description = children[1].getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0] 
   
             if (children[1].querySelector("a") && description && description.textContent && description.textContent.length) { 
               parse_obj["description"] = children[1].getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0].textContent
             }
   
             parser_result.push(parse_obj)
           }
           
           // console.log(children[1].getElementsByClassName("BNeawe s3v9rd AP7Wnd")[0].textContent)
         }
       )
   
       return parser_result
    
}

export default parseAndSearch