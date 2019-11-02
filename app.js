import {key} from './config.js'

const home = document.getElementById('home');
const tech = document.getElementById('tech');
const world = document.getElementById('world');
const politics = document.getElementById('politics');

const nytkey = key();
const render=(articles, section)=>{
    section[1].innerHTML = "<h1>" + section[2] + "</h1>" + articles.map(d=>{
        const link = "<a href='" + d.url+ "'><h2>" + d.title + "</h2></a>";
        if(d.multimedia.length > 1){
            const pic = d.multimedia[2].url;
            return(
                "<div class='container' id='" + d.url + "'><div class='about'><div class='pic'><img src='" 
                + pic +
                "' ></div><div class='headline'>" + link + "<h3>" 
                + d.byline + "</h3><p>" + d.abstract + "</p></div></div></div>"
            );
        }
        return(
            "<div class='container' id='" + d.url + "'><h2>"
            + link + "</h2><h3>" + d.byline + "</h3><p>" + d.abstract + "</p></div></div>"

            );
        }).join('');
}
const list = [['home', home, "Top News"],['technology', tech, "Technology News"],['world', world, "World News"],['politics', politics, "Political News"]];
    list.forEach(s=>{
                fetch('https://api.nytimes.com/svc/topstories/v2/' + s[0] + '.json?api-key=' + nytkey)
                .then(response =>{
                    if(response.ok){
                        return response.json();
                    }else{
                        return Promise.reject(response);
                    }                  
                }).then(data => {
                    render(data.results, s);
                }).catch(err => {
                    console.log("Error logged: ", err);
                });
            });

const sectDisp = (tab)=>{
    home.style.display='none';
    tech.style.display='none';
    world.style.display='none';
    politics.style.display='none';

    tab.style.display = 'block';
}



homeBtn.addEventListener('click', event => sectDisp(home), false)
techBtn.addEventListener('click', event => sectDisp(tech), false)
worldBtn.addEventListener('click', event => sectDisp(world), false)
politicsBtn.addEventListener('click', event => sectDisp(politics), false)


sectDisp(home);

document.getElementById('homeBtn').focus();