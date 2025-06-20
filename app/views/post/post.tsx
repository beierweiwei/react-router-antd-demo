export type PostItem = {
  title: string;
  content: string;
};
export function Post(props: PostItem) {
  const { title, content } = props;
  return (
    <div>
      <h3>{title}</h3>
      <div className="post-detail-main">
        <p>{content}</p>
      </div>
    </div>
  );
}
