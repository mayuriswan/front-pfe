export class Field {
    title: string = '';
    type: string = ''; // 'text' ou 'choice'
    value: string = ''; // pour 'text', la valeur ; pour 'choice', les options séparées par des virgules
  }
  
  export class Step {
    title: string = '';
    fields: Field[] = [];
  }
  
  export class Formulaire {
    id: number = 0;
    nom: string = '';
    steps: Step[] = [];
  }
  