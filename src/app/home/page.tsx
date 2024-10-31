"use client";

import FileImporter from "@/components/FileImporter";
import styles from "./home.module.css";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useState } from "react";
import * as XLSX from "xlsx";
import { simulateAsync } from "@/utils";

const Home = () => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);

  // UnComment this function to handle the server function
  // const getInternalApi = async () => {
  //   const data = await processFileContent(file);
  //   console.log("MESSAGE: ", data);
  // };

  const handleFileUpload = async () => {
    setLoading(true);
    if (!file) {
      return;
    }
    const content = file.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) {
        return;
      }
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
      simulateAsync(1500).then(() => setLoading(false));
    };

    reader.readAsBinaryString(content);
  };

  const restart = () => {
    setFile(null);
    setData([]);
  };

  const renderFirstStep = () => {
    return (
      <>
        <FileImporter onCaptured={(file) => setFile(file)} />
        <Button
          title="API"
          type="button"
          onClick={handleFileUpload}
          disabled={!file}
        >
          Process file
        </Button>
      </>
    );
  };

  const renderSecondStep = () => {
    const head = Object.keys(data[0]);
    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {head.map((h) => (
                  <td key={h}>{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button title="API" type="button" onClick={restart}>
          Back
        </Button>
      </>
    );
  };

  return (
    <article className={styles.container}>
      <Card>
        <h1 className={styles.title}>Cost total calculation</h1>
        {loading ? (
          <div className="loader"></div>
        ) : data.length ? (
          renderSecondStep()
        ) : (
          renderFirstStep()
        )}
      </Card>
    </article>
  );
};

export default Home;
