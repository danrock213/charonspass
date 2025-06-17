// app/vendor-messages/conversations.ts

export type Conversation = {
  id: string;
  userName: string;
  lastMessage: string;
};

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    userName: 'Jane Doe',
    lastMessage: 'Thank you for the quote.',
  },
  {
    id: 'conv2',
    userName: 'Mark Johnson',
    lastMessage: 'Can we schedule a call this week?',
  },
  {
    id: 'conv3',
    userName: 'Emily Chen',
    lastMessage: 'I need help with grief support options.',
  },
];
