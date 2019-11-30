import { Component, OnInit } from '@angular/core';
import {HttpRequestService} from '../http-request.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {




  url = 'http://localhost:8080/frage';
  //url2 = 'kp';
  deleteId: number = -1;
  url2 = 'http://localhost:8080/frage/' + this.deleteId;

  url3 = 'http://localhost:8090/frage';

  urlAdd = 'http://localhost:8090/frage/add';
  
  urlById: number = -1;
  urlGetbyId = 'http://localhost:8090/frage/' + this.urlById;

  formType: string = ""; 
  urlFormType = 'http://localhost:8090/type/' + this.formType;

  


  formTypeCat: string = ""; 
  categoryCat: string = ""; 
  urlFormTypeCategory = 'http://localhost:8090/type/' + this.formTypeCat + '/category/' + this.categoryCat;
  urlCategory = 'http://localhost:8090/category/' + this.categoryCat;

  editId: number = -1;
  urlEdit: string = 'http://localhost:8090/frage/' + this.editId + '/edit';


  deleteIdQuestion = -1;
  urlDelete = 'http://localhost:8090/frage/' + this.deleteIdQuestion + '/delete';



  chosenFormType: string = "";
  chosenFormTypeCat: string = "";
  chosenCategoryCat: string = "";

  catOn: boolean = false;

  public data: any;

  public dataOne: any;
  byIdOn: boolean = false;

  public data4: any;

 public dataSet =  new Set();
 public dataSetCat =  new Set();

  public dataDisplay: any;




names: String[] = ["Emil", "Tobias", "Linus"];

selectedValue:string = "";
selectedValueKat:string = "";

kat: Kategorien[] = [];

antwortMoeglichkeiten: Kategorien[] = [];

radioOn: boolean = false;
CheckOn: boolean = false;
TextOn: boolean = false;
TextCheckOn: boolean = false;

//isEdit:boolean = false;
deleteOn:boolean = false;
editOn: boolean = false;

antOpAnzahl: number = 1;

catOpAnzahl: number = 1;




fakeArray = new Array(this.antOpAnzahl);

realArray = new Array<String>(this.fakeArray.length);


fakeChoiceArray = new Array(this.antOpAnzahl);

choiceArray = new Array<Choices>(); // this.fakeChoiceArray.length


choiceExample: Choices = {id: 0, choice: "", questionType: null};


fakeCategoryArray = new Array(this.catOpAnzahl);
categoryArray = new Array<QuestionCategory>();



antOpString: string = "";



getQuestionByIdList: number[];



// frage: Frage = {id: 1, frage: "Familienstand?", kategorie: "Neugründung", antwortTyp: "RadioButton", antwortOptionen:"ledig;verheiratet;verwitwet", hinweis: "Familienstatus eintragen"};
frage: Frage = {id: 1, frage: "", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};

question: Question = {id: 0, question: "Was ist dein Alter", questionType: null, hint: "no Hinweis", formType: "Gewerbe", questionCategory: null};

choices: Choices = {id: 0, choice: "u18", questionType: null};
choices2: Choices = {id: 1, choice: "ü18", questionType: null};

chArray: Choices[] = [this.choices];
quArray: Question[] = [this.question];

questionType: QuestionType = {id: 0, type: "RadioButton", choices: this.chArray }; // , question: this.question

questionCategory: QuestionCategory = {id: 0, category: "Allgemein", processNumber: 1}; // questions: this.quArray,



qtArray: QuestionType[] = [this.questionType];
qcArray: QuestionCategory[] = [this.questionCategory];



question2: Question = null;





confirm: string = "";


currentId:number = 0;

check:boolean = false;




