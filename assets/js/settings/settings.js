const _SettingsHandler = new SettingsHandler();
var SettingsPage = function(container) {
    this.render = (parent) => {
        let activeVoice = _SettingsHandler.getSetting("voice");

        let pageContainer = document.createElement('div');
            pageContainer.id = "settingsPageContent";

        let voiceHeader = document.createElement('h2');
            voiceHeader.innerText = "Select a voice:"
            voiceHeader.style.textAlign = "center";
            voiceHeader.style.margin = 0;

        let btnContainer = document.createElement('div');
            btnContainer.id = "voiceSelector";
        let btnMale = document.createElement('button');
            btnMale.className = "button maleVoice voiceBtn" + (activeVoice == "male" ? " activeVoice" : "");
            btnMale.onclick = (e) => {
                _SettingsHandler.setSetting('voice', 'male');
                $('.activeVoice').removeClass('activeVoice');
                $('.maleVoice').addClass('activeVoice');
            };
            btnMale.innerHTML = `<i class="fas fa-male"></i><br><strong>Male</strong>`;
        let btnFemale = document.createElement('button');
            btnFemale.className = "button femaleVoice voiceBtn" + (activeVoice == "female" ? " activeVoice" : "");
            btnFemale.onclick = (e) => {
                _SettingsHandler.setSetting('voice', 'female');
                $('.activeVoice').removeClass('activeVoice');
                $('.femaleVoice').addClass('activeVoice');
            };
            btnFemale.innerHTML = '<i class="fas fa-female"></i><br><strong>Female</strong>';
    
        btnContainer.appendChild(btnMale);
        btnContainer.appendChild(btnFemale);

        pageContainer.appendChild(voiceHeader);
        pageContainer.appendChild(btnContainer);

        $(parent)[0].appendChild(pageContainer);
    }
}