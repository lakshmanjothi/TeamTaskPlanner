export default class Task{
    //constructor for Task
    constructor(id,name,details,assignee,dueDate,status){
        this.id=id;
        this.name=name;
        this.details=details;
        this.assignee=assignee;
        this.dueDate=dueDate;
        this.status=status;
    }
}