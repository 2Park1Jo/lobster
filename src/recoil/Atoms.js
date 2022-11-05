import {atom} from 'recoil';


export const LOGIN_MEMBER = atom({
	key : 'loginMember',
    default : [{
        email: "",
        name: "",
    }],
});

export const WORKSPACE_ID = atom({
    key : 'accessedWorkspaceId',
    default : "",
});

export const ACCESSED_DEPARTMENT = atom({
    key : 'accessedDepartment',
    default : [{
        id: "1",
        name: "공지방",
    }],
});