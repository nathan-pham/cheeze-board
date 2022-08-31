import { RefObject } from "react";

const clearFormRef = (formRef: RefObject<HTMLFormElement>) => {
    if (formRef.current) {
        formRef.current.document
            .querySelectorAll("input")
            .forEach((input: HTMLInputElement) => {
                input.value = "";
            });
    }
};

export default clearFormRef;
