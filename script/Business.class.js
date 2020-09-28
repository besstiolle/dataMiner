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
            if(user === null){
                console.info(users)
                console.error("PAF sur key ")
                console.error(key)
            }
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
}