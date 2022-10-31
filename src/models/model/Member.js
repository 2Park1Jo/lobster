export class Member{
    #members = [{
        email: "",
        password: "",
        name: "",
    }]

    updateModel(updatedMember){
        this.#members = updatedMember; // 서버에서 업데이트
    }

    getMember(){
        return this.#members;
    }
}   