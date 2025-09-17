import { serverClient } from "@/lib/server/serverClient";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();

  try {
    let results;

    if (query.trim().startsWith("mutation")) {
      //  handle mutation
      results = await serverClient.mutate({
        mutation: gql`
          ${query}
        `,
        variables: variables,
      });
    } else {
      // handle queries
      results = await serverClient.query({
        query: gql`
          ${query}
        `,
        variables: variables,
      });
    }

    const data = results.data;

    return NextResponse.json({ data }, { headers: corsHeaders });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}
