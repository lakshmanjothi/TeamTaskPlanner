import Task from "./taskclass.js"
export default class Taskmanager extends Task{
    constructor(id,name,details,assignee,dueDate,status){
        super(id,name,details,assignee,dueDate,status);
    }
    //show and store task works together like display and store in the local storage
    showData(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
        console.log(this.status);
        this.showHtml(this.id,this.name,this.details,this.assignee,this.dueDate,this.status);
        console.log(this.id);
        return this;
    }
    //refresh fields after display or edit
    clearFields(){
        document.getElementById("name").value="";
        document.getElementById("details").value="";
        document.getElementById("dueDate").value="";
    }
    //store the tasks in the local storage
    storeTask(){
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment for ??
        const allData=JSON.parse(localStorage.getItem("tasks"))??[];
        allData.push({id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status});
        localStorage.setItem("tasks",JSON.stringify(allData));
    }
    //show the tasks if it in the local storage in the webpage
    showTasks(){
        if(localStorage.getItem("tasks")){
            JSON.parse(localStorage.getItem("tasks")).forEach((item)=>{
                console.log(item);
                this.showHtml(item.id,item.name,item.details,item.assignee,item.dueDate,item.status);
                console.log("going to display");
                console.log(item.id);
            });
        }
    }
    //display in the webpage
    showHtml(id,name,details,assignee,dueDate,status){
        //card display
        console.log("starting to display");
        console.log(id);
        const taskRow=document.createElement("col");
        taskRow.innerHTML=`
        <div class="card mt-4 mr-4" style="width:18rem;">
        <div class="card-header bg-info text-white">Due Date: ${dueDate}</div>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text text-wrap">Description: ${details}</p>
            <hr>
            <p class="card-text"><strong>Assigned to:</strong> ${assignee}</p>
            <p class="card-text"><strong>Status:</strong> ${status}</p>
            <hr>
            <button id="edit" class="btn btn-info edit mx-4" data-id="${id}">Edit</button>
            <button id="delete" class="btn btn-danger delete" data-id="${id}">Delete</button>
            </div> 
            </div>
      </div>`
      document.querySelector("#example").appendChild(taskRow);
    }
    //pass the id from the call function while submitting the update and check for id in the local storage and the editing id and store it in the local storage. if no checking it will append
    updateTask(id){
        console.log("hello");
        const newItem={id:this.id,name:this.name,details:this.details,assignee:this.assignee,dueDate:this.dueDate,status:this.status};
        console.log(newItem);
        const updatedData=JSON.parse(localStorage.getItem("tasks")).map((item)=>{
            if(item.id == id){ 
                return newItem;}
            return item;
        });
        console.log(updatedData);
        localStorage.setItem("tasks",JSON.stringify(updatedData));
        window.location.reload();
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
            console.log(newData);
            newData.forEach((item)=>{
                this.showData(item.id,item.name,item.details,item.assignee,item.dueDate,item.status); 
                console.log(item.id);
            });
        }
    }
}


