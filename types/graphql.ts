export interface CreateChatbotMutation {
  insertChatbots: {
    id: number;
    name: string;
  };
}

export interface CreateChatbotVariables {
  clerk_user_id: string;
  name: string;
  created_at: string;
}
