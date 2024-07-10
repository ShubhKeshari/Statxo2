import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  import { useNavigate } from "react-router-dom";
  import homePageBanner from "../assets/homePage.jpg";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
  
  const Home = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("email"))) {
          setAuth({
            isAuth: "true",
            email: JSON.parse(localStorage.getItem("email")),
            userId: JSON.parse(localStorage.getItem("userId")),
            accessToken: JSON.parse(localStorage.getItem("accessToken")),
            isAdmin:JSON.parse(localStorage.getItem("isAdmin"))
          });
        }
      }, []);
    return (
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "10%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "#BA3B93",
                  zIndex: -1,
                }}
              >
                Leading in AI-Powered Market Intelligence & Data Science Solutions
              </Text>
              <br />
            </Heading>
            <Text color={"gray.600"} fontSize="xl">
              Empowering businesses to tackle complex problems with faster
              actionable outcomes, driven by our powerful combination of domain
              expertise and AI driven tools & technology.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                bg={"#BA3B93"}
                _hover={{ bg: "#ff50c9" }}
                onClick={() => {
                  navigate("/dashboard");
                }}
                color="white"
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"100%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Box
              position={"relative"}
              height={"fit-content"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <video autoPlay muted loop poster={homePageBanner}>
                <source
                  src="https://www.statxo.com/wp-content/uploads/2023/09/hoemPageVideo.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>
          </Flex>
        </Stack>
      </Container>
    );
  };
  
  export const Blob = (props) => {
    return (
      <Icon
        width={"100%"}
        viewBox="0 0 578 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
          fill="currentColor"
        />
      </Icon>
    );
  };
  
  export { Home };
  