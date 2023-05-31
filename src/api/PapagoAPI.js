import axios from "axios";
import "../Config.js";
import { BACK_BASE_URL } from "../Config.js";
axios.defaults.withCredentials = true;

// export const isLoginSuccessed = async function (email, password) {
//     const data = await axios.post(
//         BACK_BASE_URL + "member/login",
//         {
//             email: email,
//             password: password,
//         },
//         {
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//             },
//             withCredentials: true,
//         }
//     );
//     return data;
// };

export const translateByPapago = async function (source, target, text) {
    const data = await axios.post(
        BACK_BASE_URL + "translation",
        {
            source: source,
            target: target,
            text: text,
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        }
    );
    return data.data;
};
