let departmentMemberData = [
    {
        departmentId: '1_1',
        email: 'test1@naver.com',
        name: '박대원',
        role: '꿀벌',
        grade: ''
    },
    {
        departmentId: '1_2',
        email: 'test1@naver.com',
        name: '박대원',
        role: '',
        grade: ''
    },
    {
        departmentId: '1_1',
        email: 'test2@naver.com',
        name: '조형준',
        role: '치타',
        grade: ''
    },
    {
        departmentId: '1_1',
        email: 'test3@naver.com',
        name: '박민지',
        role: '에이스',
        grade: ''
    },
    {
        departmentId: '1_2',
        email: 'test3@naver.com',
        name: '박민지',
        role: '',
        grade: ''
    },
    {
        departmentId: '1_3',
        email: 'test4@naver.com',
        name: '홍영환',
        role: '',
        grade: ''
    },
    {
        departmentId: '1_3',
        email: 'test5@naver.com',
        name: '조준희',
        role: '',
        grade: ''
    },
    {
        departmentId: '1_3',
        email: 'test6@naver.com',
        name: '김영림',
        role: '',
        grade: ''
    },
    {
        departmentId: '1_3',
        email: 'test1@naver.com',
        name: '박대원',
        role: '',
        grade: ''
    },
];

export function getDepartmentMemberData() {
    return departmentMemberData;
}

export function setDepartmentMemberData(inputDepartmentMemberData) {
    departmentMemberData = inputDepartmentMemberData;
}