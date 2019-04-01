var loadInfo = document.createElement('script');
loadInfo.src = "./assets/info.js";
loadInfo.id = "loadingInfoRemove";
document.querySelector('head').appendChild(loadInfo);

window.onload = () => {
    let loadingScreenContainer = document.createElement('div');
    let loadingScreen = document.createElement('div');
    loadingScreen.style.display = "flex";
    loadingScreen.style.width = "100vw";
    loadingScreen.style.height = "100vh";
    loadingScreen.style.justifyContent = "center";
    loadingScreen.style.alignContent = "center";
    loadingScreen.style.alignItems = "center";
    loadingScreen.style.backgroundColor = "#F69F0C";
    loadingScreen.style.zIndex = "999";

    loadingScreen.id = "loadingScreen";

    let loadingScreenMsg = document.createElement('h2');
    loadingScreenMsg.textContent = "Loading..";

    loadingScreen.appendChild(loadingScreenMsg);

    loadingScreenContainer.id = "loadingScreenContainer";
    loadingScreenContainer.style.display = "absolute";
    loadingScreenContainer.style.width = "100vw";
    loadingScreenContainer.style.height = "100vh";
    loadingScreenContainer.style.backgroundColor = "#F69F0C";
    loadingScreenContainer.style.zIndex = "999";

    loadingScreenContainer.appendChild(loadingScreen);

    document.getElementsByTagName('body')[0].appendChild(loadingScreenContainer);
    // document.getElementsByTagName('body')[0].append(`
    //     <div id="loadingScreen">
    //         <h2>Loading..</h2>
    //     </div>
    // `)

    document.title = info['title'];
    var scripts = info['scripts'];
    var css = info['css'];
    var meta = info['meta'];


    for(m in meta) {
        // <meta name="description" content="">        
        let newMeta = document.createElement('meta');
        newMeta.name = meta[m].name;
        newMeta.content = meta[m].content;
        document.querySelector('head').appendChild(newMeta);
    }

    for(style in css) {
        // rel="stylesheet" href="assets/css/main.css";
        let newCSS = document.createElement('link');
        newCSS.rel = "stylesheet";
        newCSS.href = css[style];
        document.querySelector('head').appendChild(newCSS);
    }

    for(script in scripts) {
        let newScript = document.createElement('script');
        newScript.src = scripts[script];

        console.log(newScript.src);
        if(newScript.src.indexOf("assets/js/main.js") >= 0) {
            newScript.onload = () => {
                Load();

                setTimeout(function() {
                    _Navbar.render();
                    $('#loadingScreenContainer').remove()
                    $("#mainHandler").remove();
                    $("#loadingInfoRemove").remove();
                }, 1000)

            }
        }

        document.querySelector('head').appendChild(newScript);
    }

}