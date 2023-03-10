const CommentList = ({ comments }) => {
  return (
    <>
      <ul>
        {comments &&
          comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </>
  );
};

export default CommentList;
