/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Input,
  Link,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { FormContext } from "../DynamicForm";
import createLabel from "../util/createLabel";

const FileComponent = (props) => {
  const { config, updateField } = props;
  const { data, token } = useContext(FormContext);

  const label = createLabel(config);
  const key = config.key;
  const url = config.url;
  const [droppedFiles, setDroppedFiles] = useState(data[key]);
  const disabled = config?.disabled || false;
  const viewOnly = config?.viewOnly || false;

  let maxIndex = 0;
  for (const file of droppedFiles) {
    maxIndex = Math.max(maxIndex, file.indexId);
  }

  const [, setFileIndexCounter] = useState(maxIndex + 1);

  const [uploadProgress, setUploadProgress] = useState({
    fileName: "",
    percentCompleted: 100,
    completed: true,
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const newErrorMessages = [];

      for (const file of acceptedFiles) {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("data", JSON.stringify(data));

        try {
          const response = await axios.post(url, formdata, {
            onUploadProgress: (progress) => {
              const percentCompleted = Math.floor(
                (progress.loaded * 100) / progress.total,
              );
              setUploadProgress({
                fileName: file.name,
                percentCompleted: percentCompleted,
                completed: false,
              });
            },
          });

          if (response.status === 200) {
            setFileIndexCounter((prev) => {
              file.indexId = prev;
              return prev + 1;
            });

            file.data = {
              name: file.name,
              key: response.data.key,
              local: response.data.local,
              size: file.size,
              type: file.type,
            };

            setDroppedFiles((prevFiles) => [...prevFiles, file]);
            setUploadProgress({
              ...uploadProgress,
              completed: true,
            });
          }
        } catch (error) {
          const message = error?.response?.data?.message || "Error.";
          newErrorMessages.push(`${file.name}: ${message}`);
        }
      }

      setErrorMessages(newErrorMessages);
    },
    [data],
  );

  useEffect(() => {
    updateField(key, droppedFiles);
  }, [droppedFiles, key]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid item xs={12}>
      {label}
      <UploadedFilesTable
        id={key}
        files={droppedFiles}
        setDroppedFiles={setDroppedFiles}
        viewOnly={viewOnly}
        disabled={disabled}
        token={token}
      />
      <ProgressBar uploadProgress={uploadProgress} />
      <ErrorMessageArea errorMessages={errorMessages} />
      {!viewOnly && (
        <FileDropZone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          disabled={disabled}
        />
      )}
    </Grid>
  );
};

const FileDropZone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  disabled,
}) => {
  const dropzoneStyles = {
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: !disabled && "pointer",
    width: "95.5%",
    border: isDragActive && !disabled ? "2px solid green" : "2px dashed #ccc",
    "&:hover": {
      border: !disabled && "2px solid green",
    },
  };
  return (
    <Box>
      {disabled ? (
        <Box sx={dropzoneStyles}>
          <Typography>
            <CloudUploadIcon />
            &nbsp;&nbsp;Drop files function is not available.
          </Typography>
        </Box>
      ) : (
        <Box {...getRootProps()} sx={dropzoneStyles}>
          <Input {...getInputProps()} />
          <Typography>
            <CloudUploadIcon />
            &nbsp;&nbsp;Drop files to attach or click to select files.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const UploadedFilesTable = (props) => {
  return (
    <Table sx={{ marginY: "10px", border: "2px solid #ccc" }}>
      <TableHead sx={{ fontWeight: "bold" }}>
        <TableRow>
          <TableCell style={{ width: "8.33%" }}></TableCell>
          <TableCell style={{ width: "75%" }}>
            <Typography fontWeight="bold">File Name</Typography>
          </TableCell>
          <TableCell style={{ width: "16.67%" }}>
            <Typography fontWeight="bold">Size</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.files.map((file) => {
          let downloadUrl = file.data.local;
          if (props.token) downloadUrl += `?token=${props.token}`;

          return (
            <TableRow key={file.indexId}>
              <TableCell>
                {!props.viewOnly && !props.disabled && (
                  <DeleteFileButton
                    indexId={file.indexId}
                    droppedFiles={props.files}
                    setDroppedFiles={props.setDroppedFiles}
                  />
                )}
              </TableCell>
              <TableCell>
                {" "}
                <Link href={downloadUrl} target="_blank" rel="noreferrer">
                  {file.data.name}
                </Link>
              </TableCell>
              <TableCell>
                <FileSizeText file={file} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const DeleteFileButton = ({ indexId, droppedFiles, setDroppedFiles }) => {
  const deleteFile = () => {
    const updatedFiles = droppedFiles.filter(
      (file) => file.indexId !== indexId,
    );
    setDroppedFiles(updatedFiles);
  };

  return <Button onClick={deleteFile}>X</Button>;
};

const ProgressBar = ({ uploadProgress }) => {
  const { fileName, percentCompleted, completed } = uploadProgress;

  if (completed) return null;

  return (
    <Box>
      <LinearProgress value={percentCompleted} variant="determinate" />
      <Box sx={{ minWidth: 35, textAlign: "right" }}>
        <Typography variant="body2" color="text.secondary">
          Uploading {fileName} - {percentCompleted}%
        </Typography>
      </Box>
    </Box>
  );
};

const ErrorMessageArea = ({ errorMessages }) => {
  if (errorMessages?.length === 0) return null;
  return (
    <Alert severity="error" sx={{ marginY: "10px" }}>
      {errorMessages.map((message, index) => (
        <Box key={index}>{message}</Box>
      ))}
    </Alert>
  );
};

const FileSizeText = ({ file }) => {
  const bytes = file.data.size || file.size;
  const KB_TO_BYTES = 1000;
  const MB_TO_BYTES = 1000 * KB_TO_BYTES;
  const GB_TO_BYTES = 1000 * MB_TO_BYTES;

  let text;

  if (isNaN(bytes)) {
    text = "Unknown Size";
  } else if (bytes < KB_TO_BYTES) {
    text = `${bytes} bytes`;
  } else if (bytes < MB_TO_BYTES) {
    const kb = Math.trunc(bytes / KB_TO_BYTES);
    text = `${kb}  KB`;
  } else if (bytes < GB_TO_BYTES) {
    const mb = (bytes / MB_TO_BYTES).toFixed(1);
    text = `${mb} MB`;
  } else {
    const gb = (bytes / GB_TO_BYTES).toFixed(1);
    text = `${gb} GB`;
  }

  return <Typography>{text}</Typography>;
};

export { FileComponent };
