import {atom} from 'recoil';


export const MEMBER_LIST = atom({
	key : 'memberState',
    default : [{
        email: "",
        password: "",
        name: "test",
    }],
});

export const WORKSPACE_ID = atom({
    key : 'accessedWorkspaceId',
    default : "",
});