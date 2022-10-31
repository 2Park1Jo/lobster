export class Workspace{
    #workspaces = [{
        workspaceId: "",
        workspaceName: "",
        workspaceGoal: "",
        workspaceDeadline: ""
    }]

    updateModel(updatedModel){
        this.#workspaces = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#workspaces;
    }
}   