constructor(private api: HttpRequestService) { }



  ngOnInit() {

this.kat = [{id: 1, name: "Neu"},{id: 2, name: "Wieder"},{id: 3, name: "Alt"}];

this.antwortMoeglichkeiten = [{id: 1, name: "Text-Eingabe"},{id: 2, name: "RadioButton"},{id: 3, name: "Checkbox"}, {id: 4, name: "Text u. Checkbox"}];
this.selectedValue = "Moin";

this.antOpAnzahl = 1;
this.catOpAnzahl = 1;

this.frage = {id: 1, frage: "Frage eingeben", kategorie: "", antwortTyp: "", antwortOptionen:"", hinweis: ""};


this.chosenFormType = "";
this.chosenFormTypeCat = "";
this.chosenCategoryCat = "";



let chbsp: Choices = {id: 0, choice: "", questionType: null};
this.choiceArray.push(chbsp);


let catbsp: QuestionCategory = {id: 0, category: "", processNumber: 0};
this.categoryArray.push(catbsp);
console.log(this.categoryArray);





this.choices = {id: 0, choice: "under18", questionType: this.qtArray};
this.choices2 = {id: 1, choice: "over18", questionType: this.qtArray};
this.chArray = [this.choices, this.choices2];

this.quArray = [this.question];

this.questionType = {id: 0, type: "RadioButton2", choices: this.chArray }; // , question: this.question
this.questionCategory= {id: 0, category: "Allgemeines", processNumber: 1}; // questions: this.quArray



this.qtArray = [this.questionType];
this.qcArray = [this.questionCategory];

this.question = {id: 2, question: "dein Alter hier eintragen", questionType: this.questionType, hint: "no Hinweis vorhanden", formType: "Gewerbean u. umeldung", questionCategory: this.qcArray};


this.question2 = {id: 1, question: "dein Alter hier eintragen", questionType: this.questionType, hint: "no Hinweis vorhanden", formType: "Gewerbean u. umeldung", questionCategory: this.qcArray};

this.dataOne = this.question;



/** 
this.api
.getFrage(this.url)
.subscribe(
  data => {
    console.log(data);
    this.data = data;
  },
  err => {
    console.log(err);
  }
);
 **/

this.api
.getQuestion(this.url3)
.subscribe(
  dataDisplay => {
    console.log(dataDisplay);
    this.dataDisplay = dataDisplay;
    this.data = dataDisplay;


    this.dataSetCat = new Set<String>();
    this.dataSetCat.add("keine Kategorie");
    for(let u1 = 0; u1 < dataDisplay.length; u1++){
      for(let u2 = 0; u2 < dataDisplay[u1].questionCategories.length; u2++){
        this.dataSetCat.add(dataDisplay[u1].questionCategories[u2].category);
    }
  }
    console.log(this.dataSetCat);

    this.dataSet =  new Set<String>();
    this.dataSet.add("Alle Fragen");
    for(let u = 0; u < dataDisplay.length; u++){
      this.dataSet.add(dataDisplay[u].formType);
    }
    console.log(this.dataSet);

  },
  err => {
    console.log(err);
  }
);


/** 
for(let i = 0; i < this.data.length; i++){
  this.getQuestionByIdList.push(this.data[i].id);
}
**/



}




//id: Kategorien

  toggleEdit(){


    if(this.question.questionType.type == "RadioButton"){
      console.log("ok worked")
      this.radioOn = true;
    }else{
      this.radioOn = false;
    }

    if(this.question.questionType.type == "Checkbox"){
      console.log("ok worked")
      this.CheckOn = true;
    }else{
      this.CheckOn = false;
    }

    if(this.question.questionType.type == "Text-Eingabe"){
      console.log("ok worked")
      this.TextOn = true;
    }else{
      this.TextOn = false;
    }

    if(this.question.questionType.type == "Text u. Checkbox"){
      console.log("ok worked")
      this.TextCheckOn = true;
    }else{
      this.TextCheckOn = false;
    }


      
    
      //this.isEdit = !this.isEdit;
      //getted from event
     // console.log(id);
      console.log(this.frage.antwortTyp);
      //getted from binding
   
    
  }


  changeCatOn(): void{
    console.log("ChangeCatOn worked")
    this.catOn = true;


    this.dataSetCat =  new Set<String>();
    this.dataSetCat.add("keine Kategorie");
    for(let t = 0; t < this.data.length; t++){
     
      if(this.chosenFormTypeCat == this.data[t].formType){
        
        for(let g = 0; g < this.data[t].questionCategories.length; g++){

          this.dataSetCat.add(this.data[t].questionCategories[g].category);
        }
      }

    }

    this.chosenCategoryCat = "keine Kategorie";
    this.getAllQuestionsOfFormTypeWithinCategory();



  }



  loadQuestion(question: any): void {
    
    console.log("Click worked" + question.id);

    this.deleteIdQuestion = question.id;  
    this.deleteOn = true;
    this.editOn = true;
  
    this.question.question = question.question;
    this.question.id = question.id;
    this.question.hint = question.hint;
    this.question.questionType = question.questionType;
    this.question.questionCategory = question.questionCategories;
    this.question.formType = question.formType;

    this.toggleEdit();

    console.log(question.questionCategories);

    this.categoryArray = question.questionCategories;
    this.choiceArray = question.questionType.choices;


    console.log(this.choiceArray);
    console.log(this.categoryArray);

    this.fakeChoiceArray = new Array(this.choiceArray.length);
    this.fakeCategoryArray = new Array(this.categoryArray.length);

    this.antOpAnzahl = this.choiceArray.length
    this.catOpAnzahl = this.categoryArray.length

  }



