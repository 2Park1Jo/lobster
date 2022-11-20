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

    getFiles(departmentId){
        let files = [];
        this.getChats(departmentId).map( (chat) => {
            if(chat.contentType === '1'){
                files.push(chat)
            }
        })

        return files;
    }

    getImgs(departmentId){
        let imgs = [];
        this.getChats(departmentId).map( (chat) => {
            if(chat.contentType === '2'){
                imgs.push(chat)
            }
        })

        return imgs;
    }
}