import FollowTabs from "../_components/FollowTabs";

const FollowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <FollowTabs />
      {children}
    </div>
  );
};

export default FollowLayout;
