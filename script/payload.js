import { Utils } from "./Utils.class"
import { Storage } from './Storage.class'
import { Progress } from './Progress.class'

import { GapiMiner } from './GapiMiner.class'
import { Business } from './Business.class'
import { Network } from './Network.class'

window.DM_RUNNING=true;(function(){  
    
    var VERSION = '0-Alpha';
    var arr = {};
    var gapiMiner;
    var storage = new Storage();
    var network = new Network(`${window.location.protocol}//${window.location.hostname}/crf/rest/`);

    //GAPI vars
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    var CLIENT_ID, API_KEY, SHEET_ID;

    function handleClientLoad() {gapi.load('client:auth2', initClient);}
    function initClient() { gapi.client.init({ apiKey: API_KEY, clientId: CLIENT_ID, discoveryDocs: DISCOVERY_DOCS, scope: SCOPES }).then(function () { gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus); updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); authorizeButton.onclick = handleAuthClick; signoutButton.onclick = handleSignoutClick; }, function(error) { appendPre(JSON.stringify(error, null, 2)); }); }
    function updateSigninStatus(isSignedIn) { if (isSignedIn) { authorizeButton.style.display = 'none'; signoutButton.style.display = 'block'; startGapi(); } else { authorizeButton.style.display = 'block'; signoutButton.style.display = 'none'; } }
    function handleAuthClick(event) {gapi.auth2.getAuthInstance().signIn();}
    function handleSignoutClick(event) {gapi.auth2.getAuthInstance().signOut();}
 
    let init = () => {
       
        if(Utils.hash(window.location.hostname) != 1608297889){
            alert("Vous n'êtes pas au bon endroit pour activer ce code");   
            return;
        }

        storage.load();
        Progress.init();

        //Dom Construction
        let dom=document.createElement('div');
        dom.setAttribute('id','dataMinerWrapper');
        document.body.appendChild(dom);
        dom.innerHTML = `
        <style>
            #dmBack {position: fixed;left: 0;top: 0;background: #000;z-index: 1000;width: 100%;height: 1000%;opacity: 0.8;}
            #dmBox {position: fixed;width: 500px;height: 400px;top: calc((100% - 400px) / 2);left: calc((100% - 500px) / 2);z-index: 1000;background: #FFF;padding: 10px;}
            #dmBox a{text-decoration: underline #0330fc;font-weight: bold;}
            #dmBox input{width: 100%;background: #FFE;border: 1px dotted;margin: 2px auto;font-size: 0.9em;}
            #dmBox input.mid{width: 50%;}
            input#dmRun{margin: 10px auto;font-weight: bold;padding: 5px;line-height: 2em;font-size: 1.2em;}
            #dmBoxProgress{display:none;}
            #dmProgressT{width: 100%;height: 10px;border: 1px dotted #000;background: #967b3f;display: block;} 
            #dmProgressA{width: 0%;height: 100%;background: #5d9e3f;} 
            #dmProgressLabel{font-family: monospace;color:revert;background:revert;}
            #dmAvancementLabel{font-size: 0.8em;text-align: center;display: block;}
            #dmAvancementLabel span{font-weight: bold;}
            #dmBox label{font-size: 0.9em;display: block;margin: 5px auto 0;}
            #dmGabi{display:none;}
            #dmGoodbye{display:none;}
            #dmGoodbye h2{background:#56a63d;text-align: center;}
        </style>
        <div id="dmBack"></div>
        <div id="dmBox">
            <h1>DataMiner Payload-ed v${VERSION}</h1>
            <p>L'utilisation de ce script se fait sous votre entière responsabilité. Plus d'informations à son propos sur <a href="https://besstiolle.github.io/dataMiner/">github</a></p>
            <div id='dmBoxSetting'>
                <input id="dmSheetId" type="text" placeholder="Entrez l'id du google Sheet" value="${storage.sheetId}">
                <input id="dmGAPIClientId" type="text" placeholder="Entrez l'id de votre client google API finissant par .apps.googleusercontent.com" value="${storage.gAPIClientId}">
                <input id="dmAPIKey" type="text" placeholder="Entrez la clé de votre google API" value="${storage.aPIKey}">
                
                <label for="dmStart">Nombre de jours dans le passé (défaut = 15)</label>
                <input id="dmStart" class="mid" type="text" value="${storage.start}">
                
                <label for="dmEnd">Nombre de jours dans le futur (défaut = 30)</label>
                <input id="dmEnd" class="mid" type="text" value="${storage.end}">
                
                <label for="dmUL">Identifiant de l'UL (défaut = 474)</label>
                <input id="dmUL" class="mid" type="text" value="${storage.ul}">

                <input id="dmRun" type="button" value="Cliquez pour démarrer le minage">
            </div>

            <div id='dmGabi'>
                <button id="authorizeButton" style="display: none;">Authorize</button>
                <button id="signoutButton" style="display: none;">Sign Out</button>
                <pre id="dmContent" style="white-space: pre-wrap;"></pre>
            </div>
            
            <div id='dmBoxProgress'>
                <h2 id='dmProgressLabel'></h2>
                <div id='dmProgressT'><div id='dmProgressA'></div></div>
                <span id="dmAvancementLabel">Avancement : <span id='dmCountA'>0</span> / <span id='dmCountT'>0</span></span>
            </div>

            <div id='dmGoodbye'>
                <h2>🎈 🎁 Opération terminée avec succès 🥳 🎉</h2>
                <p>Vous pouvez retrouver vos données minées sur votre <a target='_blank' id='dmGoodbyeLink' href='#'>Google Sheet</a></p>
                <p>Vous pouvez fermer cette fenêtre en cliquant en dehors de celle ci</p>
                <p>Bonne journée 😘</p>
            </div>
        </div>
        `;

        dmRun.addEventListener("click", valideParameters);
        dmBack.addEventListener("click", closeScript);
        
        //GAPI script insert
        let script=document.createElement('script');
        script.type='text/javascript';
        script.src='https://apis.google.com/js/api.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    let valideParameters = () => {

        let start = new Date(Date.now() - dmStart.value * 24 * 60 * 60 * 1000);
        let end = new Date(Date.now() + dmEnd.value * 24 * 60 * 60 * 1000);

        storage.sheetId = dmSheetId.value;
        storage.gAPIClientId = dmGAPIClientId.value;
        storage.aPIKey = dmAPIKey.value;
        storage.start = dmStart.value;
        storage.end = dmEnd.value;
        storage.ul = dmUL.value;
        storage.save();

        SHEET_ID = dmSheetId.value;
        CLIENT_ID = dmGAPIClientId.value;
        API_KEY = dmAPIKey.value;

        gapiMiner = new GapiMiner(gapi, storage.sheetId)

        dmBoxSetting.style.display = 'none';
        dmBoxProgress.style.display = 'block';
        dmProgressA.style.width = '0%';
        dmProgressLabel.innerText=' > On sort les ⛏ et on creuse !';
        dmCountA.innerText=0;
        dmCountT.innerText=0;

        startMining(start, end, dmUL.value);        
    }

    let closeScript = () => {
        //Remove HTML
        dataMinerWrapper.parentNode.removeChild(dataMinerWrapper);

        //Remove instance var
        window.DM_RUNNING = false;

        //Remove Script balise
        var scripts = document.getElementsByTagName('script');
        scripts[scripts.length - 1].parentNode.removeChild(scripts[scripts.length - 1]);
    }

    let startMining = (start, end, ul) => {
        
        network.getJSON(`seance?debut=${Utils.formatDate(start)}&fin=${Utils.formatDate(end)}&structure=${ul}`).then(async data =>{
            arr.activite={};
            arr.seance=[];
            arr.user={};
            arr.userMCOM={}; 
            arr.userFORM={}; 
            arr.userNOMI={}; 
            arr.userCOMP={}; 
            
            let promises = [];

            let promisesActivities = [];
            let promisesSeances = [];
            let promisesUser = [];
            let promisesMCOM = [];
            let promisesFORM = [];
            let promisesNOMI = [];
            let promisesCOMP = [];

            let done = 0;

            // Stack all promises for each query Activity & Seance
            // And resolve later
            data.forEach(seance => {
                promisesActivities.push(network.getJSON(`activite/${seance.activite.id}`));
                promisesSeances.push(network.getJSON(`seance/${seance.id}/inscription`));
            });

            //Resolve Activites
            Promise.all(promisesActivities).then((resultPromise) => {
                resultPromise.forEach(activite => {
                    arr.activite[activite.id] = activite
                })
                done++;
            });

            //Resolve Seance
            Promise.all(promisesSeances).then((resultPromise) => {
                resultPromise.forEach(seance => {
                    arr.seance.push(seance);

                    seance.forEach(inscrit => {
                        //avoid useless request
                        if(arr.user.hasOwnProperty(inscrit.utilisateur.id)){
                            return;
                        }
                        arr.user[inscrit.utilisateur.id] = null;
                        
                        // Stack all promises for each user information
                        // And resolve later
                        promisesUser.push(network.getJSON(`utilisateur/${inscrit.utilisateur.id}`));
                        promisesMCOM.push(network.getJSON(`moyencomutilisateur?utilisateur=${inscrit.utilisateur.id}`));
                        promisesFORM.push(network.getJSON(`formationutilisateur?utilisateur=${inscrit.utilisateur.id}`));
                        promisesNOMI.push(network.getJSON(`nominationutilisateur?utilisateur=${inscrit.utilisateur.id}`, inscrit.utilisateur.id));
                        promisesCOMP.push(network.getJSON(`competenceutilisateur/${inscrit.utilisateur.id}`, inscrit.utilisateur.id));
                    });
                })
                done++;
            });

            // We need to wait after seance & activity
            while(done < 2){
                await Utils.sleep(500);
            }
            
            Promise.all(promisesUser).then((resultPromise) => {
                resultPromise.forEach(user => {
                    arr.user[user.id] = user
                })
                done++;
            });
            Promise.all(promisesMCOM).then((resultPromise) => {
                resultPromise.forEach(userMCOM => {
                    if(userMCOM.length==0){return;}
                    arr.userMCOM[userMCOM[0].utilisateurId] = userMCOM
                })
                done++;
            });
            Promise.all(promisesFORM).then((resultPromise) => {
                resultPromise.forEach(userFORM => {
                    if(userFORM.length==0){return;}
                    arr.userFORM[userFORM[0].id] = userFORM
                })
                done++;
            });
            Promise.all(promisesNOMI).then((resultPromise) => {
                resultPromise.forEach(aResultPromise => {
                    if(aResultPromise[0].length==0){return;}
                    arr.userNOMI[aResultPromise[1]] = aResultPromise[0]
                })
                done++;
            });
            Promise.all(promisesCOMP).then((resultPromise) => {
                resultPromise.forEach(aResultPromise => {
                    if(aResultPromise[0].length==0){return;}
                    arr.userCOMP[aResultPromise[1]] = aResultPromise[0]
                })
                done++;
            });

            // We need to wait after all requests
            while(done < 7){
                await Utils.sleep(500);
            }
            
            console.info(`Processing ${Progress.get()[1]} requests in ${Progress.durationMS()}ms`);

            //Force initiate Google Api
            handleClientLoad();
            dmGabi.style.display='block';

        })
    }
  
    function startGapi(){
        
        dmProgressLabel.innerText=' > On fait un peu de 🔮 avec Google... ';
        
        let promises = [gapiMiner.getAll('activites'),
                        gapiMiner.getAll('seances'),
                        gapiMiner.getAll('benevoles'),
                        gapiMiner.getAll('moyenComs'),
                        gapiMiner.getAll('formations'),
                        gapiMiner.getAll('nominations'),
                        gapiMiner.getAll('competences'),
                        ];

        Promise.all(promises).then((data)=>{
            mergeAndSaveDataIntoSheet(data);
        });
    }

    function mergeAndSaveDataIntoSheet(cache){
        
        dmProgressLabel.innerText=' > On fait toujours plus de 🔮 avec Google... ';

        let activites4Sheet = Business.activitesToArray(arr.activite, cache[0]);
        let seances4Sheet = Business.seancesToArray(arr.seance, cache[1]);        
        let users4Sheet = Business.usersToArray(arr.user, cache[2]);        
        let usersMCOM4Sheet = Business.usersMCOMToArray(arr.userMCOM, cache[3]);
        let usersFORM4Sheet = Business.usersFORMToArray(arr.userFORM, cache[4]);
        let usersNOMI4Sheet = Business.usersNOMIToArray(arr.userNOMI, cache[5]);
        let usersCOMP4Sheet = Business.usersCOMPToArray(arr.userCOMP, cache[6]);
        
        let promises = [gapiMiner.put('activites', activites4Sheet),
                        gapiMiner.put('seances', seances4Sheet),
                        gapiMiner.put('benevoles', users4Sheet),
                        gapiMiner.put('moyenComs', usersMCOM4Sheet),
                        gapiMiner.put('formations', usersFORM4Sheet),
                        gapiMiner.put('nominations', usersNOMI4Sheet),
                        gapiMiner.put('competences', usersCOMP4Sheet)
                    ];

        Promise.all(promises).then(()=>{
            // closing process
            dmGabi.style.display='none';
            dmBoxProgress.style.display='none';
            dmGoodbye.style.display='block';
            dmGoodbyeLink.href=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0`
            
            console.info(`Processing ${Progress.get()[1]} requests in ${Progress.durationMS()}ms`);
        });
      }

    init();

})(window);