;DM_RUNNING=1;(function(){  
    
    var VERSION = '0-Alpha';
    var BASE_URL_API = `${window.location.protocol}//${window.location.hostname}/crf/rest/`;
    var _cpt = 0;
    var _cpt2 = 0;
    var arr = {};
    
    //GAPI vars
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    var CLIENT_ID, API_KEY, SHEET_ID;


    let md5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    let sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
    let getJSON = (url, callback) => {_cpt++;let xhr = new XMLHttpRequest();xhr.open('GET', BASE_URL_API + url, true);xhr.responseType = 'json';xhr.onload = () => {let status = xhr.status;if (status == 200) { _cpt2++;callback(xhr.response); } else {console.log('HTTP error', xhr.status, xhr.statusText);throw 'HTTP error : ' + xhr.status + " " + xhr.statusText;}};xhr.send();};
    let formatDate = (d) => {d = new Date(d.getTime() + (d.getTimezoneOffset()*60000));return d.toISOString().split('T')[0]}

    function handleClientLoad() {gapi.load('client:auth2', initClient);}
    function initClient() { gapi.client.init({ apiKey: API_KEY, clientId: CLIENT_ID, discoveryDocs: DISCOVERY_DOCS, scope: SCOPES }).then(function () { gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus); updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); authorizeButton.onclick = handleAuthClick; signoutButton.onclick = handleSignoutClick; }, function(error) { appendPre(JSON.stringify(error, null, 2)); }); }
    function updateSigninStatus(isSignedIn) { if (isSignedIn) { authorizeButton.style.display = 'none'; signoutButton.style.display = 'block'; startApi(); } else { authorizeButton.style.display = 'block'; signoutButton.style.display = 'none'; } }
    function handleAuthClick(event) {gapi.auth2.getAuthInstance().signIn();}
    function handleSignoutClick(event) {gapi.auth2.getAuthInstance().signOut();}
    function appendPre(message) {dmContent.appendChild(document.createTextNode(message + '\n'));}


    let init = function(){
       
      if(md5(window.location.hostname) !== 'cf81f3439fd51919349a029a57953828'){
        alert("Vous n'êtes pas au bon endroit pour activer ce code");   
        return;
      }

      //Retrieve default var from localStorage
      let sheetIdStorage=localStorage.getItem('sheetIdStorage');
      let gAPIClientIdStorage=localStorage.getItem('gAPIClientIdStorage');
      let aPIKeyStorage=localStorage.getItem('aPIKeyStorage');
      let startStorage=localStorage.getItem('startStorage');
      let endStorage=localStorage.getItem('endStorage');
      let ulStorage=localStorage.getItem('ulStorage');

      //Set default value
      if(sheetIdStorage==null){sheetIdStorage="";}
      if(gAPIClientIdStorage==null){gAPIClientIdStorage="";}
      if(aPIKeyStorage==null){aPIKeyStorage="";}
      if(startStorage===null || startStorage===""){startStorage=15;}
      if(endStorage===null || endStorage===""){endStorage=30;}
      if(ulStorage===null || ulStorage===""){ulStorage=474;}

      //Dom Construction
      let dom=document.createElement('div');
      dom.setAttribute('id','dataMinerWrapper');
      document.body.appendChild(dom);
      dom.innerHTML = `
      <style>
        #dmBack {position: fixed;left: 0;top: 0;background: #000;z-index: 1000;width: 100%;height: 1000%;opacity: 0.8;}
        #dmBox {position: fixed;width: 500px;height: 450px;top: calc((100% - 450px) / 2);left: calc((100% - 500px) / 2);z-index: 1000;background: #FFF;padding: 10px;}
        #dmBox a{text-decoration: underline #0330fc;font-weight: bold;}
        #dmBox input{width: 100%;background: #FFE;border: 1px dotted;margin: 2px auto;font-size: 0.9em;}
        #dmBox input.mid{width: 50%;}
        input#dmRun{margin: 10px auto;font-weight: bold;padding: 5px;}
        #dmBoxProgress{display:none;}
        #dmProgressT{width: 100%;height: 10px;border: 1px dotted #000;background: #967b3f;display: block;} 
        #dmProgressA{width: 0%;height: 100%;background: #5d9e3f;} 
        #dmProgressLabel{font-family: monospace;color:revert;background:revert;}
        #dmAvancementLabel{font-size: 0.8em;text-align: center;display: block;}
        #dmAvancementLabel span{font-weight: bold;}
        #dmBox label{font-size: 0.9em;display: block;margin: 5px auto 0;}
        #dmGabi{display:none;}
      </style>
      <div id="dmBack"></div>
      <div id="dmBox">
        <h1>DataMiner Payload-ed v${VERSION}</h1>
        <p>L'utilisation de ce script se fait sous votre entière responsabilité. Plus d'informations à son propos sur <a href="https://besstiolle.github.io/dataMiner/">github</a></p>
        <div id='dmBoxSetting'>
            <input id="dmSheetId" type="text" placeholder="Entrez l'id du google Sheet" value="${sheetIdStorage}">
            <input id="dmGAPIClientId" type="text" placeholder="Entrez l'id de votre client google API finissant par .apps.googleusercontent.com" value="${gAPIClientIdStorage}">
            <input id="dmAPIKey" type="text" placeholder="Entrez la clé de votre google API" value="${aPIKeyStorage}">
            
            <label for="dmStart">Nombre de jours dans le passé (défaut = 15)</label>
            <input id="dmStart" class="mid" type="text" value="${startStorage}">
            
            <label for="dmEnd">Nombre de jours dans le futur (défaut = 30)</label>
            <input id="dmEnd" class="mid" type="text" value="${endStorage}">
            
            <label for="dmUL">Identifiant de l'UL (défaut = 474)</label>
            <input id="dmUL" class="mid" type="text" value="${ulStorage}">

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
      </div>
      

        
      <script async defer src="https://apis.google.com/js/api.js"
      onload="alert('foo')"
      onreadystatechange="if (this.readyState === 'complete'){this.onload();alert('foo')}">
  </script>
  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="alert('test');" />
      `;

      dmRun.addEventListener("click", valideParameters);
      dmBack.addEventListener("click", closeScript);
    }

    let valideParameters = () => {

        let start = new Date(Date.now() - dmStart.value * 24 * 60 * 60 * 1000);
        let end = new Date(Date.now() + dmEnd.value * 24 * 60 * 60 * 1000);

        //Save parameter for futur script
        localStorage.setItem('sheetIdStorage', dmSheetId.value);
        localStorage.setItem('gAPIClientIdStorage', dmGAPIClientId.value);
        localStorage.setItem('aPIKeyStorage', dmAPIKey.value);
        localStorage.setItem('startStorage', dmStart.value);
        localStorage.setItem('endStorage', dmEnd.value);
        localStorage.setItem('ulStorage', dmUL.value);

        _cpt = 0;
        _cpt2 = 0;
        SHEET_ID = dmSheetId.value;
        CLIENT_ID = dmGAPIClientId.value;
        API_KEY = dmAPIKey.value;

        dmBoxSetting.style.display = 'none';
        dmBoxProgress.style.display = 'block';
        dmProgressA.style.width = '0%';
        dmProgressLabel.innerText=' > On sort les ⛏ et on creuse !';
        dmCountA.innerText=0;
        dmCountT.innerText=0;

        startMining(start, end);
        
    }

    let closeScript = () => {
        //Remove HTML
        dataMinerWrapper.parentNode.removeChild(dataMinerWrapper);

        //Remove instance var
        delete DM_RUNNING;

        //Remove Script balise
        var scripts = document.getElementsByTagName('script');
        scripts[scripts.length - 1].parentNode.removeChild(scripts[scripts.length - 1]);
    }

    let startMining = (start, end) => {
        getJSON(`seance?debut=${formatDate(start)}&fin=${formatDate(end)}&structure=${dmUL.value}`, async(data) => {
            arr.activite={};
            arr.seance=[];
            arr.user={};
            arr.userMCOM={}; 
            arr.userFORM={}; 
            arr.userNOMI={}; 
            arr.userCOMP={}; 
            
            data.forEach(seance => eachSeance(seance));
            
            let i=100;
            while(_cpt > _cpt2 && i > 0){
                i--;
                await sleep(1000);
                dmProgressA.style.width = (_cpt2 * 100 / _cpt)+'%';
                dmCountA.innerText=_cpt2;
                dmCountT.innerText=_cpt;
                console.info(`Processing ${_cpt2} / ${_cpt}`);
            }
            console.info(`Processing ${_cpt} requests in ${100 - i}s`);
            startGapi(arr);
        })
    }
  
    let eachInscrit = (inscrit) => {
        
        //avoid useless request
        if(arr.user.hasOwnProperty(inscrit.utilisateur.id)){
            return;
        }
        arr.user[inscrit.utilisateur.id] = null;
        
        getJSON(`utilisateur/${inscrit.utilisateur.id}`, (dataUser) => {
            arr.user[inscrit.utilisateur.id] = dataUser;
        }); 
        
        getJSON(`moyencomutilisateur?utilisateur=${inscrit.utilisateur.id}`, (dataUserMCOM) => {
            arr.userMCOM[inscrit.utilisateur.id] = dataUserMCOM;
        });
        
        getJSON(`formationutilisateur?utilisateur=${inscrit.utilisateur.id}`, (dataUserFORM) => {
            arr.userFORM[inscrit.utilisateur.id] = dataUserFORM;
        });
        
        getJSON(`nominationutilisateur?utilisateur=${inscrit.utilisateur.id}`, (dataUserNOMI) => {
            arr.userNOMI[inscrit.utilisateur.id] = dataUserNOMI;
        });
        
        getJSON(`competenceutilisateur/${inscrit.utilisateur.id}`, (dataUserCOMP) => {
            arr.userCOMP[inscrit.utilisateur.id] = dataUserCOMP;
        });

    };

    let eachSeance = (seance) => {

        getJSON(`activite/${seance.activite.id}`, (dataAct) => {
            arr.activite[seance.activite.id] = dataAct;
        });

        getJSON(`seance/${seance.id}/inscription`, (dataSeance) => {
            arr.seance.push(dataSeance);			
            dataSeance.forEach(inscrit => eachInscrit(inscrit));
        }); 

        
    };

    function startGapi(data){

        dmGabi.style.display='block';

        let activites4Sheet = activitesToArray(data.activite);
        //activites4Sheet.splice(10, activites4Sheet.length);
        
        let seances4Sheet = seancesToArray(data.seance);
        //seances4Sheet.splice(10, seances4Sheet.length);
        
        let users4Sheet = usersToArray(data.user);
        //users4Sheet.splice(10, users4Sheet.length);
        
        let usersMCOM4Sheet = usersMCOMToArray(data.userMCOM);
        //usersMCOM4Sheet.splice(10, usersMCOM4Sheet.length);

        let usersFORM4Sheet = usersFORMToArray(data.userFORM);
        //usersFORM4Sheet.splice(10, usersFORM4Sheet.length);

        let usersNOMI4Sheet = usersNOMIToArray(data.userNOMI);
        //usersNOMI4Sheet.splice(10, usersNOMI4Sheet.length);

        let usersCOMP4Sheet = usersCOMPToArray(data.userCOMP);
        //usersCOMP4Sheet.splice(10, usersCOMP4Sheet.length);
        
        gApiRun(SHEET_ID, 'activites', activites4Sheet);
        gApiRun(SHEET_ID, 'seances', seances4Sheet);
        gApiRun(SHEET_ID, 'benevoles', users4Sheet);
        gApiRun(SHEET_ID, 'moyenComs', usersMCOM4Sheet);
        gApiRun(SHEET_ID, 'formations', usersFORM4Sheet);
        gApiRun(SHEET_ID, 'nominations', usersNOMI4Sheet);
        gApiRun(SHEET_ID, 'competences', usersCOMP4Sheet);

      }

      function activitesToArray(activites){
        let result = [];
        result.push(['id', 'libelle', 'statut', 'typeActivite_libelle', 'typeActivite_action_libelle', 'typeActivite_groupeAction_libelle']);
        for (const [key, activite] of Object.entries(activites)) {
            result.push([activite.id, activite.libelle, activite.statut, activite.typeActivite.libelle, 
                        activite.typeActivite.action.libelle, activite.typeActivite.groupeAction.libelle]);
        }
        return result;
      }

      function seancesToArray(seances){
        let result = [];
        result.push(['id', 'debut', 'fin', 'statut', 'activiteId', 'utilisateurId']);
        seances.forEach(seanceWrapper => {
            seanceWrapper.forEach(seance => {
                result.push([seance.id, seance.debut, seance.fin, seance.statut, 
                    seance.activite.id, seance.utilisateur.id]);
            });
        });
        return result;
      }

      function usersToArray(users){
        let result = [];
        result.push(['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif','estMineur']);
        for (const [key, user] of Object.entries(users)) {
            result.push([key, user.structure.id, user.structure.libelle, user.nom, user.prenom,
                    user.actif, user.mineur]);
        }
        return result;
      }

      function usersMCOMToArray(mcoms){
        let result = [];
        result.push(['utilisateurId', 'moyenComId', 'libelle', 'estVisible']);
        for (const [key, mcomOfUser] of Object.entries(mcoms)) {
            mcomOfUser.forEach(mcom => {
                result.push([key, mcom.moyenComId, mcom.libelle, mcom.visible]);
            });
            
        }
        return result;
      }
 
      function usersFORMToArray(forms){
        let result = [];
        result.push(['utilisateurId', 'formation_libelle', 'formation_recyclage', 'dateObtention']);
        for (const [key, formOfUser] of Object.entries(forms)) {
            formOfUser.forEach(form => {
                result.push([key, form.formation.libelle, form.formation.recyclage, form.dateObtention]);
            });
            
        }
        return result;
      }
  
      function usersNOMIToArray(nomis){
        let result = [];
        result.push(['utilisateurId', 'libelleLong', 'groupeNomination_libelle', 'structure_libelle', 'structure_id', 'dateValidation']);
        for (const [key, nomisOfUser] of Object.entries(nomis)) {
            nomisOfUser.forEach(nomi => {
                result.push([key, nomi.libelleLong, nomi.groupeNomination.libelle, nomi.structure.libelle, nomi.structure.id, nomi.dateValidation]);
            });
            
        }
        return result;
      }

      function usersCOMPToArray(comps){
        let result = [];
        let dateValidation;
        result.push(['utilisateurId', 'libelle', 'dateValidation']);
        for (const [key, compsOfUser] of Object.entries(comps)) {
            compsOfUser.forEach(comp => {
                dateValidation = "";
                if(comp.dateValidation !== undefined){
                    dateValidation=comp.dateValidation;
                }
                result.push([key, comp.libelle, dateValidation]);
            });
            
        }
        return result;
      }

      function getRange(oneArray){
        let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        return "A1:" + letters[oneArray[0].length-1] + oneArray.length; 
      }

      function gApiRun(spreadsheetId, spreadsheetTableName, data){
        let body={};
        let range = getRange(data);

        gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: spreadsheetId,
            range: spreadsheetTableName + '!A:Z',
        }).then(function(response) {
            console.info("Clean Sheet" + spreadsheetTableName + " done.");
            body['values'] = data;
            gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: spreadsheetId,
                range: spreadsheetTableName + '!' + range,
                includeValuesInResponse: false,
                valueInputOption: 'RAW',
            }, body).then(function(response) {
                console.info("Insert in Sheet" + spreadsheetTableName + " done.");
                return;
            }, function(response) {
            appendPre('Error: ' + response.result.error.message);
            });
        }, function(response) {
        appendPre('Error: ' + response.result.error.message);
        });
      }


    init();

})(window);