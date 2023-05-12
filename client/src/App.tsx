import "./App.css";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { client } from "./apollo";
import { Guide, GuideFragment } from "./Guide";
import { Suspense } from "react";
import { PageQueryQuery } from "./gql/graphql";

const PAGE_QUERY = gql`
  ${GuideFragment}
  query PageQuery {
    guide {
      ...Guide
    }
  }
`;

function Page() {
  const { data } = useQuery(PAGE_QUERY);

  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        {data?.guide && <Guide guide={data?.guide} />}
        {/* <QueryViewer data={data} /> */}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider>
  );
}

function QueryViewer({ data }: { data: any }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
