var loadInfo = document.createElement('script');
loadInfo.src = "./assets/info.js";
loadInfo.id = "loadingInfoRemove";
document.querySelector('head').appendChild(loadInfo);

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

window.onload = () => {
    let urlParams = getUrlVars();
    if(urlParams['pwa'] == undefined || urlParams['pwa'] !== 'true') {
        document.getElementsByTagName('body')[0].style.backgroundColor = "#F69F0C";
        document.getElementsByTagName('body')[0].style.textAlign = "center";
        document.getElementsByTagName('body')[0].style.display = "flex";
        document.getElementsByTagName('body')[0].style.justifyContent = "center";
        document.getElementsByTagName('body')[0].style.alignContent = "center";
        document.getElementsByTagName('body')[0].style.alignItems = "center";
        document.getElementsByTagName('body')[0].style.fontSize = "2em";
        document.getElementsByTagName('body')[0].style.color = "white";

        document.getElementsByTagName('body')[0].style.height = "100vh";

        var meta = info['meta'];
        for(m in meta) {
            let newMeta = document.createElement('meta');
            newMeta.name = meta[m].name;
            newMeta.content = meta[m].content;
            document.querySelector('head').appendChild(newMeta);
        }

        document.getElementsByTagName('body')[0].innerText = "Hello, please install the app by adding this page to your home screen!";
        return;
    }
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

    let loadingScreenBar = document.createElement('div');
    loadingScreenBar.id = "loadingScreenBar";
    loadingScreenBar.style.width = "calc(100% - 60px)";
    loadingScreenBar.style.height = "10px";
    loadingScreenBar.style.backgroundColor = "rgb(243, 139, 21)";
    loadingScreenBar.style.position = "absolute";
    loadingScreenBar.style.top = "50vh";
    loadingScreenBar.style.margin = "30px";
    loadingScreenBar.style.borderRadius = "10px";

    let loadingScreenBarPercent = document.createElement('div');
    loadingScreenBarPercent.id = "loadingScreenBarPercent";
    loadingScreenBarPercent.style.width = "calc(0% - 60px)";
    loadingScreenBarPercent.style.height = "10px";
    loadingScreenBarPercent.style.backgroundColor = "rgb(241, 185, 31)";
    loadingScreenBarPercent.style.position = "absolute";
    loadingScreenBarPercent.style.top = "50vh";
    loadingScreenBarPercent.style.margin = "30px";
    loadingScreenBarPercent.style.borderRadius = "10px";
    loadingScreenBarPercent.style.transition = "250ms";

    loadingScreenContainer.appendChild(loadingScreenBar);
    loadingScreenContainer.appendChild(loadingScreenBarPercent);

    document.getElementsByTagName('body')[0].appendChild(loadingScreenContainer);

    document.title = info['title'];
    var scripts = info['scripts'];
    var css = info['css'];
    var meta = info['meta'];


    for(m in meta) {
        let newMeta = document.createElement('meta');
        newMeta.name = meta[m].name;
        newMeta.content = meta[m].content;
        document.querySelector('head').appendChild(newMeta);
    }

    for(style in css) {
        let newCSS = document.createElement('link');
        newCSS.rel = "stylesheet";
        newCSS.href = css[style];
        document.querySelector('head').appendChild(newCSS);
    }

    // Register SW & Manifest
    let manifest = document.createElement('link');
    manifest.rel = "manifest";
    if(window.location.href == "http://localhost:5500/") manifest.href = "/manifest-dev.json";
    if(window.location.href !== "http://localhost:5500/") manifest.href = "/manifest.json";

    // let sw = document.createElement('script');
    // sw.src = "../sw-register.js";

    document.getElementsByTagName('head')[0].appendChild(manifest);
    // document.getElementsByTagName('body')[0].appendChild(sw);

    var numOfScripts = scripts.length;
    var loadedScripts = 0;

    for(script in scripts) {
        let newScript = document.createElement('script');
        newScript.src = scripts[script];

            newScript.onload = (e) => {
                loadedScripts++;
                console.log(Math.floor((loadedScripts / numOfScripts) * 100) + "% loaded ("+newScript.src+")");
                if(loadedScripts == numOfScripts) {
                    $('#loadingScreenBarPercent')[0].style.width = "calc(" + Math.floor((loadedScripts / numOfScripts) * 100) + "% - 60px)";
                    // console.log("All loaded, final script: " + newScript.src);
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