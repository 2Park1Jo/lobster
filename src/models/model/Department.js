export class Department{
    #departments = [{
        workspaceId:"",
        departmentId: "",
        departmentName: "",
        departmentGoal: "",
        departmentDeadline: ""
    }]

    updateModel(updatedModel){
        this.#departments = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#departments;
    }
}   