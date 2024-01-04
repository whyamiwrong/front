import { cookies } from 'next/headers';
import { verify } from "@/lib/jwt";

export function getVerified() {
    const cookieStore = cookies();
    const token = cookieStore.get('_TOKEN');


    const verified = verify(token.value.id);
    console.log(token.value.id);

    // const verified = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndoeWFtaXdyb25nIiwiaWF0IjoxNzA0Mzc3NTA0fQ.L-GdFAVGgrx63jP3Mbjs3yv5H3UqnlYwW8l8yyilVNc');
    return verified;
}

