import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();

  if (process.env.NODE_ENV === "production") {
    return <></>;
  }

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
