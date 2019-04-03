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
    if(window.location.href !== "http://localhost:5500/") manifest.href = "/yogapp/manifest.json";

    let sw = document.createElement('script');
    sw.src = "../sw-register.js";

    document.getElementsByTagName('head')[0].appendChild(manifest);
    document.getElementsByTagName('body')[0].appendChild(sw);


    for(script in scripts) {
        let newScript = document.createElement('script');
        newScript.src = scripts[script];

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