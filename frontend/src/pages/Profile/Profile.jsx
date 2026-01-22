import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileForm from "./ProfileForm.jsx";
import {
  getMyProfile,
  getUserById,
} from "../../api/user.api.js";
import { useAuth } from "../../auth/AuthContext.jsx";
import { PERMISSIONS } from "../../utils/permission.js";

const Profile = ({ mode = "self" }) => {
  const { userId } = useParams();
  const { permissions } = useAuth();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const canEdit =
    permissions.includes(PERMISSIONS.EMPLOYEE_UPDATE_SELF) ||
    permissions.includes(PERMISSIONS.EMPLOYEE_UPDATE_ALL);

  useEffect(() => {
    const fetchProfile = async () => {
      let res;

      if (mode === "self") {
        res = await getMyProfile();
      } else {
        res = await getUserById(userId);
      }

      // 🔴 IMPORTANT: unwrap response safely
      const data = res.data.data || res.data.user || res.data;
      setProfile(data);
    };

    fetchProfile();
  }, [mode, userId]);

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {mode === "self" ? "My Profile" : "Employee Profile"}
        </h1>

        {canEdit && !editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* READ MODE */}
      {!editMode && (
        <div className="grid grid-cols-2 gap-4">
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Role:</b> {profile.role}</p>
          <p><b>Status:</b> {profile.isActive ? "Active" : "Inactive"}</p>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <ProfileForm
          data={profile}
          mode={mode}
          onCancel={() => setEditMode(false)}
          onSave={(updated) => {
            setProfile(updated);
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;



