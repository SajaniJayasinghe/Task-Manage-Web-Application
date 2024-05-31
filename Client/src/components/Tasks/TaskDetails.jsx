import React, { useState } from "react";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { Layout, Button, Card, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CreateTasks from "../Tasks/CreateTasks";

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
      status: "todo",
      createdate: "2024-06-01",
      duedate: "2024-06-10",
      description: "Task manager youtube tutorial",
    },
    {
      id: 4,
      title: "Duplicate - Duplicate - Review Code",
      status: "todo",
      createdate: "2024-06-02",
      duedate: "2024-06-12",
      description: "Blog App Admin Dashboard",
    },
    {
      id: 2,
      title: "Task 2",
      status: "inprogress",
      createdate: "2024-06-03",
      duedate: "2024-06-15",
      description: "Blog App Dashboard",
    },
    {
      id: 3,
      title: "Bug Fixing",
      status: "completed",
      createdate: "2024-06-04",
      duedate: "2024-06-20",
      description: "Check Login code and fix bugs asap",
    },
  ]);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setOpen(!open);
  };

  // Function to handle task creation
  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
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
                  {tasks.map((task) => {
                    if (task.status === "todo") {
                      return (
                        <Card
                          key={task.id}
                          style={{ marginBottom: "16px" }}
                          title={
                            <div>
                              <div>
                                {" "}
                                <span
                                  className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.todo}`}
                                />
                                {task.title}
                              </div>
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date : {formatDate(task.duedate)}
                              </div>
                            </div>
                          }
                        >
                          <p> {task.description}</p>
                          <div style={{ fontSize: "14px", color: "#999" }}>
                            {formatDate(task.createdate)}
                          </div>
                        </Card>
                      );
                    }
                    return null;
                  })}
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
                  {tasks.map((task) => {
                    if (task.status === "inprogress") {
                      return (
                        <Card
                          key={task.id}
                          style={{ marginBottom: "16px" }}
                          title={
                            <div>
                              <div>
                                {" "}
                                <span
                                  className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.inprogress}`}
                                />
                                {task.title}
                              </div>
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date : {formatDate(task.duedate)}
                              </div>
                            </div>
                          }
                        >
                          <p> {task.description}</p>
                          <div style={{ fontSize: "14px", color: "#999" }}>
                            {formatDate(task.createdate)}
                          </div>
                        </Card>
                      );
                    }
                    return null;
                  })}
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
                  {tasks.map((task) => {
                    if (task.status === "completed") {
                      return (
                        <Card
                          key={task.id}
                          style={{ marginBottom: "16px" }}
                          title={
                            <div>
                              <div>
                                {" "}
                                <span
                                  className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.completed}`}
                                />
                                {task.title}
                              </div>
                              <div style={{ fontSize: "14px", color: "#999" }}>
                                Due Date : {formatDate(task.duedate)}
                              </div>
                            </div>
                          }
                        >
                          <p> {task.description}</p>
                          <div style={{ fontSize: "14px", color: "#999" }}>
                            {formatDate(task.createdate)}
                          </div>
                        </Card>
                      );
                    }
                    return null;
                  })}
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TaskDetails;
