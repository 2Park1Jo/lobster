export class Chat{
    #chats = [{
        workspaceId: "",
        departmentId: "",
        memberEmail: "",
        content: "",
        date: "",
        content_type: "",
        link: "",
    }]

    updateModel(updatedModel){
        this.#chats = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#chats;
    }
}   