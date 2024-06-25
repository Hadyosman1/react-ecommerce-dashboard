import { Notyf } from "notyf";
const notyf = new Notyf();

const checkFileSize = (file) => {
  const size = file.size / 1024 / 100;

  if (size.toFixed() >= 31) {
    notyf.error("file size must be less than 3 MB..!");
    return false;
  }

  return true;
};

export default checkFileSize;
