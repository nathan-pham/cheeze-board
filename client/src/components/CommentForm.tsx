import Comment from "./Comment";

interface CommentFormProps {
    id: string;
}

const CommentForm = () => {
    return (
        <form>
            <input type="text" name="body" placeholder="What do you think?" />
            <button>Send</button>
        </form>
    );
};

export default CommentForm;
