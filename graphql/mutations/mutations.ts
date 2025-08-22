import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!, $created_at: DateTime!) {
    insertChatbots(created_at: $created_at, name: $name, clerk_user_id: $clerk_user_id) {
      id
      name
    }
  }
`;
