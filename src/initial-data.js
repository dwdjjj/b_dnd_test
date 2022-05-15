const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "LostArk" },
    "task-2": { id: "task-2", content: "League of Legends" },
    "task-3": { id: "task-3", content: "Maple Story" },
    "task-4": { id: "task-4", content: "PUBG" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "1",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "2",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "3",
      taskIds: [],
    },
  },
  // column을 순서대로 map으로 뿌리기 위해 만듬
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
