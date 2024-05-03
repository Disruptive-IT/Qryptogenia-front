const roles = {
  ADMIN: ["read", "write", "delete"],
  CLIENT: ["read"],
  GUEST: [], //? El no autenticado
};

export default roles;
