import {key} from './config.js'

        const app = document.getElementById('app');
        const nytkey = key();
        
        const getStories = ()=>{
            fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + nytkey)
            .then(response =>{
                if(response.ok){
                    return response.json();
                }else{
                    return Promise.reject(response);
                }                  
            }).then(data => {
                console.log(data.results);
                app.innerHTML = data.results.map(d=>{
                    // if(d.multimedia[2].url !=undefined){
                    //     const pic ="<img src" + d.multimedia[2].url + "alt=" + d.multimedia[2].url + ">";
                    // }
                    const link = "<a href='" + d.url+ "'><h2>" + d.title + "</h2></a>"
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
            }).catch(err => {
                console.log("Error logged: ", err);
            });
        }

        getStories();
	