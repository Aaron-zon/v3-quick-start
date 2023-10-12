export const isExternal = (path) => {
    const reg = /^(https?:|mailto:|tel:)/;
    return reg.test(path);
};
