export class ProjectCall {
    id?: number;
    nom?: string;
    description?: string;
    responsable?: string;
    categorie?: string;
    institutHote?: string;
    budget?: number;
    dureeMinimale?: number;
    dureeMaximale?: number;
    typeTache?: string;
    paysAutorises?: string;
    budgetSepare?: boolean;
    postBudget?: string;
    datePublication?: Date;
    dateCloture?: Date;
    soumissionAcceptee?: number;
    formulaireEvaluation?: string;
    documents?: string;
}
