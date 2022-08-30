interface ErrorsProps {
    errors: Record<string, string>;
}

const Errors = ({ errors }: ErrorsProps) => {
    return (
        <ul>
            {Object.entries(errors).map(([key, value]) => (
                <li key={key}>{value}</li>
            ))}
        </ul>
    );
};

export default Errors;
