export const isCorrectEmail=function(email){
    let regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

export const isCorrectPassword=function(password){
    let regex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
}

export const isCorrectName=function(name){
    let regex=/^[가-힣]{2,5}$/;
    return regex.test(name);
}