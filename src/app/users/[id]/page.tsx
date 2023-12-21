export default async function UserDetails({
  params,
}: {
  params: { id: string };
}) {
  const user = await fetch(`/api/user/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const renderUsername = () => {
    return <div className="text-xl">{user.username}</div>;
  };

  const renderDetailsWidget = () => {
    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-1/3">
          <div className="text-lg font-semibold">Password</div>
          <div>{user.password}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Name</div>
          <div>{user.name}</div>
        </div>
        <div className="flex flex-col w-1/3 ml-4">
          <div className="text-base font-semibold">Role</div>
          <div>{user.role}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="p-4 border-b-2 flex flex-row justify-between">
        <div className="">{renderUsername()}</div>
      </div>

      <div className="py-4 px-6 flex flex-row">
        <div className="w-1/2">{renderDetailsWidget()}</div>
      </div>
    </div>
  );
}
