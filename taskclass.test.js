import Task from "./taskclass.js";
test("Task Constructor", () => {
    const task = new Task("1", "Project", "Project Completion", "Lakshman", "28/08/2020", "To Do");
    expect(task.id).toBe("1");
    expect(task.name).toBe("Project");
    expect(task.details).toBe("Project Completion");
    expect(task.assignee).toBe("Lakshman");
    expect(task.dueDate).toBe("28/08/2020");
    expect(task.status).toBe("To Do");
});