/** 
  myClick(id:any): void {
    
    console.log("Click worked" + id.id);

    this.deleteId = id.id;  
    this.deleteOn = true;

    this.frage.id = id.id;
    this.frage.frage = id.frage;
    this.frage.kategorie = id.kategorie;
    this.frage.antwortTyp = id.antwortTyp;
    this.frage.antwortOptionen = id.antwortOptionen;
    this.toggleEdit();
    

    this.realArray = id.antwortOptionen.split(";");
    

    console.log(this.realArray);

    this.fakeArray = new Array(this.realArray.length);
    this.frage.hinweis = id.hinweis;



    
   
   // var myTable = document.getElementById('tabId');
   // myTable.style.backgroundColor = 'Red';


  }
    





deleteFrage(): void{

  this.url2 = 'http://localhost:8080/frage/' + this.deleteId;


  this.api.deleteFrage(this.deleteId, this.url2).subscribe(data => data => {console.log(data);this.data = data;},err => {console.log(err);});



  this.api
  .getFrage(this.url)
  .subscribe(
    data => {
      console.log(data);
      this.data = data;
    },
    err => {
      console.log(err);
    }
  );


  this.deleteOn = false;
  this.deleteId = -1;

  location.reload();


}
 **/


createQuestion(): void{


  this.api
.getQuestion(this.url3)
.subscribe(
  data => {
    console.log(data);
    this.data = data;
    this.dataDisplay = data;

    this.dataSetCat = new Set<String>();
    this.dataSetCat.add("keine Kategorie")
    for(let u1 = 0; u1 < data.length; u1++){
      for(let u2 = 0; u2 < data[u1].questionCategories.length; u2++){
      this.dataSetCat.add(data[u1].questionCategories[u2].category);
    }
  }
    console.log(this.dataSetCat);

    this.dataSet =  new Set<String>();
    this.dataSet.add("Alle Fragen");
    for(let u = 0; u < data.length; u++){
      this.dataSet.add(data[u].formType);
    }
    console.log(this.dataSet);

  },
  err => {
    console.log(err);
  }
);


/** 
  //Change Frage
  if(this.data.length > 0){

    for(let t = 0; t < this.data.length; t++){
      
      if(this.data[t].id == this.question.id){

        console.log("NOOOOOOOOOOOO");

        this.editId = this.question.id;
        this.urlEdit = 'http://localhost:8090/frage/' + this.editId + '/edit';
      
        this.api.editQuestion(this.urlEdit, this.question, this.editId).subscribe(data => {console.log(data);this.data = data; this.dataDisplay = data;},err => {console.log(err);});


        this.check = true;

      }

    }

  }  


**/

if(!this.check){
  if(this.data.length > 0){  
    this.currentId = this.data[this.data.length -1].id + 1;
    this.question.id = this.currentId;
  }else{
    this.question.id = 1;
  }
 


  //this.questionType = {id: 0, type: "RadioButton2", choices: this.chArray, question: this.question };
  //this.questionCategory= {id: 0, category: "Allgemeines", questions: this.quArray, processNumber: 1};
  
  
  
  //this.qtArray = [this.questionType];
  //this.qcArray = [this.questionCategory];
  
  //this.question = {id: 2, question: "dein Alter hier eintragen", questionType: this.questionType, hint: "no Hinweis vorhanden", formType: "Gewerbean u. umeldung", questionCategory: this.qcArray};
  let zt: number = this.data[this.data.length - 1].questionType.id + 1;




  let questionZw: QuestionType = {id: zt, type: this.question.questionType.type, choices: this.choiceArray}; // ,question: this.question
  //console.log(questionZw);

  //this.questionType = {id: 0, type: "RadioButton2", choices: this.chArray, question: this.question };
  //this.questionType.choices = this.choiceArray;
  //this.questionType.question = this.question;
  this.question.questionType = questionZw;

  let categoryZw: QuestionCategory[] = this.categoryArray;
  this.question.questionCategory = this.categoryArray;//categoryZw;
 console.log("Länge: " + this.question.questionCategory.length);
//this.frage.antwortTyp = this.selectedValue;
//this.frage.kategorie = this.selectedValueKat;

  this.dataSet.add(this.question.formType);

  
  for(let u1 = 0; u1 < this.question.questionCategory.length; u1++){
    
    this.dataSetCat.add(this.question.questionCategory[u1].category);
  
}
  


  // Die Objekte von den "GET"-Methoden werden gekürtzt (Id's werden gelöscht) für die Post/Put-methoden
  let dataShortChoices: ChoicesShort[] = [];
    for(let r = 0; r < this.question.questionType.choices.length; r++){
      dataShortChoices.push({choice: this.question.questionType.choices[r].choice} );//,nextQuestionId: this.question.questionType.choices[r].nextQuestionId});
    }
      
    let dataShortQuestionType: QuestionTypeShort;
    dataShortQuestionType = {type: this.question.questionType.type, choices: dataShortChoices}; //,nextQuestionId: this.question.questionType.nextQuestionId};

    let dataShortCategory: QuestionCategoryShort[] = [];
    for(let r = 0; r <this.question.questionCategory.length; r++){
      dataShortCategory.push({category: this.question.questionCategory[r].category, processNumber: this.question.questionCategory[r].processNumber});
    console.log("Kat: " + this.question.questionCategory[r].category);
    }
   
    let dataShort: QuestionShort;

    dataShort = {question: this.question.question, questionType: dataShortQuestionType, hint: this.question.hint, formType: this.question.formType, questionCategories: dataShortCategory };

    //this.person.id = this.data[this.data.length - 1].id + 1;
    //console.log(this.question);
    console.log("Ende"+ dataShortCategory.length + " | " + dataShort.questionCategories.length);
    console.log(dataShort.questionCategories);
    console.log(dataShort);

  this.api.addQuestion(dataShort, this.urlAdd).subscribe(data => {console.log(data); this.data = data; this.dataDisplay = data;}, err => {console.log(err);});

}



 location.reload();


}





