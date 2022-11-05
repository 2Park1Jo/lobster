export class ChatViewModel{
    constructor(model){
        this.model = model;
    }

    update(updatedModel){
        this.model.updateModel(updatedModel);
    }

    getAll(){
        return this.model.getModel();
    }

    getChats(departmentId){
        let chats = [];
        this.getAll().map( (chat) => {
            if(chat.departmentId === departmentId){
                chats.push(chat)
            }
        })

        return chats;
    }
}