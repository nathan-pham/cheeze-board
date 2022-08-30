import { FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, DocumentNode } from "@apollo/client";

import loadFormData from "../utils/loadFormData";
import { AuthContext } from "../components/AuthContext";

const useAuth = (MUTATION: DocumentNode, mutationKey: string) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        addUser({ variables: loadFormData(e.target as HTMLFormElement) });
    };

    const [addUser, { loading }] = useMutation(MUTATION, {
        update(_, result) {
            navigate("/");
            context.login(result.data[mutationKey]);
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
