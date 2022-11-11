export class DepartmentMember{
    #members = [{
        departmentId: "",
        email: "",
        memberName: "",
        departmentRole: "",
        departmentGrade: ""
    }]

    updateModel(updatedModel){
        this.#members = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#members;
    }
}   