import useAuthEffect from "../../hooks/useAuthEffect";

const Logout = () => {
    useAuthEffect((context, navigate) => {
        context.logout();
        navigate("/");
    });

    return <p>Logging out...</p>;
};

export default Logout;
