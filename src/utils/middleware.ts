export const isPathProtected = (path: string) => {
    // check if it begins with /dashboard/*
    const REGEX = /^\/dashboard(\/|$)/;
    return REGEX.test(path);
}