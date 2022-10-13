let memberData = [
    {
        memberEmail: 'test1@naver.com',
        memberPassword: 'qwe123!',
        memberName: '박대원'
    },
    {
        memberEmail: 'test2@naver.com',
        memberPassword: 'qwe123@',
        memberName: '조형준'
    },
    {
        memberEmail: 'test3@naver.com',
        memberPassword: 'qwe123#',
        memberName: '박민지'
    },
    {
        memberEmail: 'test4@naver.com',
        memberPassword: 'qwe123$',
        memberName: '홍영환'
    },
    {
        memberEmail: 'test5@naver.com',
        memberPassword: 'qwe123%',
        memberName: '조준희'
    },
    {
        memberEmail: 'test6@naver.com',
        memberPassword: 'qwe123^',
        memberName: '김영림'
    },
    {
        memberEmail: 'test7@naver.com',
        memberPassword: 'qwe123&',
        memberName: '테스터'
    },
];

export function getMemberData() {
    return memberData;
}

export function getMemberName(memberEmail) {
    for (let index = 0; index < memberData.length; index++){
        if (memberData[index].memberEmail === memberEmail){
            return memberData[index].memberName;
        }
    }
    return "";
}