getAllQuestion(): void {

  this.api.getQuestion(this.url3).subscribe(data => {console.log(data);this.data = data; this.dataDisplay = data; 
    

/** 


    let dataShortChoices: ChoicesShort[];
    for(let r = 0; r <this.question.questionType.choices.length; r++){
      dataShortChoices.push({choice: this.question.questionType.choices[r].choice, nextQuestionId: this.question.questionType.choices[r].nextQuestionId});
    }
      
      


    let dataShortQuestionType: QuestionTypeShort;
    dataShortQuestionType = {type: this.question.questionType.type, choices: dataShortChoices, nextQuestionId: this.question.questionType.nextQuestionId};

      


    let dataShortCategory: QuestionCategoryShort[];
    for(let r = 0; r <this.question.questionCategory.length; r++){
      dataShortCategory.push({category: this.question.questionCategory[r].category, processNumber: this.question.questionCategory[r].processNumber});
    }
   

     

    let dataShort: QuestionShort;

    dataShort = {question: this.question.question, questionType: dataShortQuestionType, hint: this.question.hint, formType: this.question.formType, questionCategory: dataShortCategory }
  
    
  
**/


this.dataSetCat = new Set<String>();
this.dataSetCat.add("keine Kategorie")
    for(let u1 = 0; u1 < data.length; u1++){
      for(let u2 = 0; u2 < data[u1].questionCategories.length; u2++){
      this.dataSetCat.add(data[u1].questionCategories[u2].category);
    }
  }


    this.dataSet =  new Set<String>();
    this.dataSet.add("Alle Fragen");
    for(let u = 0; u < data.length; u++){
      this.dataSet.add(data[u].formType);
    }
    console.log(this.dataSet);

  },err => {console.log(err);});
  
}




