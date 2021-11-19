const PORT = 5000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.fandango.com/movies-in-theaters'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const nowPlaying = []

        $('.browse-movielist--item', html).each(function() {
            let title = $(this).find('.poster-card--title').text()
            let releaseDate = $(this).find('.poster-card--release-date').text()
            nowPlaying.push({
                title, 
                releaseDate
            })
        })
        
        console.log(nowPlaying)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))