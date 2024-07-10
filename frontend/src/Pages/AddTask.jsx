import React, { useState, useContext } from "react";
import {
  Box,
  Input,
  Select,
  Button,
  useToast
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../../util/vars";
import { FetchContext } from "../context/FetchContext";

const AddTask = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    amount: '',
    postingYear: '',
    postingMonth: '',
    actionType: 'Type1', // Default selected value for actionType
    actionName: 'Action1', // Default selected value for actionName
    actionNumber: '',
    status: 'Pending', // Default selected value for status
    Impact: 'High' // Default selected value for Impact
  });

  const { auth } = useContext(AuthContext);
  const { setShouldFetch } = useContext(FetchContext);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tasks/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast({
        title: "Task added successfully",
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });

      setShouldFetch(true);
      setFormData({
        quantity: '',
        amount: '',
        postingYear: '',
        postingMonth: '',
        actionType: 'Type1',
        actionName: 'Action1',
        actionNumber: '',
        status: 'Pending',
        Impact: 'High'
      });
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

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} p={2} >
    <Box as="form" onSubmit={handleSubmit} p={{base:8,md:10,lg:10}} borderWidth="1px" borderRadius="lg" w={{base:"100%",md:"80%",lg:"50%"}} mt={20} >
      <Box display="flex" mb={3}>
        <Input
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          mr={2}
          flex="1"
          required
        />
        <Input
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          flex="1"
          required
        />
      </Box>
      <Input
        name="postingYear"
        placeholder="Posting Year"
        value={formData.postingYear}
        onChange={handleChange}
        mb={3}
        required
      />
      <Input
        name="postingMonth"
        placeholder="Posting Month"
        value={formData.postingMonth}
        onChange={handleChange}
        mb={3}
        required
      />
      <Select
        name="actionType"
        value={formData.actionType}
        onChange={handleChange}
        mb={3}
        required
      >
        <option value="Type1">Type1</option>
        <option value="Type2">Type2</option>
        <option value="Type3">Type3</option>
      </Select>
      <Input
        name="actionNumber"
        placeholder="Action Number"
        value={formData.actionNumber}
        onChange={handleChange}
        mb={3}
        required
      />
      <Select
        name="actionName"
        value={formData.actionName}
        onChange={handleChange}
        mb={3}
        required
      >
        <option value="Action1">Action1</option>
        <option value="Action2">Action2</option>
        <option value="Action3">Action3</option>
      </Select>
      <Select
        name="status"
        value={formData.status}
        onChange={handleChange}
        mb={3}
        required
      >
        <option value="Pending">Pending</option>
        <option value="InProgress">In-Progress</option>
        <option value="Approved">Approved</option>
      </Select>
      <Select
        name="Impact"
        value={formData.Impact}
        onChange={handleChange}
        mb={3}
        required
      >
        <option value="High">High</option>
        <option value="Mid">Mid</option>
        <option value="Low">Low</option>
      </Select>
      <Button type="submit" bg={"#BA3B93"} _hover={{bg:"#ff50c9"}} color="white" size={"sm"}>
        Add Task
      </Button>
    </Box>
    </Box>
  );
};

export { AddTask };
