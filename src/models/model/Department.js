export class Department{
    #departments = [{
        departmentId: "",
        departmentName: "",
        departmentGoal: "",
        departmentDeadLine: ""
    }]

    updateModel(updatedModel){
        this.#departments = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#departments;
    }
}   