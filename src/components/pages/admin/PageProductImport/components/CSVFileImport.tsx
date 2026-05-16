import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

function isCSVFile(file: File): boolean {
  return (
    file.type === "text/csv" ||
    file.type === "application/vnd.ms-excel" ||
    file.name.toLowerCase().endsWith(".csv")
  );
}

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(undefined), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selected = files[0];

    if (!isCSVFile(selected)) {
      setError("Only CSV files are allowed.");
      e.target.value = "";
      return;
    }

    setFile(selected);
  };

  const removeFile = () => {
    setFile(undefined);
    setError(undefined);
  };

  const uploadFile = async () => {
    if (!file) return;
    setError(undefined);

    try {
      console.log("uploadFile to", url);

      const response = await axios.get<string>(url, {
        params: { name: file.name },
      });

      console.log("File to upload: ", file.name);
      console.log("Uploading to: ", response.data);

      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "text/csv" },
      });

      if (!result.ok) {
        throw new Error(`Upload failed: ${result.status} ${result.statusText}`);
      }

      console.log("Result: ", result);
      setFile(undefined);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
      {!file ? (
        <input type="file" accept=".csv" onChange={onFileChange} />
      ) : (
        <div>
          <span style={{ marginRight: 8 }}>{file.name}</span>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
