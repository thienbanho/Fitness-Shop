import React, { useEffect, useState } from "react";
import {
  Image,
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaShoppingCart, FaUser, FaReceipt } from "react-icons/fa";
import logo from '/src/assets/logo.png';
import { useAuth } from "../../hooks/Auth";
import supabase from "../../config/supabaseClient";

const fetchUserRole = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }

    return data?.role;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const getRole = async () => {
      if (user && user.email) {
        const userRole = await fetchUserRole(user.email);
        setRole(userRole);
      }
    };
    getRole();
  }, [user]);

  const getNavItems = () => {
    if (role === 'vendor') {
      return [
        {
          label: "Product",
          href: "Product"
        },
        {
          label: "Personal Trainers",
          href: "PTList"
        },
        {
          label: "Forum",
          href: "Forum",
        },
        {
          label: "About",
          href: "About",
        },
        {
          label: "Vendor",
          children: [
            {
              label: "Profile",
              href: "Profile"
            },
            {
              label: "Seller Receipt Management",
              href: "SellerReceiptManage"
            },
            {
              label: "Upload Product",
              href: "UploadProduct"
            },
            {
              label: "My Products",
              href: "MyProducts"
            }
          ]
        },
      ];
    }

    if (role === 'user') {
      return [
        {
          label: "Product",
          href: "Product"
        },
        {
          label: "Personal Trainers",
          href: "PTList"
        },
        {
          label: "Forum",
          href: "Forum",
        },
        {
          label: "About",
          href: "About",
        },
        {
          label: "My Profile",
          href: "Profile"
        },
      ];
    }

    if (role === 'admin') {
      return [
        {
          label: "Product",
          href: "Product"
        },
        {
          label: "Personal Trainers",
          href: "PTList"
        },
        {
          label: "Forum",
          href: "Forum",
        },
        {
          label: "About",
          href: "About",
        },
        {
          label: "Admin",
          children: [
            {
              label: "Profile",
              href: "Profile"
            },
            {
              label: "Role Management",
              href: "RoleManage"
            },
            {
              label: "Seller Receipt Management",
              href: "SellerReceiptManage"
            },
            {
              label: "Upload Product",
              href: "UploadProduct"
            },
            {
              label: "My Products",
              href: "MyProducts"
            }
          ]
        },
      ];
    }

    if(role === 'Personal Trainer'){
      return [
        {
          label: "Product",
          href: "Product"
        },
        {
          label: "Personal Trainers",
          href: "PTRequestsManagement"
        },
        {
          label: "Forum",
          href: "Forum",
        },
        {
          label: "About",
          href: "About",
        },
      ];
    }

    if(role === null){
      return [
        {
          label: "Product",
          href: "Product"
        },
        {
          label: "Personal Trainers",
          href: "PTList"
        },
        {
          label: "Forum",
          href: "Forum",
        },
        {
          label: "About",
          href: "About",
        },
      ];
    }
    return [];
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Button as={"a"} variant={"link"} href={"/"}>
              <Image src={logo} alt="Logo" boxSize="50px" width="100px" />
            </Button>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav navItems={getNavItems()} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!user ? (
            <>
              <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"/SignIn"}>
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.600"}
                href={"/SignUp"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <IconButton
                as="a"
                href="/cart"
                aria-label="Shopping Cart"
                icon={<FaShoppingCart />}
                variant="ghost"
              />
              <IconButton
                as="a"
                href="/ReceiptList"
                aria-label="Receipt List"
                icon={<FaReceipt />}
                variant="ghost"
              />
              <IconButton
                as="a"
                href="/profile"
                aria-label="User Profile"
                icon={<FaUser />}
                variant="ghost"
              />
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={getNavItems()} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align="center">
      {navItems.map((navItem) => (
        <Box key={navItem.label || navItem.href}>
          {navItem.icon ? (
            <IconButton
              as="a"
              href={navItem.href}
              aria-label={navItem.ariaLabel}
              icon={<Icon as={navItem.icon} />}
              variant="ghost"
            />
          ) : (
            <Popover trigger={"click"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={3}
                  display="flex"
                  href={navItem.href ?? "#"}
                  fontSize={"m"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          )}
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "red.600" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {navItems.map((navItem) => (
        navItem.icon ? (
          <Box key={navItem.href} py={2}>
            <IconButton
              as="a"
              href={navItem.href}
              aria-label={navItem.ariaLabel}
              icon={<Icon as={navItem.icon} />}
              variant="ghost"
              width="full"
              justifyContent="flex-start"
            />
          </Box>
        ) : (
          <MobileNavItem key={navItem.label} {...navItem} />
        )
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

