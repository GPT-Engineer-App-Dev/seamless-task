import { Container, VStack, Input, Button, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === "") {
      toast({
        title: "Cannot add empty task",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              <Input value={task.text} onChange={(e) => editTask(task.id, e.target.value)} />
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;