getQuestionById(): void {
  
  let zw: boolean = false;
  for(let i = 0; i < this.data.length; i++){
      
     if(this.urlById == this.data[i].id){
        zw = true;  
     }
  }

  if(zw){
    this.urlGetbyId = 'http://localhost:8090/frage/' + this.urlById;

    this.api.getQuestionbyId(this.urlGetbyId).subscribe(dataOne => {console.log(dataOne);this.dataOne = dataOne;},err => {console.log(err);});
  
    this.byIdOn = true;
  }
}



getFormType(): void{

  let zw: boolean = false;

  for(let i = 0; i < this.data.length; i++) {
      
     if(this.chosenFormType == this.data[i].formType){
        zw = true;  
     }
  }

  if(zw){

    this.formType = this.chosenFormType;
    this.urlFormType = 'http://localhost:8090/type/' + this.formType;

    this.api.getFormType(this.urlFormType).subscribe(data4 => {console.log(data4);this.data4 = data4;this.dataDisplay = data4;},err => {console.log(err);});
    
  }

}







getCategory(): void{


    this.categoryCat = this.chosenCategoryCat; 
    console.log(this.chosenCategoryCat);
    this.urlCategory = 'http://localhost:8090/category/' + this.categoryCat;

    this.api.getFormType(this.urlCategory).subscribe(data4 => {console.log(data4);this.data4 = data4;this.dataDisplay = data4;},err => {console.log(err);});
    
  }








getAllQuestionsOfFormTypeWithinCategory(): void {

 /**  let zw: boolean = false;

  for(let i = 0; i < this.data.length; i++) {
      
     if(this.chosenFormTypeCat == this.data[i].formType){
        
     for(let e = 0; e < this.data[i].questionCategories.length; e++){
       
        if(this.chosenCategoryCat == this.data[i].questionCategories[e].category){
            
          zw = true;
        }
      }
    }
  }**/

if(this.chosenFormTypeCat == "Alle Fragen"){
  if(this.chosenCategoryCat != "keine Kategorie"){
    
      console.log("Keine Keine !!!!");
      this.getCategory();

    }else{

    this.getAllQuestion();
    console.log("ALLEEE !!!!");
  }

}else{
  if(this.chosenCategoryCat == "keine Kategorie"){
 
 
     this.formType = this.chosenFormTypeCat;
     this.urlFormType = 'http://localhost:8090/type/' + this.formType;
 
     this.api.getFormType(this.urlFormType).subscribe(data4 => {console.log(data4);this.data4 = data4;this.dataDisplay = data4;},err => {console.log(err);});
     
   
    
  }else{

    this.formTypeCat = this.chosenFormTypeCat; 
    this.categoryCat = this.chosenCategoryCat; 
    this.urlFormTypeCategory = 'http://localhost:8090/type/' + this.formTypeCat + '/category/' + this.categoryCat;

    this.api.getAllQuestionsOfFormTypeWithinCategory(this.urlFormTypeCategory).subscribe(data4 => {console.log(data4);this.data4 = data4;this.dataDisplay = data4;},err => {console.log(err);});
  }
}

}






