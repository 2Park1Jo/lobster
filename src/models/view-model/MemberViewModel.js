export class MemberViewModel{
    
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getName(email){
        this.model.map((member) => {
            if (member.email === email){
                return member.name;
            }
        })
    }
}