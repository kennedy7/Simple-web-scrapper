const request = require ('request');
const cheerio = require ('cheerio')
const fs = require ('fs')
const writeStream = fs.createWriteStream('writefilehere.txt')


request('< url of the web page you want to scrap data from>', (err, response, html)=>{
    if(!err && response.statusCode == 200){
        const $ = cheerio.load(html)

      $('.container').each((i, el)=>{
        const content = $(el)
        .find('.content-hide')
        .text()
        .replace(/\s\s + /g, '')

        const link = $(el)
        .find ('a')
        .attr('href')

       //writing to csv
       writeStream.write(`${content}, ${link} \n`)
      })
      console.log('Sraped... 100%')
    }
})