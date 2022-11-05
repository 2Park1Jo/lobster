
let memberData = [
    {
        email: 'test1@naver.com',
        password: 'qwe123!',
        name: '박대원'
    },
    {
        email: 'test2@naver.com',
        password: 'qwe123@',
        name: '조형준'
    },
    {
        email: 'test3@naver.com',
        password: 'qwe123#',
        name: '박민지'
    },
    {
        email: 'test4@naver.com',
        password: 'qwe123$',
        name: '홍영환'
    },
    {
        email: 'test5@naver.com',
        password: 'qwe123%',
        name: '조준희'
    },
    {
        email: 'test6@naver.com',
        password: 'qwe123^',
        name: '김영림'
    },
    {
        email: 'test7@naver.com',
        password: 'qwe123&',
        name: '테스터'
    },
];

export function getMemberData() {
    return memberData;
}

export function getMemberName(email) {
    for (let index = 0; index < memberData.length; index++){
        if (memberData[index].email === email){
            return memberData[index].name;
        }
    }
    return "";
}

