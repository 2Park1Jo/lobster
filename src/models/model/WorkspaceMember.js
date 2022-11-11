export class WorkspaceMember{
    #members = [{
        email: "",
        workspaceId: "",
        memberName: "",
        workspaceGrade: "",
    }]

    updateModel(updatedModel){
        this.#members = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#members;
    }
}   