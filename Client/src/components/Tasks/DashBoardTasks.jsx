import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, message } from "antd";

const { Content } = Layout;

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
      <Content style={{ padding: "20px" }}>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Tasks</h1>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Row gutter={[16, 16]}>
            {["Pending", "Inprogress", "Completed"].map((status, index) => (
              <Col xs={24} sm={24} md={12} lg={8} key={index}>
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
                          <div className="card-title">
                            <div>
                              <span
                                className={`rounded-full w-3 h-3 inline-block mr-2 ${
                                  TASK_TYPE[status.toLowerCase()]
                                }`}
                              />
                              {task.title}
                              <div className="card-due-date">
                                Due Date:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <p>{task.description}</p>
                        <div className="card-created-at">
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
  );
};

export default DashBoardTasks;
