import { Utils } from './Utils.class'

export class Business {

    static activitesToArray(values, valuesCache){
        let result = [];
        result.push(['id', 'libelle', 'statut', 'typeActivite_libelle', 'typeActivite_action_libelle', 'typeActivite_groupeAction_libelle']);
        for (const [key, value] of Object.entries(values)) {
            result.push([
                            value.id, 
                            value.libelle, 
                            value.statut, 
                            value.typeActivite.libelle, 
                            value.typeActivite.action.libelle, 
                            value.typeActivite.groupeAction.libelle
                        ]);
        }
        for (const valueCache of valuesCache){
            if(values.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }

    static seancesToArray(seances, valuesCache){
        let result = new Map();
        result.set(-1, ['id', 'debut', 'fin', 'statut', 'activiteId', 'utilisateurId']);
        seances.forEach(seanceWrapper => {
            seanceWrapper.forEach(seance => {
                result.set(seance.id, [seance.id, seance.debut, seance.fin, seance.statut, 
                    seance.activite.id, seance.utilisateur.id]);
            });
        });
        for (const valueCache of valuesCache){
            if(result.has(valueCache[0])){
                continue;
            }
            result.set(valueCache[0], valueCache);
        }
        return Utils.toArray(result);
    }

    static usersToArray(users, valuesCache){
        let result = [];
        result.push(['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif','estMineur']);
        for (const [key, user] of Object.entries(users)) {
            if(user != null){
                result.push([key, user.structure.id, user.structure.libelle, user.nom, user.prenom,
                        user.actif, user.mineur]);
            }
        }
        for (const valueCache of valuesCache){
            if(users.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }

    static usersMCOMToArray(mcoms, valuesCache){
        let result = [];
        result.push(['utilisateurId', 'moyenComId', 'libelle', 'estVisible']);
        for (const [key, mcomOfUser] of Object.entries(mcoms)) {
            mcomOfUser.forEach(mcom => {
                result.push([key, mcom.moyenComId, mcom.libelle, mcom.visible]);
            });
            
        }
        for (const valueCache of valuesCache){
            if(mcoms.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }
 
    static usersFORMToArray(forms, valuesCache){
        let result = [];
        result.push(['utilisateurId', 'formation_libelle', 'formation_recyclage', 'dateObtention']);
        for (const [key, formOfUser] of Object.entries(forms)) {
            formOfUser.forEach(form => {
                result.push([key, form.formation.libelle, form.formation.recyclage, form.dateObtention]);
            });
            
        }
        for (const valueCache of valuesCache){
            if(forms.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }
  
    static usersNOMIToArray(nomis, valuesCache){
        let result = [];
        result.push(['utilisateurId', 'libelleLong', 'groupeNomination_libelle', 'structure_libelle', 'structure_id', 'dateValidation']);
        for (const [key, nomisOfUser] of Object.entries(nomis)) {
            nomisOfUser.forEach(nomi => {
                result.push([key, nomi.libelleLong, nomi.groupeNomination.libelle, nomi.structure.libelle, nomi.structure.id, nomi.dateValidation]);
            });
            
        }
        for (const valueCache of valuesCache){
            if(nomis.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }

    static usersCOMPToArray(comps, valuesCache){
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
        for (const valueCache of valuesCache){
            if(comps.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }

    static calcA(users4Sheet, usersMCOM4Sheet, seances4Sheet){
        let filter = new Map();
        filter.set(0, ['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif', 
                'portable', 'telephone travail', 'mail dom', 'mail',
                'Σ activités', 'Σ durée activités (sec)', 'dernière activité', 'nb jours depuis dernière activité']);
        // Init table with user
        for (const user of users4Sheet) {
            if(user[0] !== "id"){ //Avoid header
                filter.set(user[0], [user[0],user[1], user[2], user[3], user[4], user[5], 
                    'N/A', 'N/A', 'N/A', 'N/A',// POR TELTRAV MAILDOM MAIL position 6->9
                    0, 0, 0, 0]); //Nb Activity, Duration Activity, Last Time on activity 10->13 
            }
        }

        // Add MCOM
        let filterValues;
        for (const mcom of usersMCOM4Sheet) {
            if(filter.has(mcom[0])){
                filterValues = filter.get(mcom[0])
                switch(mcom[1]){
                    case "POR": filterValues[6] = mcom[2];break;
                    case "TELTRAV": filterValues[7] = mcom[2];break;
                    case "MAILDOM": filterValues[8] = mcom[2];break;
                    case "MAIL": filterValues[9] = mcom[2];break;
                }
                filter.set(mcom[0], filterValues);
            }
        }

        // Add last presence on seances
        let currentDate = new Date();
        for (const seance of seances4Sheet) {
            if(filter.has(seance[5])){
                filterValues = filter.get(seance[5])
                
                filterValues[10]++ 
                if(seance[3] === "VALIDEE"){
                    filterValues[11] += Utils.durationSeance(seance[1], seance[2]);
                }
                filterValues[12] = Utils.maxDate(filterValues[12], seance[1])
                filterValues[13] = Math.floor((Date.parse(currentDate) - Date.parse(filterValues[12])) / 1000 / 60 / 60 / 24)

                filter.set(seance[5], filterValues);
            }
        };

        return Utils.toArray(filter);
    }

    static calcB(users4Sheet, usersMCOM4Sheet, usersCOMP4Sheet){
        let filter = new Map();
        let structureId = "N/A"
        let structureLibelle = "N/A"
        let headerComp = new Map();
        filter.set(0, ['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif', 
                'portable', 'telephone travail', 'mail dom', 'mail',
                ]);

        for (const user of users4Sheet) {
            if(user[0] !== "id"){ //Avoid header
                filter.set(user[0], [user[0],user[1], user[2], user[3], user[4], user[5], 
            'N/A', 'N/A', 'N/A', 'N/A',// POR TELTRAV MAILDOM MAIL position 6->9
            ]); //Everything else
            }
        }

        // Add MCOM
        let filterValues;
        for (const mcom of usersMCOM4Sheet) {
            if(filter.has(mcom[0])){
                filterValues = filter.get(mcom[0])
                switch(mcom[1]){
                    case "POR": filterValues[6] = mcom[2];break;
                    case "TELTRAV": filterValues[7] = mcom[2];break;
                    case "MAILDOM": filterValues[8] = mcom[2];break;
                    case "MAIL": filterValues[9] = mcom[2];break;
                }
                filter.set(mcom[0], filterValues);
            }
        }

        let positionHeaderComp;
        let headers;
        for (const comp of usersCOMP4Sheet) {
            if(filter.has(comp[0])){
                filterValues = filter.get(comp[0])
                if(!headerComp.has(comp[1])){
                    // update header cache position
                    headerComp.set(comp[1], headerComp.size);
                    // update header title
                    headers = filter.get(0);
                    headers.push(comp[1]);
                    filter.set(0, headers)
                }
                positionHeaderComp = headerComp.get(comp[1]) + 10;
                
                if(comp[2] === undefined){
                    filterValues[positionHeaderComp] = "X"
                } else {
                    filterValues[positionHeaderComp] = comp[2]
                }
                
                filter.set(comp[0], filterValues);
            }            
        }

        return Utils.toArray(filter);
    }
}