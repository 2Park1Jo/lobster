export class DepartmentMemberViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getMembers(departmentId){
        let filteredDepartmentMember = [];
        
        this.getAll().map((member) => {
            if (member.departmentId === departmentId){
                filteredDepartmentMember.push(member);
            }
        })
        return filteredDepartmentMember;
    }

    getMemberName(memberEmail){
        let memberName = "";

        this.getAll().map((member) => {
            if (member.email === memberEmail){
                memberName = member.name;
            }
        })

        return memberName;
    }

}