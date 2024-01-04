import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";

import ClientHeader from "@/components/shared/header";

export default function Header() {
  let user = null;

  if (cookies().has("_TOKEN") && cookies().get("_TOKEN").value) {
    user = verify(cookies().get("_TOKEN").value);
  }
  
  if (user?.username) {
    return <ClientHeader auth_user={user} />;
  }
  
  return <ClientHeader />;
}