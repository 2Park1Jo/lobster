import { calculateDDay, calculateProgress } from '../../utils/DataProcessing'

export class WorkspaceViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getDeadLine(workspaceId){
        let workspaceDeadline = "";

        this.getAll().map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                workspaceDeadline = workspace.workspaceDeadline;
            }
        })

        return workspaceDeadline;
    }

    getGoal(workspaceId){
        let workspaceGoal = "";

        this.getAll().map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                workspaceGoal = workspace.workspaceGoal;
            }
        })

        return workspaceGoal;
    }

    getName(workspaceId){
        let workspaceName = "";

        this.getAll().map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                workspaceName = workspace.workspaceName;
            }
        })

        return workspaceName;
    }

    getCreationDate(workspaceId){
        let workspaceCreationDate = "";

        this.getAll().map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                workspaceCreationDate = workspace.creationDate;
            }
        })

        return workspaceCreationDate;    
    }

    getWorkspaceProgress(workspaceId){
        return calculateProgress(this.getCreationDate(workspaceId), this.getDeadLine(workspaceId))
    }

    getDDay(workspaceId){
        return calculateDDay(this.getDeadLine(workspaceId))
    }
}