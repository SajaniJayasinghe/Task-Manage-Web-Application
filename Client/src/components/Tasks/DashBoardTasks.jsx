import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, message } from "antd";

const { Sider, Content } = Layout;

const TASK_TYPE = {
  pending: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const DashBoardTasks = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <Layout>
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
              }}
            >
              Tasks
            </h1>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Row gutter={[16, 16]}>
              {["Pending", "Inprogress", "Completed"].map((status, index) => (
                <Col span={8} key={index}>
                  <Card
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
                            borderColor: "gray",
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
    </Layout>
  );
};

export default DashBoardTasks;
