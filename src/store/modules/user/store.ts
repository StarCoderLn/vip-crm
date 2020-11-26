export const createState = () => {
  const store = {
    tableData: [],
    loading: false,
  };
  return store;
};

export type userState = ReturnType<typeof createState>;
