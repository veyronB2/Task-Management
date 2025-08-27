export const capitalizeStringFirstCharacter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const convertStringToPascalWithSpaces = (text: string, enableAcronyms: boolean = true) => {
    let result;

    if (enableAcronyms) {
        result = text.replace(/([A-Z]+(?=[A-Z][a-z])|[A-Z][a-z])/g, " $&").replace(/([A-Z]{2,})(?=\s|$)/g, "$1").trim();
    } else {
        result = text.replace(/([A-Z])/g, " $1").trim();
    }

    result = result.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim();

    return capitalizeStringFirstCharacter(result);
};

