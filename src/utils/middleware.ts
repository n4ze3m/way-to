export const isPathProtected = (path: string) => {
    // check if it begins with /dashboard/*
    const REGEX = /^\/dashboard(\/|$)/;
    return REGEX.test(path);
}

export const isRedirectProtected = (path: string) => {
    // check if it begins with /dashboard/*
    const REGEX = /^\/r(\/|$)/;
    return REGEX.test(path);
}