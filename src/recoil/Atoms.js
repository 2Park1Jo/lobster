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