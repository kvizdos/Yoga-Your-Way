var SettingsHandler = function() {
    this.setup = () => {
        console.log("Setting Settings LS");
        localStorage.setItem('settings', '[{"voice": "male"}]')
    },
    this.setSetting = (setting, val) => {
        let current = JSON.parse(localStorage.getItem('settings')) !== null ? JSON.parse(localStorage.getItem('settings')) : [];
        
        if(this.getSetting(setting).length == 0) {
            current.push({[setting]: val});
        } else {
            for(s of current) {
                let a = Object.keys(s)[0];
                if(a == setting) s[setting] = val;
            }
        }

        localStorage.setItem('settings', JSON.stringify(current));
    },
    this.getSetting = (setting = "ALL") => {
        let current = JSON.parse(localStorage.getItem('settings')) !== null ? JSON.parse(localStorage.getItem('settings')) : [];
        
        let found = current.filter((s) => {
            return Object.keys(s)[0] == setting;
        });
        if(found.length > 0) found = found[0][setting];

        return setting == "ALL" ? current : found;
    }
}