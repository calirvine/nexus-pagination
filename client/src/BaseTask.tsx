export function BaseTask({
  title,
  complete,
  children,
}: {
  title: string;
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="card-header-area">
        <span className="card-heading">{title}</span>
        Complete: {complete ? "👍" : "😖"}
      </div>
      <div className="card-body-area">{children}</div>
    </div>
  );
}
