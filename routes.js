const http=require('http');
const fs=require('fs');
const path=require('path');

const subject1={
    'name':'Cristian',
    'surname':'Herrera',
    'likes':'Hangout, read all genres, listen metal music',
    'leisure':'Watch movies and play videogames',
    'description':'Cristian is a guy, who enjoys to study a lot, is intelligent and introvert sometimes',
    'age':'26',
    'height':'169'
}

const subject2={
    'name':'Jose Orellana',
    'surname':'Herrera',
    'likes':'Programming, finances, video games like free-fire',
    'leisure':'Watch youtube videos, walk',
    'description':'A guy who has intellectual likes as programming and finances, has greats expectations for his future',
    'age':'33',
    'height':'170'
}

const subject3={
    'name':'Natalia Irene',
    'surname':'Torres',
    'likes':'Watch anime, Listen crossover music, make home jobs',
    'leisure':'Take photos to nature, sun , eclipses, moon and stars',
    'description':'Natalia is  an extroverted and happy girl, who has an special humor sense and is very disciplined in' +
        'her studies',
    'age':'26',
    'height':'163'
}

const subject4={
    'name':'Jose Luis',
    'surname':'Carrillo',
    'likes':'Watch MMA fights, sports',
    'leisure':'Watch thriller movies, go to beefcake with friends, play basketball',
    'description':'',
    'age':'35',
    'height':'180'
}

const myRoutes=[
    {route:'', page:'./index.html' },
    {route:'cristian', page:'./cristian.html' },
    {route:'joseD', page:'./josedaniel.html' },
    {route:'joseL', page:'./joseluis.html' },
    {route:'nat', page:'./nat.html' },
]


http.createServer((request,response)=>{
    let routing=path.basename(request.url)
    myRoutes.forEach((position,index)=>{
        if(position.route===routing){
            fs.readFile(position.page,(error,data)=>{
                let htmltext=data.toString();
                if(index>0){
                    let interpolate=htmltext.match(/[^\{\}]+(?=\})/g)
                    let name=eval(('subject'+index).name)
                    let surname=eval(('subject'+index).surname)
                    let likes=eval(('subject'+index).likes)
                    let leisure=eval(('subject'+index).leisure)
                    let description=eval(('subject'+index).description)
                    let age=eval(('subject'+index).age)
                    let height=eval(('subject'+index).height)

                    for(let i=interpolate.length-1;i<=0;i--) {
                        let value=eval(interpolate[i])
                        console.log(value)
                        htmltext=htmltext.replace("{"+interpolate[i]+"}",value)
                    }
                }
                response.write(htmltext)
            })
        }
    })
}).listen(8080);


