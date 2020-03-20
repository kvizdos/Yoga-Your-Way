const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('221705133582-itv52vkrd09pq3dmngas0m4dlj2ga525.apps.googleusercontent.com');

const _DB = require('./helpers/db');

const generateSession = () => {
    const opts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*().,";
    let resp = "";
    for(var i = 0; i < 75; i++) {
        resp += opts[Math.floor(Math.random() * opts.length)]
    }

    console.log(resp);

    return resp;
}

function verify(token, session) {
    return new Promise(async (resolve, reject) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: '221705133582-itv52vkrd09pq3dmngas0m4dlj2ga525.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            const userid = payload['sub']; // this is the main authenticator, but then also make sure email matches.

            if(session == undefined) {
                console.log("Creating session")
                _DB.find("users", {uid: userid}).then(r => {
                    if(r != null) {
                        if(r['email'] == payload['email']) {
                            resolve({verified: true, name: r['name'], routines: r['routines']})
                        } else {
                            resolve({verified: false, reason: "email uid mismatch"})
                        }
                    } else {
                        _DB.insert("users", {uid: userid, email: payload['email'], name: payload['name']}).then(r => {
                            resolve({verified: true, new: true, name: payload['name'], routines: []});
                        })
                    }
                })
            } else {
                console.log("Finding session")
                _DB.find("users", {uid: userid, session: session}).then(r => {
                    if(r != null) {
                        if(r['email'] == payload['email']) {
                            resolve({verified: true, name: r['name']})
                        } else {
                            resolve({verified: false, reason: "email uid mismatch"})
                        }
                    } else {
                        resolve({verified: false, reason: "session cookie incorrect"});
                    }
                })
            }
        } catch(e) {
            resolve({verfied: false, reason: "invalid token"})
        }

    })
}

module.exports = function(app){

    app.post('/api/verify', async function(req, res){
        const token = req.body.id_token;

        verify(token, req.cookies.sid).then(r => {
            if(r.verified) {
                if(r.session != undefined) {
                    res.cookie('sid', r.session).json({verified: true, name: r['name']});
                } else {
                    res.json(r);
                }
            } else {
                res.status(401).json(r);
            }
        })
    });

    //other routes..
}