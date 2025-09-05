import { gql } from "@apollo/client";

export const GET_CHATBOT_BY_ID = gql`
  query GetChatbotById($id: Int!) {
    chatbots(id: $id) {
      id
      name
      created_at
      chatbot_characteristics {
        id
        content
        created_at
      }
      chat_sessions {
        id
        created_at
        guest_id
        messages {
          id
          content
          created_at
        }
      }
    }
  }
`;

export const GET_CHATBOTS_BY_USER = gql`
  query GetChatbotsByUser($userId: String!) {
    chatbotsByUser(clerk_user_id: $userId) {
      id
      clerk_user_id
      name
      created_at
      chatbot_characteristics {
        id
      }
      chat_sessions {
        id
      }
    }
  }
`;

export const GET_USER_CHATBOTS = gql`
  query GetUserChatbots($userId: String!) {
    chatbotsByUser(clerk_user_id: $userId) {
      id
      name
      created_at
      chat_sessions {
        id
        created_at
        guests {
          name
          email
        }
      }
    }
  }
`;

export const GET_CHAT_SESSION_MESSAGES = gql`
  query GetChatSessionMessages($id: Int!) {
    chat_sessions(id: $id) {
      id
      created_at
      messages {
        content
        created_at
        id
        sender
      }
      chatbots {
        name
      }
      guests {
        name
        email
      }
    }
  }
`;

export const GET_MESSAGES_BY_CHAT_SESSION_ID = gql`
  query GetMessagesByChatSessionId($chat_session_id: Int!) {
    chat_sessions(id: $chat_session_id) {
      id
      messages {
        id
        content
        sender
        created_at
      }
    }
  }
`;
