import { useDispatch, useSelector } from "react-redux";
import Table from "../atoms/Table";
import { useEffect } from "react";
import { getUsers } from "../store/slices/usersSlice";
import RoundedLoader from "../atoms/RoundedLoader";

const tableHeader = [
  "First Name",
  "Last Name",
  "Email",
  "Avatar",
  "Role",
  "Controllers",
];

const UsersPage = () => {
  const { users, isPending } = useSelector((state) => state.usersSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers({ token: user.token }));
  }, [dispatch, user]);

  return (
    <>
      <section className="bg-secondary-800 min-h-[100svh] px-3 flex flex-col gap-6 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold  py-1  text-secondarybreakColor border-b-2 border-mainBreakColor">
            Users
          </h1>

          <button className="bg-green-800 border px-2 py-1 rounded text-secondarybreakColor transition hover:bg-green-900 active:scale-95">
            Add User
          </button>
        </div>
        {!isPending ? (
          <Table tHeadItems={tableHeader} tBodyItems={users} />
        ) : (
          <RoundedLoader />
        )}
      </section>
    </>
  );
};

export default UsersPage;
