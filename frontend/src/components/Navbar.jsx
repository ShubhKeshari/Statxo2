import {
  Box,
  Flex,
  Button,
  Image,
  useToast,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../util/vars";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      setAuth({
        isAuth: false,
        userId: "",
        email:"",
        accessToken: "",
        isAdmin:""
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      navigate("/login");
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

  return (
    <>
      <Box
        bg={"white"}
        px={{ base: 4, md: 8 }}
        borderBottom={"1px solid gray"}
        position={"fixed"}
        top={0}
        w={"100%"}
        zIndex={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />
          <Box
            display={{ md: "none" }}
            onClick={() => {
              navigate("/");
            }}
            _hover={{ cursor: "pointer" }}
          >
            <Image src={logo}></Image>
          </Box>
          <Flex
            gap={{ base: "5px", md: "40px" }}
            display={{ base: "none", md: "flex" }}
            align={"center"}
          >
            <Box
              onClick={() => {
                navigate("/");
              }}
              _hover={{ cursor: "pointer" }}
            >
              <Image src={logo}></Image>
            </Box>
            <NavLink
              _hover={{ cursor: "pointer" }}
              to={"/"}
              style={({ isActive }) => ({
                fontWeight: 600,
                color: isActive ? "#BA3B93" : "#4A5568",
                textDecoration: "none",
              })}
            >
              Home
            </NavLink>
            <NavLink
              _hover={{ cursor: "pointer" }}
              to={"/dashboard"}
              style={({ isActive }) => ({
                fontWeight: 600,
                color: isActive ? "#BA3B93" : "#4A5568",
                textDecoration: "none",
              })}
            >
              Dashboard
            </NavLink>
            <NavLink
              _hover={{ cursor: "pointer" }}
              to={"/addTask"}
              style={({ isActive }) => ({
                fontWeight: 600,
                color: isActive ? "#BA3B93" : "#4A5568",
                textDecoration: "none",
              })}
            >
              Add Task
            </NavLink>
          </Flex>

          {auth.isAuth ? (
            <Button
              bg={"#BA3B93"}
              _hover={{ bg: "#ff50c9" }}
              color={"white"}
              size={"sm"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Box>
              <Button
                bg={"#BA3B93"}
                _hover={{ bg: "#ff50c9" }}
                color={"white"}
                size={"sm"}
                mr={"10px"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                bg={"#BA3B93"}
                _hover={{ bg: "#ff50c9" }}
                color={"white"}
                size={"sm"}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Text
              w="100%"
              mb={2}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
                onClose();
              }}
            >
              Home
            </Text>
            <Text
              w="100%"
              mb={2}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard");
                onClose();
              }}
            >
              Dashboard
            </Text>
            <Text
              w="100%"
              mb={2}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/addTask");
                onClose();
              }}
            >
              Add Task
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { Navbar };
