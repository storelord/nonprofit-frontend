export type GrantCoversation = {
  id: string;
  name: string;
};

export type StatementOption = {
  id: string;
  statement: string;
  grants: GrantCoversation[];
};
