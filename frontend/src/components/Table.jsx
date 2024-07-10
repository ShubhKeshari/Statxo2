import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Select,
  useToast,
  Button,
  Input,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../util/vars";
import { FetchContext } from "../context/FetchContext";
const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const [modifiedData, setModifiedData] = useState([]);
  const {shouldFetch, setShouldFetch} = useContext(FetchContext);
  const toast = useToast();
  const { auth, setAuth } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tasks/task`);
      const data = await res.json();
      console.log(data);
      setTableData(data.data);
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const updateModifiedData = (newData) => {
    setModifiedData((prevData) => {
      const existingIndex = prevData.findIndex(
        (data) => data._id === newData._id
      );
      if (existingIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newData;
        return updatedData;
      }
      return [...prevData, newData];
    });
  };

  const updateTableData = (newData) => {
    setTableData((prevData) => {
      const existingIndex = prevData.findIndex(
        (data) => data._id === newData._id
      );
      if (existingIndex !== -1) {
        const updatedData = [...prevData];
        updatedData[existingIndex] = newData;
        return updatedData;
      }
      return [...prevData];
    });
  };
  const handleActionType = (item, value) => {
    const newData = { ...item, actionType: value };
    updateModifiedData(newData);
    updateTableData(newData);
  };

  const handleActionName = (item, value) => {
    const newData = { ...item, actionName: value };
    updateModifiedData(newData);
    updateTableData(newData);
  };

  const handleStatus = (item, value) => {
    const newData = { ...item, status: value };
    updateModifiedData(newData);
    updateTableData(newData);
  };
  const handleAmountChange = (item, value) => {
    const newData = { ...item, amount: value };
    updateModifiedData(newData);
    updateTableData(newData);
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ tasks: modifiedData }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast({
        title: "Data saved successfully",
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      setModifiedData([]);
    } catch (error) {
      toast({
        title: `Error: ${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchData();
    setShouldFetch(false);
  }, [shouldFetch]);
  return (
    <>
     
      <Box height={"75vh"} mt={16} overflow={"auto"}>
        <Table variant="simple" size={{ base: "sm", lg: "md" }}>
          <Thead position="sticky" top="0" bg="#BA3B93" zIndex={"docked"} >
            <Tr>
              <Th color="white">Quantity</Th>
              <Th color="white">Amount</Th>
              <Th color="white">Posting Year</Th>
              <Th color="white">Posting Month</Th>
              <Th color="white">Action Type</Th>
              <Th color="white">Action Number</Th>
              <Th color="white">Action Name</Th>
              <Th color="white">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item, index) => (
              <Tr key={index}>
                <Td textAlign={"center"}>{item.quantity}</Td>
                <Td>
                  <Input
                    textAlign={"center"}
                    w={"100px"}
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleAmountChange(item, e.target.value)}
                  />
                </Td>
                <Td textAlign={"center"}>{item.postingYear}</Td>
                <Td textAlign={"center"}>{item.postingMonth}</Td>
                <Td>
                  <Select
                    w={"150px"}
                    value={item.actionType}
                    onChange={(e) => handleActionType(item, e.target.value)}
                  >
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                    <option value="Type3">Type3</option>
                  </Select>
                </Td>
                <Td textAlign={"center"}>{item.actionNumber}</Td>
                <Td>
                  <Select
                    w={"150px"}
                    value={item.actionName}
                    onChange={(e) => handleActionName(item, e.target.value)}
                  >
                    <option value="Action1">Action1</option>
                    <option value="Action2">Action2</option>
                    <option value="Action3">Action3</option>
                  </Select>
                </Td>
                <Td>
                  {!auth.isAdmin ? (
                    item.status
                  ) : (
                    <Select
                      w={"150px"}
                      value={item.status}
                      onChange={(e) => handleStatus(item, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In-Progress</option>
                      <option value="Approved">Approved</option>
                    </Select>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box width={"100%"} textAlign={"end"}>
        <Button
          bg={"#BA3B93"}
          _hover={{ bg: "#ff50c9" }}
          color={"white"}
          size={"sm"}
          width={"150px"}
          mr={{ base: "16px", md: "40px" }}
          mt={"24px"}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export { DataTable };
