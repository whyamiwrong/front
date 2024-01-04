import { cookies } from 'next/headers';
import { verify } from "@/lib/jwt";

export function getVerified() {
    const cookieStore = cookies();
    const token = cookieStore.get('_TOKEN');

    let verified = verify(token.value);

    console.log(verified);
    
    return verified;
}