editQuestion(): void{
    


  let questionZw: QuestionType = {id: this.question.questionType.id, type: this.question.questionType.type, choices: this.choiceArray}; //, question: this.question 

  //this.questionType.choices = this.choiceArray;
  //this.questionType.id = 20;
  this.question.questionType = questionZw;
  
  let categoryZw: QuestionCategory[] = this.categoryArray;
  this.question.questionCategory = this.categoryArray;//categoryZw;


  //this.dataSet.delete(this.question.formType);

  this.editId = this.question.id;
  this.urlEdit = 'http://localhost:8090/frage/' + this.editId + '/edit';




// Die Objekte von den "GET"-Methoden werden gekürtzt (Id's werden gelöscht) für die Post/Put-methoden
    let dataShortChoices: ChoicesShort[] = [];
    for(let r = 0; r < this.question.questionType.choices.length; r++){
      dataShortChoices.push({choice: this.question.questionType.choices[r].choice} );//,nextQuestionId: this.question.questionType.choices[r].nextQuestionId});
    }
      

    

    let dataShortQuestionType: QuestionTypeShort;
    dataShortQuestionType = {type: this.question.questionType.type, choices: dataShortChoices}; //,nextQuestionId: this.question.questionType.nextQuestionId};


    let dataShortCategory: QuestionCategoryShort[] = [];
    for(let r = 0; r < this.question.questionCategory.length; r++){
      dataShortCategory.push({category: this.question.questionCategory[r].category, processNumber: this.question.questionCategory[r].processNumber});
    }

   
    let dataShort: QuestionShort;

    dataShort = {question: this.question.question, questionType: dataShortQuestionType, hint: this.question.hint, formType: this.question.formType, questionCategories: dataShortCategory };
  
    
  


  this.api.editQuestion(this.urlEdit, dataShort, this.editId).subscribe(data => {console.log(data);this.data = data;this.dataDisplay = data;
    

    this.dataSetCat = new Set<String>();
    this.dataSetCat.add("keine Kategorie")
    for(let u1 = 0; u1 < data.length; u1++){
      for(let u2 = 0; u2 < data[u1].questionCategories.length; u2++){
      this.dataSetCat.add(data[u1].questionCategories[u2].category);
    }
  }


        this.dataSet =  new Set<String>();
        this.dataSet.add("Alle Fragen");
        for(let u = 0; u < data.length; u++){
          this.dataSet.add(data[u].formType);
        }
        console.log(this.dataSet);

  },err => {console.log(err);});


  
  this.editOn = false;
  this.deleteOn = false;

  location.reload();
  
}




deleteQuestion(): void{

this.deleteIdQuestion = this.question.id;
this.urlDelete = 'http://localhost:8090/frage/' + this.deleteIdQuestion + '/delete';

this.api.deleteQuestion(this.urlDelete, this.deleteIdQuestion).subscribe(data => {console.log(data);this.data = data; this.dataDisplay = data;

  this.dataSetCat = new Set<String>();
  this.dataSetCat.add("keine Kategorie")
  for(let u1 = 0; u1 < data.length; u1++){
    for(let u2 = 0; u2 < data[u1].questionCategories.length; u2++){
    this.dataSetCat.add(data[u1].questionCategories[u2].category);
  }
}


        this.dataSet =  new Set<String>();
        this.dataSet.add("Alle Fragen");
        for(let u = 0; u < data.length; u++){
          this.dataSet.add(data[u].formType);
        }
        console.log(this.dataSet);

},err => {console.log(err);});



this.deleteIdQuestion = -1;
this.deleteOn = false;
this.editOn = false;

location.reload();

}








  
createFrage(): void {

 
    this.api
      .getFrage(this.url)
      .subscribe(
        data => {
          console.log(data);
          this.data = data;
        },
        err => {
          console.log(err);
        }
      );



      //Change Frage
      if(this.data.length > 0){

        for(let t = 0; t < this.data.length; t++){
          
          if(this.data[t].id == this.frage.id){
            
            console.log("Entry changed!!!");

           
            for(let u2 = 0; u2 < this.realArray.length; u2++){

              this.antOpString += this.realArray[u2];

              if(u2 < this.realArray.length -1){
                this.antOpString += ";";
              }
          }
          this.frage.antwortOptionen = this.antOpString;



          this.api.updateFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});


            this.check = true;

          }

        }

      }




if(!this.check){
      if(this.data.length > 0){  
        this.currentId = this.data[this.data.length -1].id + 1;
        this.frage.id = this.currentId;
      }else{
        this.frage.id = 1;
      }
    //this.frage.antwortTyp = this.selectedValue;
    //this.frage.kategorie = this.selectedValueKat;


    for(let u = 0; u < this.realArray.length; u++){

        this.antOpString += this.realArray[u];
        if(u < this.realArray.length -1){
          this.antOpString += ";";
        }
    }

    this.frage.antwortOptionen = this.antOpString;
    //this.person.id = this.data[this.data.length - 1].id + 1;
    this.api.createFrage(this.frage, this.url).subscribe( data => data=> {console.log(data);this.data = data;}, err => {console.log(err);});
      

}

