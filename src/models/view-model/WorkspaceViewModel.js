import { calculateDDay } from '../../utils/DataProcessing'

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
        this.model.map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                return workspace.workspaceDeadline;
            }
        })
    }

    getGoal(workspaceId){
        this.model.map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                return workspace.workspaceGoal;
            }
        })
    }

    getName(workspaceId){
        this.model.map((workspace) => {
            if (workspace.workspaceId === workspaceId){
                return workspace.workspaceName;
            }
        })
    }

    getDDay(workspaceId){
        return calculateDDay(this.getDeadLine(workspaceId))
    }
}