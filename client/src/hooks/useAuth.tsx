import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, DocumentNode } from "@apollo/client";

import loadFormData from "../utils/loadFormData";

const useAuth = (MUTATION: DocumentNode) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        addUser({ variables: loadFormData(e.target as HTMLFormElement) });
    };

    const [addUser, { loading }] = useMutation(MUTATION, {
        update(_, result) {
            navigate("/");
        },
        onError(e: any) {
            setErrors(e.graphQLErrors[0].extensions.errors);
        },
    });

    return {
        errors,
        loading,
        onSubmit: loading ? () => {} : onSubmit,
    };
};

export default useAuth;
