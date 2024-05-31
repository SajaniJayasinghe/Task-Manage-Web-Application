import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { Layout, Button, Card, Row, Col, message, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

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
  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "trash" } : task
      )
    );
    setIsDeleteModalOpen(false);
  };

  // Function to schedule due date reminders using node-cron
  const scheduleDueDateReminders = () => {
    // Schedule a task to check due dates every day at 8 AM
    cron.schedule("0 8 * * *", () => {
      // Logic to check due dates and trigger notifications
      const today = new Date().toISOString().split("T")[0]; // Get today's date
      const overdueTasks = tasks.filter((task) => task.duedate === today);
      if (overdueTasks.length > 0) {
        // Increment notification count
        setNotificationCount(notificationCount + overdueTasks.length);
        // Trigger notification to the user
        // You can use a notification library like Ant Design's notification or any other notification mechanism
        // Example:
        message.info(`${overdueTasks.length} task(s) are due today.`);
      }
    });
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Tasks</h1>
            <div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={toggleModal}
              >
                Create Task
              </Button>
              <Button
                type="link"
                className="custom-bell-button"
                icon={<BellOutlined />}
                // onClick=
              >
                {notificationCount > 0 && (
                  <span className="notification-count">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </div>
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
                        style={{
                          marginBottom: "16px",
                          position: "relative",
                          borderColor: "black",
                        }}
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
                                onClick={() => {
                                  setTaskToDelete(task);
                                  setIsDeleteModalOpen(true);
                                }}
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
                        style={{
                          marginBottom: "16px",
                          position: "relative",
                        }}
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
                                onClick={() => {
                                  setTaskToDelete(task);
                                  setIsDeleteModalOpen(true);
                                }}
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
                                onClick={() => {
                                  setTaskToDelete(task);
                                  setIsDeleteModalOpen(true);
                                }}
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
      <Modal
        title={
          <span>
            <ExclamationCircleOutlined
              style={{ color: "red", marginRight: 8 }}
            />
            Confirm Deletion
          </span>
        }
        visible={isDeleteModalOpen}
        onOk={() => handleDeleteTask(taskToDelete.id)}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ style: { background: "red", borderColor: "red" } }} // Change the OK button color to red
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </Layout>
  );
};

export default TaskDetails;
