import { calculateDDay } from '../../utils/DataProcessing'

export class DepartmentViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    get(workspaceId){
        let filteredDepartmentList = [];

        this.getAll().map((department) => {
            if(department.workspaceId === workspaceId){
                filteredDepartmentList.push(department);
            }
        })

        return filteredDepartmentList;
    }
    
    getGoal(departmentId) {
        this.getAll().map((department) => {
            if (department.departmentId === departmentId){
                return department.departmentGoal;
            }
        })
    }
    
    getDeadLine(departmentId) {
        let deadLine = "";

        this.getAll().map((department) => {
            if (department.departmentId === departmentId){
                deadLine = department.departmentDeadLine;
            }
        })
        return deadLine;
    }

    getDDay(departmentId){
        return calculateDDay(this.getDeadLine(departmentId))
    }

}