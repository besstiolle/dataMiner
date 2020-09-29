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
        for(const valueCache of valuesCache){
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
        for(const valueCache of valuesCache){
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
            result.push([key, user.structure.id, user.structure.libelle, user.nom, user.prenom,
                    user.actif, user.mineur]);
        }
        for(const valueCache of valuesCache){
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
        for(const valueCache of valuesCache){
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
        for(const valueCache of valuesCache){
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
        for(const valueCache of valuesCache){
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
        for(const valueCache of valuesCache){
            if(comps.hasOwnProperty(valueCache[0])){
                continue;
            }
            result.push(valueCache);
        }
        return result;
    }

    static calcA(arr){
        let filter = new Map();
        filter.set(0, ['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif', 
                'portable', 'telephone travail', 'mail dom', 'mail',
                'Σ activités', 'Σ durée activités (sec)', 'dernière activité', 'nb jours depuis dernière activité']);
        // Init table with user
        for (const [key, user] of Object.entries(arr.user)) {
            filter.set(key, [key, user.structure.id, user.structure.libelle, user.nom, user.prenom, user.actif, 
                    'N/A', 'N/A', 'N/A', 'N/A',// POR TELTRAV MAILDOM MAIL position 6->9
                    0, 0, 0, 0]); //Nb Activity, Duration Activity, Last Time on activity 10->13 
        }

        // Add MCOM
        let filterValues;
        for (const [key, mcomOfUser] of Object.entries(arr.userMCOM)) {
            mcomOfUser.forEach(mcom => {
                if(filter.has(key)){
                    filterValues = filter.get(key)
                    switch(mcom.moyenComId){
                        case "POR": filterValues[6] = mcom.libelle;break;
                        case "TELTRAV": filterValues[7] = mcom.libelle;break;
                        case "MAILDOM": filterValues[8] = mcom.libelle;break;
                        case "MAIL": filterValues[9] = mcom.libelle;break;
                    }
                    filter.set(key, filterValues);
                }
            });
        }

        // Add last presence on seances
        let currentDate = new Date();
        arr.seance.forEach(seanceWrapper => {
            seanceWrapper.forEach(seance => {
                if(filter.has(seance.utilisateur.id)){
                    filterValues = filter.get(seance.utilisateur.id)
                   
                    filterValues[10]++ 
                    if(seance.statut === "VALIDEE"){
                        filterValues[11] += Utils.durationSeance(seance.debut, seance.fin);
                    }
                    filterValues[12] = Utils.maxDate(filterValues[12], seance.debut)
                    filterValues[13] = Math.floor((Date.parse(currentDate) - Date.parse(filterValues[12])) / 1000 / 60 / 60 / 24)

                    filter.set(seance.utilisateur.id, filterValues);
                }
            });
        });

        return Utils.toArray(filter);
    }

    static calcB(arr){
        let filter = new Map();
        let headerComp = new Map();
        filter.set(0, ['id', 'structure_id', 'structure_libelle', 'nom', 'prénom', 'estActif', 
                'portable', 'telephone travail', 'mail dom', 'mail',
                ]);
        // Init table with user
        for (const [key, user] of Object.entries(arr.user)) {
            filter.set(key, [key, user.structure.id, user.structure.libelle, user.nom, user.prenom, user.actif, 
                    'N/A', 'N/A', 'N/A', 'N/A',// POR TELTRAV MAILDOM MAIL position 6->9
                    ]); //Everything else
        }

        // Add MCOM
        let filterValues;
        for (const [key, mcomOfUser] of Object.entries(arr.userMCOM)) {
            mcomOfUser.forEach(mcom => {
                if(filter.has(key)){
                    filterValues = filter.get(key)
                    switch(mcom.moyenComId){
                        case "POR": filterValues[6] = mcom.libelle;break;
                        case "TELTRAV": filterValues[7] = mcom.libelle;break;
                        case "MAILDOM": filterValues[8] = mcom.libelle;break;
                        case "MAIL": filterValues[9] = mcom.libelle;break;
                    }
                    filter.set(key, filterValues);
                }
            });
        }

        //result.push(['utilisateurId', 'libelle', 'dateValidation']);
        let positionHeaderComp;
        let headers;
        for (const [key, compsOfUser] of Object.entries(arr.userCOMP)) {
            compsOfUser.forEach(comp => {
                if(filter.has(key)){
                    filterValues = filter.get(key)
                    if(!headerComp.has(comp.libelle)){
                        // update header cache position
                        headerComp.set(comp.libelle, headerComp.size);
                        // update header title
                        headers = filter.get(0);
                        headers.push(comp.libelle);
                        filter.set(0, headers)
                    }
                    positionHeaderComp = headerComp.get(comp.libelle) + 10;
                    
                    if(comp.dateValidation === undefined){
                        filterValues[positionHeaderComp] = "X"
                    } else {
                        filterValues[positionHeaderComp] = comp.dateValidation
                    }
                    
                    filter.set(key, filterValues);
                }
            });
            
        }

        return Utils.toArray(filter);
    }
}