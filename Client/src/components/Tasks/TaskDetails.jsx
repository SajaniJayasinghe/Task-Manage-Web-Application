import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { Layout, Button, Card, Row, Col, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateTasks from "../Tasks/CreateTasks";
import EditTask from "./EditTasks";

const { Sider, Content } = Layout;

// Define TASK_TYPE object
const TASK_TYPE = {
  todo: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const TaskDetails = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test task",
      status: "inprogress",
      createdate: "2024-06-01",
      duedate: "2024-06-10",
      description: "Task manager youtube tutorial",
    },
    {
      id: 1,
      title: "Website Project Proposal Review",
      status: "completed",
      createdate: "2024-06-01",
      duedate: "2024-06-10",
      description: "Blog App Dashboard",
    },
  ]);

  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // useEffect(() => {
  //   // Fetch tasks from the database
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("/api/tasks/getAllTasks"); // Adjust the URL based on your API endpoint
  //       setTasks(response.data);
  //     } catch (error) {
  //       message.error("Failed to fetch tasks from the database");
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setOpen(!open);
  };

  // Function to handle task creation
  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to handle task editing
  const handleEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Tasks</h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={toggleModal}
            >
              Create Task
            </Button>
            {open && <CreateTasks open={open} setOpen={setOpen} />}
          </div>
          <div style={{ marginTop: "50px" }}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  title={
                    <span>
                      <span
                        className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.todo}`}
                      />
                      To Do
                    </span>
                  }
                  bordered={false}
                >
                  {tasks
                    .filter((task) => task.status === "pending")
                    .map((task) => (
                      <Card
                        key={task.id}
                        style={{ marginBottom: "16px", position: "relative" }}
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span
                                className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.todo}`}
                              />
                              {task.title}
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date: {formatDate(task.duedate)}
                              </div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "8px",
                              }}
                            >
                              <Button
                                type="link"
                                icon={
                                  <EditOutlined style={{ color: "green" }} />
                                }
                                onClick={() => {
                                  setEditTask(task);
                                  setIsEditModalOpen(true);
                                }}
                              />
                              <Button
                                type="link"
                                icon={
                                  <DeleteOutlined style={{ color: "red" }} />
                                }
                                // onClick={() => handleDeleteTask(task.id)}
                              />
                            </div>
                          </div>
                        }
                      >
                        <p>{task.description}</p>
                        <div style={{ fontSize: "14px", color: "#999" }}>
                          Created Date: {formatDate(task.createdate)}
                        </div>
                      </Card>
                    ))}
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={
                    <span>
                      <span
                        className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.inprogress}`}
                      />
                      In Progress
                    </span>
                  }
                  bordered={false}
                >
                  {tasks
                    .filter((task) => task.status === "inprogress")
                    .map((task) => (
                      <Card
                        key={task.id}
                        style={{ marginBottom: "16px", position: "relative" }}
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span
                                className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.inprogress}`}
                              />
                              {task.title}
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date: {formatDate(task.duedate)}
                              </div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "8px",
                              }}
                            >
                              <Button
                                type="link"
                                icon={
                                  <EditOutlined style={{ color: "green" }} />
                                }
                                onClick={() => {
                                  setEditTask(task);
                                  setIsEditModalOpen(true);
                                }}
                              />
                              <Button
                                type="link"
                                icon={
                                  <DeleteOutlined style={{ color: "red" }} />
                                }
                                // onClick={() => handleDeleteTask(task.id)}
                              />
                            </div>
                          </div>
                        }
                      >
                        <p>{task.description}</p>

                        <div style={{ fontSize: "14px", color: "#999" }}>
                          Created Date: {formatDate(task.createdate)}
                        </div>
                      </Card>
                    ))}
                </Card>
              </Col>

              <Col span={8}>
                <Card
                  title={
                    <span>
                      <span
                        className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.completed}`}
                      />
                      Completed
                    </span>
                  }
                  bordered={false}
                >
                  {tasks
                    .filter((task) => task.status === "completed")
                    .map((task) => (
                      <Card
                        key={task.id}
                        style={{ marginBottom: "16px", position: "relative" }}
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span
                                className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.completed}`}
                              />
                              {task.title}
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date: {formatDate(task.duedate)}
                              </div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                right: "8px",
                                bottom: "8px",
                              }}
                            >
                              <Button
                                type="link"
                                icon={
                                  <EditOutlined style={{ color: "green" }} />
                                }
                                onClick={() => {
                                  setEditTask(task);
                                  setIsEditModalOpen(true);
                                }}
                              />
                              <Button
                                type="link"
                                icon={
                                  <DeleteOutlined style={{ color: "red" }} />
                                }
                                // onClick={() => handleDeleteTask(task.id)}
                              />
                            </div>
                          </div>
                        }
                      >
                        <p>{task.description}</p>

                        <div style={{ fontSize: "14px", color: "#999" }}>
                          Created Date: {formatDate(task.createdate)}
                        </div>
                      </Card>
                    ))}
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      {editTask && (
        <EditTask
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          task={editTask}
          handleEditTask={handleEditTask}
        />
      )}
    </Layout>
  );
};

export default TaskDetails;
