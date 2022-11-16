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

    getIdList(workspaceId){
        let departmentIdList = [];

        this.getAll().map((department) => {
            if(department.workspaceId === workspaceId){
                departmentIdList.push(department.departmentId);
            }
        })

        return departmentIdList;
    }
    
    getGoal(departmentId) {
        let goal="";
        this.getAll().map((department) => {
            if (department.departmentId === departmentId){
                goal= department.departmentGoal;
            }
        })
        return goal;
    }
    
    getDeadLine(departmentId) {
        let deadLine = "";

        this.getAll().map((department) => {
            if (department.departmentId === departmentId){
                deadLine = department.departmentDeadline;
            }
        })
        return deadLine;
    }

    getName(departmentId) {
        let name = "";

        this.getAll().map((department) => {
            if (department.departmentId === departmentId){
                name = department.departmentName;
            }
        })
        return name;
    }

    getDDay(departmentId){
        return calculateDDay(this.getDeadLine(departmentId))
    }

}