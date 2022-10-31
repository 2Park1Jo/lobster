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
    
    getGoal(departmentId) {
        this.model.map((department) => {
            if (department.departmentId === departmentId){
                return department.departmentGoal;
            }
        })
    }
    
    getDeadLine(departmentId) {
        this.model.map((department) => {
            if (department.departmentId === departmentId){
                return department.departmentDeadLine;
            }
        })
    }

    getDDay(departmentId){
        return calculateDDay(this.getDeadLine(departmentId))
    }

}