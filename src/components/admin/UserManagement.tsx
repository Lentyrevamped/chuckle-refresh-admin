import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addUser, getAllUsers, deleteUser, changePassword } from "@/lib/users";

export const UserManagement = ({ loggedInUser }: { loggedInUser: string }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewUserAdmin, setIsNewUserAdmin] = useState(false);
  const [changePasswordUsername, setChangePasswordUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast({
        title: "Error loading users",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleAddUser = async () => {
    if (newUsername && newPassword) {
      try {
        await addUser(newUsername, newPassword, isNewUserAdmin);
        setNewUsername("");
        setNewPassword("");
        setIsNewUserAdmin(false);
        await loadUsers();
        toast({
          title: "User added successfully",
          description: `New ${isNewUserAdmin ? "admin" : "regular"} user created`,
        });
      } catch (error) {
        toast({
          title: "Error adding user",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteUser = async (username: string) => {
    try {
      await deleteUser(username, loggedInUser);
      await loadUsers();
      toast({
        title: "User deleted",
        description: "The user has been removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting user",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      if (changePasswordUsername && newUserPassword) {
        await changePassword(changePasswordUsername, newUserPassword, loggedInUser);
        setChangePasswordUsername("");
        setNewUserPassword("");
        toast({
          title: "Password changed",
          description: "The user's password has been updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error changing password",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="glass-card p-8 rounded-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Add New User</h2>
          <p className="text-muted-foreground">Create a new user account</p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isNewUserAdmin}
              onChange={(e) => setIsNewUserAdmin(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="isAdmin">Admin access</label>
          </div>
          <Button onClick={handleAddUser} className="w-full button-hover">
            Add User
          </Button>
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Change User Password</h2>
          <p className="text-muted-foreground">Update a user's password</p>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={changePasswordUsername}
            onChange={(e) => setChangePasswordUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New Password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <Button onClick={handleChangePassword} className="w-full button-hover">
            Change Password
          </Button>
        </div>
      </div>

      <div className="glass-card p-8 rounded-xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">View and manage existing users</p>
        </div>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.username}
              className="p-4 bg-secondary rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{user.username}</p>
                <span className="text-xs text-primary mt-1 block">
                  {user.isAdmin ? "Admin User" : "Regular User"}
                </span>
              </div>
              {user.username !== "Lenty" && (
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.username)}
                  className="button-hover"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};