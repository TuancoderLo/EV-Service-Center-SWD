import { useAuthStore } from "../store";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    isInitialized,
    setAuth,
    logout,
    clear,
    initialize,
    setLoading,
    updateUser,
  } = useAuthStore();

  const isAuthenticated = !!user && !!token;

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const isAdmin = hasRole("admin");
  const isStaff = hasRole(["admin", "staff"]);
  const isTechnician = hasRole(["admin", "staff", "technician"]);
  const isMember = hasRole("member");

  return {
    // State
    user,
    token,
    isLoading,
    isInitialized,
    isAuthenticated,

    // Role checks
    hasRole,
    isAdmin,
    isStaff,
    isTechnician,
    isMember,

    // Actions
    setAuth,
    logout,
    clear,
    initialize,
    setLoading,
    updateUser,
  };
};
