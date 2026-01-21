import Can from "../Guard/Can";

const Card = ({ Permissions, children }) => {
  if (Permissions) {
    return (
      <Can permission={Permissions}>
        <div className="bg-white rounded shadow p-4">
          {children}
        </div>
      </Can>
    );
  }
  return (
    <div className="bg-white rounded shadow p-4">
      {children}
    </div>
  );
};

export default Card;