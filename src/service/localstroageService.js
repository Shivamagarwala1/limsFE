//isloggedin
export const isloggedin = () => {
    let data = localStorage.getItem("imarsar_laboratory");

    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

//dologin=>set localstorage
export const dologin = (data, next) => {
    localStorage.setItem("imarsar_laboratory", JSON.stringify(data));
    next();
}

//dologout => remove from localstorage
export const dologout = (next) => {
    localStorage.removeItem("imarsar_laboratory");
    //localStorage.removeItem("clockin");
    next()
}

//isPasswordForgot
export const isNeedToPasswordForgot = () => {
    let data = localStorage.getItem("isPasswordForgot");

    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

//doPasswordForgot=>set localstorage
export const doPasswordForgot = (data) => {
    localStorage.setItem("isPasswordForgot", JSON.stringify(data));
}

//removePasswordForgot => remove from localstorage
export const removePasswordForgot = (next) => {
    localStorage.removeItem("isPasswordForgot");
    next()
}

//get curent user data
export const getLocalStroageData = () => {
    if (isloggedin()) {
        return JSON.parse(localStorage.getItem("imarsar_laboratory"));
    } else {
        return undefined;
    }
}



//theme
//isloggedin
export const isActiveTheme = () => {
    let data = localStorage.getItem("activeTheme");

    if (data !== null) {
        return true;
    } else {
        return false;
    }
}


export const doActiveTheame = (data, next) => {
    localStorage.setItem("activeTheme", JSON.stringify(data));
    next();
}

//save default centerid
export const saveDefaultCentreId = (data) => {
    localStorage.setItem("defaultLoginUserCentreId", JSON.stringify(data));

}

//get default centre id
export const getDefaultCentreId = () => {
    let data = localStorage.getItem("defaultLoginUserCentreId");

    if (data !== null) {
        return data;
    } else {
        return null;
    }
}

// get token from local stroage
export const getToken = () => {
    if (isloggedin()) {
        return JSON.parse(localStorage.getItem("imarsar_laboratory")).token
    } else {
        return null;
    }
}