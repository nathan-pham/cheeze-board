const loadFormData = (target: HTMLFormElement) => {
    const formData = new FormData(target);
    const variables: Record<string, string> = {};
    for (const [key, value] of formData) {
        variables[key.toString()] = value.toString();
    }

    return variables;
};

export default loadFormData;
