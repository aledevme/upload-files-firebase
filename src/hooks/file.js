const converter = (file) => {
    const name = file.name;
    const lastDot = name.lastIndexOf('.');

    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    return {
        fileName,
        ext
    }
}

export {
    converter
}
