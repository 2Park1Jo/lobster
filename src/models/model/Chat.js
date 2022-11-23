export class Chat{
    #chats = [{
        chatId: "",
        departmentId: "",
        memberEmail: "",
        content: "",
        date: "",
        contentType: "",
        link: "",
    }]

    updateModel(updatedModel){
        this.#chats = updatedModel; // 서버에서 업데이트
    }

    getModel(){
        return this.#chats;
    }
}   