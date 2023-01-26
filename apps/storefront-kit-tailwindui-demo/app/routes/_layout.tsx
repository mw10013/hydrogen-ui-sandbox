import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}
