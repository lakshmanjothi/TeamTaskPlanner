import Task from "./taskclass.js"

export default class Taskmanager extends Task{
    constructor(id,name,details,assignee,dueDate,status){
        super(id,name,details,assignee,dueDate,status);
    }
    //show and store task works together like display and store in the local storage
    addTask(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
        this.displayHtml(this.id,this.name,this.details,this.assignee,this.dueDate,this.status);
        return this;
    }
    //refresh fields after display or edit
    clearFields(){
        document.getElementById("name").value="";
        document.getElementById("details").value="";
        document.getElementById("dueDate").value=new Date().toISOString().slice(0, 10);;
        document.getElementById("status").value="To Do";
    }
    //store the tasks in the local storage
    storeTask(){
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
        const allData=JSON.parse(localStorage.getItem("tasks"))??[];
        allData.push({id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status});
        localStorage.setItem("tasks",JSON.stringify(allData));
    }
    //show the tasks if it in the local storage in the webpage
    displayTask(){
        if(localStorage.getItem("tasks")){
            JSON.parse(localStorage.getItem("tasks")).forEach((item)=>{
                this.displayHtml(item.id,item.name,item.details,item.assignee,item.dueDate,item.status);
            });
        }
    }
    //display in the webpage
    displayHtml(id,name,details,assignee,dueDate,status){
        //card display
        const taskRow=document.createElement("col");
        taskRow.innerHTML=`
        <div class="card mt-4 mr-4" style="width:20rem;">
        <div class="card-header bg-info text-white">Due Date: ${dueDate}</div>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-wrap">Description: ${details}</p>
            <hr>
            <p class="card-text"><strong>Assigned to:</strong> ${assignee}</p>
            <p class="card-text"><strong>Status:</strong> ${status}</p>
            <hr>
            <button id="edit" class="btn btn-info edit mx-4 far fa-edit" data-id="${id}"></button>
            <button id="delete" class="btn btn-danger delete fas fa-trash-alt" data-id="${id}"></button>
            </div> 
            </div>
      </div>`
      document.querySelector("#example").appendChild(taskRow);
    }
    //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append
    updateTask(id){
        const newItem={id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status};
        const taskStorage=JSON.parse(localStorage.getItem("tasks"));
        const updatedData=taskStorage.map((item)=>{
            if(item.id == id){ 
                return newItem;}
            return item;
        });
        localStorage.setItem("tasks",JSON.stringify(updatedData));
        // this.refresh();
    }
    //delete from the localstorage
    deleteTask(id){
        let emps=JSON.parse(localStorage.getItem("tasks"));
        let newData=emps.filter(item=>item.id!=id);
        localStorage.setItem("tasks",JSON.stringify(newData));
    }
    //display as per the status
    displayFilter(status){
        let emps=JSON.parse(localStorage.getItem("tasks"));
        if(emps!=[]){
            document.querySelector("#example").innerHTML="";
            let newData=emps.filter(item=>item.status==status);
            newData.forEach((item)=>{
                this.addTask(item.id,item.name,item.details,item.assignee,item.dueDate,item.status); 
            });
        }
    }
    // refresh(){
    //     window.location.reload();   
    // }
}


