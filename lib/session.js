import { cookies } from 'next/headers';
import { verify } from "@/lib/jwt";

export function getVerified() {
    const cookieStore = cookies();
    const token = cookieStore.get('_TOKEN');


    // let verified = verify(token.value.id);

    // verified = JSON.parse(verified);

    const verified = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IndoeWFtaXdyb25nIiwiaWF0IjoxNzA0MzgxNjg2fQ.PU-dVTIB2n4zjDaykacry4KwM4UZpXFRZUPLCOXiY38');
    return verified;
}