location.reload();


   // this.confirm = this.frage.frage + "   --> wurde hinzugefügt";    

  };



/** 

  deletePerson(dId: number): void {
    this.url2 = 'http://localhost:8080/person/' + this.deleteId;
    this.api.deletePerson(dId, this.url2).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };


  updatePerson(): void {
    this.api.updatePerson(this.personUp, this.url).subscribe( data2 => data2 => {console.log(data2);this.data2 = data2;}, err => {console.log(err);});

  };

**/



  addInput(){

    let ch: Choices = {id: 0, choice: "", questionType: null};

    this.antOpAnzahl += 1;
   // this.fakeArray = new Array(this.antOpAnzahl); 
    //this.fakeChoiceArray.push(this.antOpAnzahl);
    this.fakeChoiceArray = new Array(this.antOpAnzahl);

    //this.choiceArray.push(null);

    //this.choiceArray[this.choiceArray.length - 1].questionType = this.qtArray;

    ch.questionType = this.qtArray;

    if(this.choiceArray.length > 0){
      //this.choiceArray[this.choiceArray.length - 1].id = this.choiceArray[this.choiceArray.length - 2].id + 1;
      ch.id = this.choiceArray[this.choiceArray.length - 1].id + 1;
    }else{
      ch.id = 0;
      //this.choiceArray[this.choiceArray.length - 1].id = 0;
    }
      
    this.choiceArray.push(ch);
    

   
    console.log(this.choiceArray);
  }



  deleteInput(){

    if(this.antOpAnzahl > 0){
      this.antOpAnzahl -= 1;
      this.fakeChoiceArray = new Array(this.antOpAnzahl); 
      this.choiceArray.pop();
  }
  }






  addInputCat(){

    let cat: QuestionCategory = {id: 0, category: "kp", processNumber: 0};

    this.catOpAnzahl += 1;
   
    this.fakeCategoryArray = new Array(this.catOpAnzahl);


    //cat.category = this.qtArray;

    if(this.categoryArray.length > 0){
      
      cat.id = this.categoryArray[this.categoryArray.length - 1].id + 1;
    }else{
      cat.id = 0;
 
    }
      
    this.categoryArray.push(cat);
    

   
    console.log(this.categoryArray);
    console.log(this.fakeCategoryArray.length);
  }



  deleteInputCat(){

    if(this.catOpAnzahl > 0){
      this.catOpAnzahl -= 1;
      this.fakeCategoryArray = new Array(this.catOpAnzahl); 
      this.categoryArray.pop();
    }
  }








}



interface QuestionType{

id:number,
type:string,
choices:Array<Choices>,
//question:Question

}


interface QuestionCategory{

id:number,
category:string,
//questions:Array<Question>,
processNumber:number

}


interface Choices{

id:number,
choice:string,
questionType:Array<QuestionType>

}


interface Question{

id:number,
question:string,
questionType:QuestionType,
hint:string,
formType:string,
questionCategory:Array<QuestionCategory>


}


//--------------------------------------------------------------------------------------------------------------------------


interface QuestionTypeShort{

  type:string,
  choices:Array<ChoicesShort>,
  //nextQuestionId:number
  
  }
  
  
  interface QuestionCategoryShort{
  

  category:string,
  //questions:Array<Question>,
  processNumber:number
  
  }
  
  
  interface ChoicesShort{
  

  choice:string,
  //questionType:Array<QuestionTypeShort>,
  //nextQuestionId:number
  
  }
  
  
  interface QuestionShort{
  

  question:string,
  questionType:QuestionTypeShort,
  hint:string,
  formType:string,
  questionCategories:Array<QuestionCategoryShort>,
  
  
  }










interface Frage{
   
  id:number,
  frage:string,
  kategorie:string,
  antwortTyp:string,
  antwortOptionen:String,
  hinweis:string

}



interface Kategorien{
   
  id:number,
  name:string

}
