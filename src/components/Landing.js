import React, { useState, useCallback, Fragment } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Divider,
  Badge,
  Center,
  Input,
  Heading,
  useToast,
} from "@chakra-ui/core";
import { ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import { ExportToCsv } from "export-to-csv";
import { toHtml } from "pretty-print-json";
import Highlight from "react-highlight.js";

function Landing() {
  const [fileContent, setFileContent] = useState("console.log(Hello!)");
  const [isError, setIsError] = useState();
  const toast = useToast();

  const { open, acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".json",
    noClick: true,
    multiple: false,
    onDrop: (files) => readFile(files[0]),
    onDropRejected: (files) =>
      showToast("Exception", files[0].errors[0].message, "error"),
  });

  const displayJSON = (data) => {
    document.querySelector("#code").innerHTML = toHtml(data);
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      position: "top-right",
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const exportCSV = (data) => {
    console.log(data)
    const filename = "TDD_REPORT_INQUIRY_EWHT_" + new Date().valueOf();
    const exportObj = new ExportToCsv({
      filename,
      showTitle: true,
      useBom: true,
    });
    exportObj.generateCsv(data);
  };

  const renderFiles = () => {
    if (isError) {
      return;
    }
    return acceptedFiles.map((file, key) => {
      return (
        <Stack key={key} p={5} shadow="xl" borderWidth="1px" borderRadius="md">
          <Heading fontSize="xl">{file.path}</Heading>
          <Box>
            <Badge>{file.type}</Badge>
            <Badge ml="2" variant="outline">
              {file.size} bytes
            </Badge>
          </Box>
          <Divider />
          <Button
            rightIcon={<DownloadIcon />}
            colorScheme="green"
            onClick={() => exportCSV(fileContent)}
          >
            Download File
          </Button>
        </Stack>
      );
    });
  };

  const readFile = (file) => {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (event) {
      const json = JSON.parse(event.target.result);
      try {
        const content = json.item.reduce((prev, item) => {
          const service= item.response.map((data) => {
            return {
              service: item.name,
              title: data.name,
              request: data.originalRequest.body.raw.trim(),
              response: data.body.trim(),
            };
          });
          return [...prev, ...service]
        }, []);
        showToast("Success", "Convert file to csv successfully!", "success");
        setIsError(false);
        setFileContent(content);
      } catch (err) {
        showToast("Exception", "Something went wrong", "error");
        setIsError(true);
      }
    };
  };

  return (
    <Center mt="40">
      <Stack spacing="5">
        <Box
          {...getRootProps({ className: "dropzone" })}
          bg="gray.50"
          p="5"
          border="1px"
          borderRadius="md"
          borderColor="gray.300"
          borderStyle="dashed"
        >
          <Stack spacing="3">
            <Input {...getInputProps()} />
            <Text>Drag 'n' drop some files here, or click to select files</Text>
            <Button
              rightIcon={<ArrowUpIcon />}
              onClick={open}
              colorScheme="facebook"
            >
              Upload File
            </Button>
          </Stack>
        </Box>
        <Divider />
        {renderFiles()}
      </Stack>
      {/* <Highlight style="height:200px" language="javascript">{JSON.stringify(fileContent)}</Highlight> */}
    </Center>
  );
}

export default Landing;
