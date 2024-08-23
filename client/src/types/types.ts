export type TConversation = {
  id: string;
  title: string;
  created_at: string;
  user: string;
};

export type TMessagePayload = {
  generator: string;
  message: string;
};

export type TMessage = {
  id: number;
  chat: string;
  created_at: string;
  generator: string;
  message: string;
};
