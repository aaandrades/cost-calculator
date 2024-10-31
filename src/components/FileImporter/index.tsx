import { FormEvent, useState } from "react";
import styles from "./FileImporter.module.css";

interface FileImporterProps {
  onCaptured: (file: any) => void;
}

const FileImporter = ({ onCaptured }: FileImporterProps) => {
  const [fileCaptured, setFileCaptured] = useState(false);
  const [fileData, setFileData] = useState<any>({});

  const handleFile = (file: FormEvent<HTMLInputElement>) => {
    console.log("FILE: ", file);
    if (file.currentTarget.files?.length) {
      const content = file.currentTarget.files[0];
      console.log("METADATA: ", content);
      setFileCaptured(true);
      setFileData(content);
      onCaptured(file);
    }
  };

  if (fileCaptured) {
    return <div className={styles.container_completed}>{fileData.name}</div>;
  }

  return (
    <>
      <label htmlFor="fileImporter" className={styles.importer}>
        Place your file here
      </label>
      <input
        id="fileImporter"
        className={styles.container}
        type="file"
        title="Insert file"
        onChange={handleFile}
      />
    </>
  );
};

export default FileImporter;
