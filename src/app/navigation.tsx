"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const category = pathname.split("/")[1];
  const { status, data: session } = useSession();

  const UserStatus = () => {
    if (pathname == "/auth/signin") {
      return "登入中...";
    }
    switch (status) {
      case "authenticated":
        return <div>{session.user.name}</div>;
      case "loading":
        return <></>;
      case "unauthenticated":
        return (
          <Button as={Link} color="primary" href="#" variant="flat">
            <Link href="/api/auth/signin">登入</Link>
          </Button>
        );
    }
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          做題小鎮
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem isActive={category == "club"}>
          <Link href="/club">讀書會</Link>
        </NavbarItem>
        <NavbarItem isActive={category == "book"}>
          <Link href="book">藏書</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <UserStatus />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
