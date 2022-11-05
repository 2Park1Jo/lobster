export class WorkspaceMemberViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getMembers(workspaceId){
        let filteredWorkspaceMember = [];
        
        this.getAll().map((member) => {
            if (member.workspaceId === workspaceId){
                filteredWorkspaceMember.push(member);
            }
        })
        return filteredWorkspaceMember;
    }

}