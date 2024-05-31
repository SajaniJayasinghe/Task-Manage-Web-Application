import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  message,
  Modal,
  Popconfirm,
} from "antd";
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

const TASK_TYPE = {
  pending: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const TaskDetails = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/task/getAllTasks"
      );
      setTasks(response.data);
    } catch (error) {
      message.error("Failed to fetch tasks from the database");
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/task/deleteTask/${id}`
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
        message.success("Task deleted successfully");
        setIsDeleteModalOpen(false);
      } else {
        message.error("Failed to delete the task");
      }
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
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
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginLeft: "8px",
                marginTop: "10px",
              }}
            >
              Tasks
            </h1>
            <div>
              <Button
                type="link"
                className="custom-bell-button"
                icon={<BellOutlined style={{ fontSize: "25px" }} />}
              ></Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={toggleModal}
              >
                Create Task
              </Button>
            </div>
            {open && (
              <CreateTasks open={open} setOpen={setOpen} getTask={fetchTasks} />
            )}
          </div>
          <div style={{ marginTop: "50px" }}>
            <Row gutter={[16, 16]}>
              {["Pending", "Inprogress", "Completed"].map((status, index) => (
                <Col span={8} key={index}>
                  <Card
                    style={{
                      backgroundColor:
                        status === "Pending"
                          ? "#D5D6EA"
                          : status === "Inprogress"
                          ? "#C9DFEC"
                          : "#DBE9FA",
                    }}
                    title={
                      <span>
                        <span
                          className={`rounded-full w-3 h-3 inline-block mr-2 ${
                            TASK_TYPE[status.toLowerCase()]
                          }`}
                        />
                        {status}
                      </span>
                    }
                    bordered={false}
                  >
                    {tasks
                      .filter((task) => task.status === status)
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
                                marginTop: "10px",
                              }}
                            >
                              <div>
                                <span
                                  className={`rounded-full w-3 h-3 inline-block mr-2 ${
                                    TASK_TYPE[status.toLowerCase()]
                                  }`}
                                />
                                {task.title}
                                <div
                                  style={{ fontSize: "14px", color: "#999" }}
                                >
                                  Due Date:{" "}
                                  {new Date(task.dueDate).toLocaleDateString()}
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
                                <Popconfirm
                                  title="Delete the task"
                                  description="Are you sure to delete this task?"
                                  onConfirm={() => {
                                    handleDeleteTask(task._id);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <Button
                                    type="link"
                                    icon={
                                      <DeleteOutlined
                                        style={{ color: "red" }}
                                      />
                                    }
                                    onClick={() => {
                                      setTaskToDelete(task);
                                      setIsDeleteModalOpen(true);
                                    }}
                                  />
                                </Popconfirm>
                              </div>
                            </div>
                          }
                        >
                          <p>{task.description}</p>
                          <div style={{ fontSize: "14px", color: "#999" }}>
                            {new Date(task.createdAt).toLocaleDateString()}
                          </div>
                        </Card>
                      ))}
                  </Card>
                </Col>
              ))}
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
