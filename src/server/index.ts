"use server";

// Function processed on the server
export const processFileContent = async (file: string) => {
  console.log("Received data:", file);
  const message = file + file;
  return { message };
};
