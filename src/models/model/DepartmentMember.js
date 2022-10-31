export class DepartmentMember{
    #members = [{
        departmentId: "",
        email: "",
        name: "",
        role: "",
        grade: ""
    }]

    updateModel(updatedModel){
        this.#members = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#members;
    }
}   